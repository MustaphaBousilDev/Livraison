const User=require('../../src/auth/user/model/user.model')
const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const {readPublicKey} = require('../../src/api')
const authMiddleware=asyncHandler(async(req,res,next)=>{
     let token 
     if(req?.cookies?.token){
          token=req.cookies.token
          try {
               if(!token) {
                    return res.status(401).json({
                         success: false,
                         message: "Token Missing"
                    })
               }
               //verify token
               let publicKey = readPublicKey()
               if(!publicKey) {
                    res.status(500).json({
                         success: false,
                         message: "Internal Server Error. Cannot read the public key"
                    });
                    return
               }
               let tokenInfo = await jwt.verify(token, publicKey);
               const user=await User.findById(decoded.payload.id)
               if(tokenInfo.id !== user._id.toString()) {
                    res.status(403).json({
                        success: false,
                        message: "Access Denied to the resource!"
                    });
                    return
               }
               // req.user = user;
               
               if(!user) {
                    res.status(404).json({
                         success:false,
                         message: "No user found with this id"
                    })
               }
               req.user=user
               next()
          } catch (error) {
               return res.status(401).json({
                    success:false,
                    message: "Error Occured in Authentication ⚠️"
               })
          }
     }else{
          res.status(401).json({
               success: false,
               message: "Token Missing"
          })
     }
})

const isAdmin=asyncHandler(async(req,res,next)=>{
     if(req.user && (req.user.role==='admin' 
          || req.user._id.toString()===req.params.id.toString())){
          next() 
     }else{
          res.status(401)
          throw new Error('Not authorized as an admin or user is not authorized to get his own profile')
     }
})

const isEmployee=asyncHandler(async(req,res,next)=>{
     if(req.user && (req.user.role==='admin' || req.user.role==='employee')){
          next() 
     }else{
          res.status(401)
          throw new Error('Not authorized because you are not an employee')
     }
})


module.exports={authMiddleware,isAdmin}