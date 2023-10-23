//File contains sample data and few helper methods that will be used in the application.
const fs=require('fs');
const path = require('path');


//Returns the private key
exports.readPrivateKey = () => {
    let filePath = path.join(__dirname, '../config/keys/dev.key');
    if (!fs.existsSync(filePath)) {
        return;
    }

    try{
        let data = fs.readFileSync(filePath,'utf-8');
        if(!data){
            return
        }
        return data
    }catch(error){
        console.log(error)
    }
}

//Returns the public key
exports.readPublicKey = () => {
    let filePath = path.join(__dirname, '../config/keys/dev.key.pub');
    try {
        let data = fs.readFileSync(filePath, 'utf-8');
        if(!data){
            return
        }
        return data
    } catch(error) {
        console.log(error)
    }
}

