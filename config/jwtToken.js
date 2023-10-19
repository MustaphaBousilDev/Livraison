const jwt=require('jsonwebtoken');
const { readPrivateKey } = require('../src/api');

/*const generateToken=(payload,expired)=>{

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
        subject: payload,
        jwtid: `${(Math.floor(Date.now))}`
    }
    return jwt.sign(payload,privateKey, jwtOptions);
}*/

const generateToken=(payload,expired)=>{
    return jwt.sign({payload},process.env.SECRET_KEY_TOKEN,{
         expiresIn:expired
    })

}

module.exports={
    generateToken
}