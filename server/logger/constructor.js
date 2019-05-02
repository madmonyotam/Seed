var path = require('path');
var winston = require('winston');
var moment = require('moment');
var modules = require('../modules');
var accesslog = require('access-log');
const logWithColors = require('node-pretty-log');

require('winston-daily-rotate-file');

var context;

var Logger = class Logger {

    constructor(loggerConfig){

        this.format = this.getFormatForAccessLog(loggerConfig.format);
        this.disable = loggerConfig.disable;
        this.dayToSave = loggerConfig.dayToSave || 7;
        this.maxMegaBytesToFile = loggerConfig.maxMegaBytesToFile || 20;

        this.accessLogger = this.createAccessLogger();
        this.systemLogger = this.createSystemLogger();

        context = this;
    }

    getFormatForAccessLog(formatFromConfig){
        let format = [
			{ "field": "url", "display":true ,"order":0 },
			{ "field": "delta", "display":true ,"order":1 },
			{ "field": "ip", "display":true ,"order":2 },
			{ "field": "protocol", "display":true ,"order":3 },
			{ "field": "host", "display":true ,"order":4 },
			{ "field": "statusCode", "display":true ,"order":5 },
			{ "field": "contentLength", "display":true ,"order":6 }
        ]
        
        format = formatFromConfig ? formatFromConfig : format;

        let f = '';
        format = format.filter((a)=>{return a.display});
        format = format.sort((a,b)=>{return a.order > b.order})
        format.forEach(el => {
            f+=` :${el.field}`;
        });

        return f; 
    }

    levels(){  // for reference
        const levels = { 
            error: 0, 
            warn: 1, 
            info: 2, 
            verbose: 3, 
            debug: 4, 
            silly: 5 
        };
    }

    log(level, msg , andMsg){
        let systemLevel;
        if(this.disable) return;

        switch (level) {
            case 'success':
                systemLevel='info'
                break;

            default:
                systemLevel = level;
        }

        andMsg ? this.systemLogger[systemLevel](msg+', '+andMsg) : this.systemLogger[systemLevel](msg);
        andMsg ? logWithColors(level,msg,andMsg) : logWithColors(level,msg);
    }

    createSystemLogger(){
        let file  = new winston.transports.File(this.systemOption());

        const systemLogger = winston.createLogger({
            exitOnError: false,
            silent: this.silent,
            level: 'debug',
            format: winston.format.simple(),  //json()
        });

        systemLogger.add(file);

        return systemLogger;
    }

    createAccessLogger(){
        let errorFile  = new winston.transports.File(this.errorFileOption());
        let infoFile = new winston.transports.DailyRotateFile(this.infoFileOptions());

        infoFile.on('rotate',(oldFilename, newFilename)=>{
            console.log({oldFilename, newFilename});
        })

        const accessLogger = winston.createLogger({
            exitOnError: false,
            silent: false,
            level: 'info',
            format: winston.format.simple() // winston.format.json(),
        });

        accessLogger.add(infoFile);
        accessLogger.add(errorFile);

        return accessLogger;
    }

    systemOption(){
        this.megabyte = 1048576;

        return{
            level: 'debug',
            filename: `logs/system.log`,
            handleExceptions: true,
            json: true,
            maxsize: this.megabyte*20,
            maxFiles: 2
        } 
    }

    errorFileOption(){
        this.megabyte = 1048576;

        return{
            level: 'error',
            filename: `logs/error.csv`,
            handleExceptions: true,
            json: true,
            maxsize: this.megabyte*20,
            maxFiles: 7
        }    
    }

    infoFileOptions(){
        let megaBytes = this.maxMegaBytesToFile < 100 ? this.maxMegaBytesToFile : 100;
        let days = this.dayToSave < 20 ? this.dayToSave : 20;
        megaBytes = `${megaBytes}m`;
        days = `${days}d`;


        return{
            level: 'info',
            filename: `logs/info-%DATE%.csv`,
            datePattern: 'DD',
            handleExceptions: true,
            json: true,
            maxSize: megaBytes,
            maxFiles: days,
            auditFile: 'logs/audit.json'
        }   
    }

    getParamsFromResponse(res,list){
        
        let date = moment().format();  
        list =  list + ` ${date}`;

        return list;
    }

    logResponse(req, res){
        if(this.disable) return;
        let format = context.format;
        
        accesslog(req, res, format, (tempList) => {

            let params = context.getParamsFromResponse(req,tempList);

            if (res.statusCode > 499) {
                    context.accessLogger.error(params);  
            } 

            else if(res.statusCode > 399){    
                    context.accessLogger.warn(params);            
            } 

            else {
                    context.accessLogger.info(params);
            }

        });
    }
        
    onError(err, req, res){
        if(this.disable) return;
        context.accessLogger.error(err);
    }

}

module.exports = Logger;