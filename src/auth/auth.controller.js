const jwt=require('jsonwebtoken')
const {generateToken}=require('../../config/jwtToken')

const {
    items,
    user,
    readPrivateKey
} = require('../api');


//Get All Items Service implementation
exports.getAllItems = (req,res,next) => {
    //Check if the user information is available
    if(!req.user) {
        return res.status(403).json({
            success: false,
            message: "Access denied to the resource!"
        });
    }
    res.status(200).json({
        success: true,
        data: items
    })
};

//Generate an Accesstoken
exports.getAccessToken = (req,res,next) => {
    
    // ----------------- TODO STARTS -------------------------
    // User validation must go here to make sure it is a valid user.
    // User can be validated on the basis of credentials that was used to register with the application
    // ----------------- TODO ENDS -------------------------
    //Returns the private key for the generating the token.
    
    
    // Prepare the payload consisting of the claims
    let payload = {
        id: user.userId
    }
    
    // Prepare the options for the access token
    // Sets the time of the token to expire in 30mins
    
    //Generate the access token
    let token = generateToken(payload, "30m")
    
    //Add the information to the response header.
    res.header("x-access-token",token)
    res.status(200).json({
        success: true,
        message:"You have been authenticated successfully"
    });
}