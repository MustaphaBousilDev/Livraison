const jwt=require('jsonwebtoken')
const {generateToken}=require('../../config/jwtToken')
const User=require('./user/model/user.model')
const {HTML_TEMPLATE} = require('../../helper/mail-template');
const sendMails = require('../../helper/mail');
const {
    EmailValidator,
    PasswordValidator,
    LengthValidator,
    validateImage,
    validateNumberIntegers,
    validateNumber,
    validateString
} = require('../../helper/validations');
const bcrypt=require('bcryptjs')
refreshtoken=require('../../config/refreshToken')
const validateMongoDbId = require('../../helper/validateMongoDB')
const {sendVerificationEmail}=require('../../helper/mailer')
const asyncHandler=require('express-async-handler')
const { error_json, success_json } = require('../../helper/helper');

const {
    items,
    user,
    readPrivateKey
} = require('../api');


//Get All Items Service implementation
getAllItems = (req,res,next) => {
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
getAccessToken = (req,res,next) => {
    
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
const createUser=asyncHandler(async (req,res)=>{
    const {username,email,password,picture}=req.body
    const emailVerify = await EmailValidator(email)
    const check=await User.findOne(
     {email:email}
    )
    if(check) return res.status(400).json({msg:'This email is already exists'})
    const validPassword=await PasswordValidator(password)
    if(!LengthValidator(username,6,12)) return res.status(400).json({msg:'username must be between 6 and 12 characters'})
    const salt=await bcrypt.genSaltSync(10)
    const cryptePassword=await bcrypt.hashSync(password,salt)
    console.log('after cryot ')
    const user=new User(
         {
          username,
          email,
          password:cryptePassword,
          picture})
    user.save()
         .then((saveUser)=>{
              console.log('start verification email') 
              console.log(saveUser)
              const emailVerificationToken=generateToken({id:saveUser._id.toString()},"30m")
              //console.log('token of email verification::==>',emailVerificationToken)
              const url=`${process.env.BASE_URL}/activate/${emailVerificationToken}`
              //sendVerificationEmail(saveUser.email,saveUser.username,url)
              let mailOptions = {
               from: 'AlloMedia.livraieon@media.com',
               to: req.body.email,
               subject: 'Account activation link',
               text: `Hello ${req.body.username}`,
               html: `<h3> Please click on the link to activate your account </h3>
               <a href="${url}">Activate your account</a>`,
               };
               sendMails(mailOptions)
              const token=generateToken({id:saveUser._id.toString()},"7d")
              res.status(200).json({
              success:true,
              saveUser,
              token:token,
              message:'Register Success , please activate your email'
         })})
         .catch((error)=>{res.status(400).json({msg:error.message})})
         
}) 
const login=asyncHandler(async (req,res)=>{
    const {email,password}=req.body
    const findUser=await User.findOne({email:email})
    if(findUser && await findUser.isPasswordMatch(password,findUser.password)){
         const refreshToken=await refreshTokens(findUser?._id)
         const updateUser=await User.findByIdAndUpdate(
              findUser.id,
              {refreshToken:refreshToken},
              {new:true}
         )

         // Increments the login count for the user
         await findUser.incrementLoginCount();

         // secure true to allow https only
         res.cookie("refreshToken",refreshToken,{
              httpOnly:true, 
              sameSite:'strict',
              secure:false,
              maxAge:72 * 60 * 60 * 1000,
         })
         res.status(200).json({
              _id:findUser?._id,
              first_name:findUser?.first_name,
              last_name:findUser?.last_name,
              username:findUser?.username,
              email:findUser?.email,
              mobile:findUser?.mobile,
              picture:findUser?.picture,
              role:findUser?.role,
              token:generateToken({id:findUser._id},"3d")
         })
    }else{
         return res.status(401).json({message:'Invalid email or password'})
    }
})
//handle refresh token 
const handleRefreshTokens = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    console.log('fuck the goods')
    console.log(cookie)
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    console.log('refreshToken:',refreshToken)
    const user = await User.findOne({ refreshToken });
    console.log(user)
    if (!user) throw new Error(" No Refresh token present in db or not matched");
    
    jwt.verify(refreshToken, process.env.SECRET_KEY_TOKEN, (err, decoded) => {
      if (err || user.id !== decoded.id) {
        throw new Error("There is something wrong with refresh token");
      }
      const accessToken = generateToken({id:user?._id},"3d");
      res.json({ accessToken });
    });
});
//Login admin 
const loginAdmin=asyncHandler(async (req,res)=>{
    const {email,password}=req.body 
    //check if user exist or note 
    const findAdmin=await User.findOne({email})
    if(findAdmin.role !=="admin") throw new Error('Not fucking Authorized')
    if(findAdmin && (await findAdmin.isPasswordMatched(password))){
         const refreshToken=await refreshTokens(findAdmin?._id)
         const updateUser=await User.findByIdAndUpdate(
              findAdmin.id ,
              {
                   refreshToken:refreshToken
              },
              {new:true}
         )
         res.cookie("refreshToken",refreshToken,{
              httpOnly:true , 
              maxAge:72*60*60*1000,
         });

         res.json({
              _id:findUser?._id,
              first_name:findUser?.first_name,
              last_name:findUser?.last_name,
              username:findUser?.username,
              email:findUser?.email,
              mobile:findUser?.mobile,
              picture:findUser?.picture,
              role:findUser?.role,
              token:generateToken({id:findUser._id.toString()},"7d")
         })
    }else{throw new Error("Invalid Credentials")}
})
//logout 
const logOut=asyncHandler(async (req,res)=>{
    const cookie=req.cookies 
    console.log(cookie)
    if(!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies")
    const refreshToken=cookie.refreshToken 
    const user=await User.findOne({refreshToken})
    if(!user){
         res.clearCookie('refreshToken',{
              httpOnly:true , 
              secure:true 
         })
         return res.sendStatus(204)//forbidden 
    }
    await User.findOneAndUpdate(refreshToken,{
         refreshToken:"",
    })
    res.clearCookie("refreshToken",{
         httpOnly:true , 
         secure:true 
    })
    //204 is mean no content(so you cant add message to it)
    res.sendStatus(204)
})
//login insperation
const LoginInsperation=asyncHandler(async (req,res)=>{
     const { error } = loginValidation(credentials);
          if (error)
            return error_json(400, error.details[0].message);

          return success_json(200, token);

})

module.exports = {  
     getAllItems,
     getAccessToken,
     createUser,
     login,
     handleRefreshTokens,
     loginAdmin,
     logOut
     }