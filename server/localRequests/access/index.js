var express = require('express');
var path = require('path');

module.exports = {
    activate( app ){
        let rootFolder = process.rootFolder;
        var logger = process.logger;

        app.use('/languages', express.static(path.resolve(rootFolder, 'languages')));
        app.use('/output', express.static(path.resolve(rootFolder, 'output')));
        app.use('/resources', express.static(path.resolve(rootFolder, 'resources')));
        app.use('/', express.static(path.resolve(rootFolder, 'output')));

        app.get('/health',  (req,res)=>{
                var date = new Date();
                logger.accessLogger.info('Health check success');
                res.status(200).send({status:'up', date:date});
            }
        );
    }
}

