const jwt=require('jsonwebtoken')
const {generateToken}=require('../../config/jwtToken')
const User=require('./user/model/user.model')
const sendMails = require('../../helper/mail');
const Code=require('./user/model/code.model')
const generateCode=require('../../helper/generateCode')   
const {readPublicKey} = require('../../src/api')
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
const {generateRefrehToken}=require('../../config/refreshToken')
const validateMongoDbId = require('../../helper/validateMongoDB')
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
     //const emailVerify = await EmailValidator(email)
     const check=await User.findOne({email:email})
     if(check) return res.status(400).json({msg:'This email is already exists'})
     //const validPassword=await PasswordValidator(password)
     if(!LengthValidator(username,6,12)) return res.status(400).json({msg:'username must be between 6 and 12 characters'})
     const salt=await bcrypt.genSaltSync(10)
     const cryptePassword=await bcrypt.hashSync(password,salt)
     //const user=new User({username,email,password:cryptePassword,picture})
     //add role array i want to add role id '"6530e3c6b66fead76cb05923" '

     const user = await User.create({
      username,
      email,
      role:"6530e3c6b66fead76cb05923",

      
      password:cryptePassword,
      picture,
    }).then((saveUser)=>{
     console.log('tototototo')
     console.log(saveUser)
                const emailVerificationToken=generateToken({id:saveUser._id.toString()},"30m")
                const url=`${process.env.PORT}/api/v1/activate/${emailVerificationToken}`
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
                res.status(201).json({
                     success:true,
                     saveUser,
                     message:'Register Success , please activate your email',
                })
           })
           .catch((error)=>{res.status(400).json({msg:error.message})})
 })
const login=asyncHandler(async (req,res)=>{
    const {email,password}=req.body
    console.log(email,password)
    const findUser=await User.findOne({email:email})
    console.log('find user')
    console.log(findUser)
    console.log(findUser._id)
    if(findUser && await bcrypt.compare(password,findUser.password)){
         let id_t=findUser.id
         const refreshToken=await generateRefrehToken({id:findUser.id},"30m")

         console.log('coming here')
         const updateUser=await User.findByIdAndUpdate(
              findUser._id,
              {
               refreshToken:refreshToken,
               loginCount:findUser.loginCount+1
          },
              {new:true}
         )

         // Increments the login count for the user
          await findUser.incrementLoginCount();

         

         // secure true to allow https only
         res.cookie("token",refreshToken,{
              httpOnly:true, 
              sameSite:'strict',
              secure:false,
              maxAge:72 * 60 * 60 * 1000,
         })
         res.status(201).json({
              _id:findUser?._id,
              username:findUser?.username,
              email:findUser?.email,
              picture:findUser?.picture,
              //token:generateRefrehToken({id:findUser._id.toString()},"3d")
         })
    }else{
         return res.status(401).json({message:'Invalid email or password'})
    }
})
//handle refresh token 
const handleRefreshTokens = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
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
    if(!cookie?.token) throw new Error("No Refresh Token in Cookies")
    const refreshToken=cookie.token 
    console.log(refreshToken)
    const user=await User.findOne({refreshToken})
    if(!user){
         res.clearCookie('token',{
              httpOnly:true , 
              secure:true 
         })
         return res.sendStatus(204)//forbidden 
    }
    //find user and update refresh token
    User.findByIdAndUpdate(user._id,{refreshToken:""})
    res.clearCookie("token",{
         httpOnly:true , 
         secure:true 
    })
    //204 is mean no content(so you cant add message to it)
    res.sendStatus(201).json({message:"Logout Success"})
})
//activate account 
const activeAccount=asyncHandler(async (req,res)=>{
     try {
          const {token}=req.params
          let publicKey = readPublicKey()
          const user=jwt.verify(token,publicKey)
          const check=await User.findById(user.payload.id)
          /*if (check) {
               return res.status(400).json({
                 message: "You don't have the authorization to complete this operation.",
               });
          }*/
          if(check.verified==true){
               res.status(400).json({message:"this email is alrealy activated"})
          }else{
               await User.findByIdAndUpdate(user.payload.id,{verified:true})
               //generate new token
               const token=generateToken({id:user.payload.id},"7d")
               //store token in cookie
               res.cookie("token",token,{
                    httpOnly:true , 
                    secure:true 
               }) 
               res.status(200).json({message:"Your account has been activated"})
          }
     }catch(error){
          res.status(500).json({message:error.message})
     }
 })

const resetPassword = asyncHandler(async (req, res) => {
     try {
          const { email } = req.body;
          const user = await User.findOne({ email }).select("-password");
          await Code.findOneAndRemove({ user: user._id });
          const code = generateCode(5);
          const savedCode = await new Code({
               code,
               user: user._id,
          }).save();
          const url = `${process.env.PORT}/api/v1/changePassword/${user._id}`;
          let mailOptions = {
               from: 'AlloMedia.livraieon@media.com',
               to: user.email,
               subject: 'Code change password',
               text: `Code `,
               html: `<h3> please check code <b>${code}</b></h3>
               <a href="${url}">change password link</a>`,
          };
          sendMails(mailOptions)
          return res.status(200).json({
               message: "Email reset code has been sent to your email",
          });
          } catch (error) {
          res.status(500).json({ message: error.message });
          }
});
//validate reset password 
const validateResetPassword=asyncHandler(async (req,res)=>{
     try {
          const { email, code } = req.body;
          const {id}=req.params
          const user = await User.findOne({ email });
          const Dbcode = await Code.findOne({ user: user._id });
          if (Dbcode.code !== code) {
            //check date expired from model code
            
            return res.status(400).json({
               message: "Verification code is wrong..",
             });
          }
          /*if(Dbcode.expireA < Date.now()){
               return res.status(400).json({ message: "code expired" });
          }*/
          return res.status(200).json({ message: "ok" });
     } catch (error) {
     res.status(500).json({ message: error.message });
     }
})

//change password 
const changePassword=asyncHandler(async (req,res)=>{
     const { email, password } = req.body;
     const cryptedPassword = await bcrypt.hash(password, 12);
     await User.findOneAndUpdate(
     { email },
     {password: cryptedPassword,}
     );
     return res.status(200).json({ message: "ok" });
})
 

module.exports = {  
     getAllItems,
     getAccessToken,
     createUser,
     login,
     handleRefreshTokens,
     loginAdmin,
     logOut,
     activeAccount,
     resetPassword,
     validateResetPassword,
     changePassword
}