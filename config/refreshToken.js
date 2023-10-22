const jwt=require('jsonwebtoken')
const { readPrivateKey } = require('../src/api');
const generateRefrehToken=(payload,expired="3d")=>{
     console.log('fucking payload',payload)
     let privateKey = readPrivateKey()
     if(!privateKey){
          res.status(500).json({
               success: false,
               message: "Cannot generate the access token. Internal Server Error"
          });
     }
     let jwtOptions = {
          algorithm: "RS256",
          issuer: "http://localhost:5000",
          audience: "http://localhost:5000",
          expiresIn: expired,
          subject: String(payload.id),
          jwtid: `${(Math.floor(Date.now))}`
     }
     return jwt.sign({payload},privateKey, jwtOptions);

}

module.exports={generateRefrehToken}