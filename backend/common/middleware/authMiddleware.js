const User=require('../../src/auth/user/model/user.model')
const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const {readPublicKey, readPrivateKey} = require('../../src/api')

const authMiddleware=asyncHandler(async(req,res,next)=>{
     console.log('from middlewaredddddd')
     let token =req?.params?.token
     console.log(req?.cookies?.token)
     //console.log(req.params.token)
     try {
          if(!token) {
               return res.status(401).json({
                    success: false,
                    message: "Token Missing"
               })
          }
          //verify token
          let publicKey =readPublicKey()
          if(!publicKey) {
               res.status(500).json({
                    success: false,
                    message: "Internal Server Error. Cannot read the public key"
               });
               return
          }
          console.log('coming here')
          let tokenInfo = await jwt.verify(token, publicKey);
          console.log('coming here 2')

          console.log(tokenInfo.payload)
          const user=await User.findById(tokenInfo.payload.id)
          //console.log(user)
          if(tokenInfo.payload.id !== user._id.toString()) {
               res.status(403).json({
                   success: false,
                   message: "Access Denied to the resource!"
               });
               return
          }
          console.log('coming here 3')
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