var fs = require('fs');
var encoding = "utf8";
var path = require('path');

module.exports = {

    isJSON(filePath) {
      var ext = path.extname(filePath).split('.').pop();
      return ext === 'json'
    },

    mergeFile(filePath, currentData, res = () => { } ){
        
        this.getFile(filePath, (fileData) => {
            
            let data = { ...fileData } , dataString;
           
            for (const key in currentData) {
                let singleField = currentData[key];
                data[key] = singleField;
            }
              
            dataString = JSON.stringify(data, null, "\t");
            // console.debug('dataString => ', dataString);
            this.saveFile(filePath, dataString);
            res(data); 
        })

    },

    saveFile(filePath, body, res = () => { } ){

        fs.writeFile(filePath, body, encoding, (error, data) => {
           
            if(error){
                console.error(error);    
                return res(error);
            }
            
            res(data);
        })
    },

    getFile(filePath, res =()=>{} ){

        fs.readFile(filePath, (error, data) => {
            if(error){
                console.error(error);    
                return res(error);
            }

            let extracted;

            try {
              
              if (!this.isJSON(filePath)) {
                extracted = data.toString();
              } else extracted = JSON.parse(data.toString()); 

            } catch (error) {
                console.error(error); 
                return res(error);
            }
            // console.log(this.isJSON(filePath),extracted);
            res(extracted);
        })
    }

}