const User=require('./model/user.model')
const asyncHandler=require('express-async-handler')
const {
    getUserService,
    getAllUserService,
    updateUserService,
    deleteUserService


}=require('./user.service')

exports.getUser=asyncHandler(async(req,res)=>{
    await getUserService(req,res)
})

//get All Users 
const getAllUsers=asyncHandler(async (req,res)=>{
    try{
         const users=await User.find()
         res.status(200).json({users})
    }catch(error){
         res.status(400).json({msg:error.message})
    }
})

//get user 
const getUser=asyncHandler(async (req,res)=>{
    const {id}=req.params 
    validateMongoDbId(id)
    try{
         const user=await User.findById(id)
         res.status(200).json({user})
    }catch(error){res.status(400).json({message:'user not found'})}
})

//update user 
const updateUser=asyncHandler(async (req,res)=>{
    const {_id}=req.user
    validateMongoDbId(_id)
    try{ 
         const updateUser=await User.findByIdAndUpdate(_id,{
              first_name:req?.body?.first_name,
              last_name:req?.body?.last_name,
              username:req?.body?.username,
              email:req?.body?.email,
              mobile:req?.body?.mobile,
              picture:req?.body?.picture,
              role:req?.body?.role,
         },{new:true})
         //check all fields change old value with new value
         res.status(200).json({msg:'user updated',updateUser})
    }catch(error){
         throw new Error(error.message)
    }
})

//delete user 
const deleteUser=asyncHandler(async (req,res)=>{
    const {id}=req.params 
    validateMongoDbId(id)
    try{
         const deleteUser=await User.findByIdAndDelete(id) 
         res.json({
              deleteUser,
         })
    }catch(error){
         throw new Error(error)
    }
})

//block user
const blockUser=asyncHandler(async (req,res)=>{
    const {id}=req.params 
    validateMongoDbId(id)
    try{
         const blockUser=await User.findByIdAndUpdate(
              id,{isBlocked:true},{new:true}
         )
         res.json(blockUser)
    }catch(error){
         throw new Error(error)
    }
})


//unblock user 
const unblockUser=asyncHandler(async (req,res)=>{
    const {id}=req.params 
    validateMongoDbId(id)
    try{
         const unblock=await User.findByIdAndUpdate(
              id, 
              {isBlocked:false},
              {new:true}
         )
         res.json({
              message:"User UnBlocked"
         })
    }catch(error){
         throw new Error(error)
    }
})

//update user password 
const updatePassword=asyncHandler(async (req,res)=>{
    const {_id}=req.user 
    const {password}=req.body 
    validateMongoDbId(_id)
    const user=await User.findById(_id)
    if(password){
         user.password=password
         const updatedPassword=await user.save()
         res.json(updatePassword)
    }else{
         res.json(user)   
    }
})



//reset password 
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
         sendResetCode(user.email, user.first_name, code);
         return res.status(200).json({
           message: "Email reset code has been sent to your email",
         });
       } catch (error) {
         res.status(500).json({ message: error.message });
       }
});

//send verifications when i want to verify my email when i want not when i register 
const sendVerification=asyncHandler(async (req,res)=>{
    try {
         const id = req.user.id;
         const user = await User.findById(id);
         if (user.verified === true) {
           return res.status(400).json({
             message: "This account is already activated.",
           });
         }
         const emailVerificationToken = generateToken(
           { id: user._id.toString() },
           "30m"
         );
         const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
         sendVerificationEmail(user.email, user.first_name, url);
         return res.status(200).json({
           message: "Email verification link has been sent to your email.",
         });
       } catch (error) {
         res.status(500).json({ message: error.message });
       }
})

//validate reset password 
const validateResetPassword=asyncHandler(async (req,res)=>{
    try {
         const { email, code } = req.body;
         const user = await User.findOne({ email });
         const Dbcode = await Code.findOne({ user: user._id });
         if (Dbcode.code !== code) {
           return res.status(400).json({
             message: "Verification code is wrong..",
           });
         }
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

//get profile 
const getProfile=asyncHandler(async(req,res)=>{
    try{
         const {username}=req.params
         const user=await User.findById(req.user.id)
         //await User.findOne({username}).select("-password") this code is mean i want to get all data without password
         const profile=await User.findOne({username}).select("-password")
         if(!profile){
              res.status(404).json({message:"user not found"})
         }
         res.json(profile)
    }catch(err){
         res.status(500).json({message:err.message})
    }
})

//update picture 
const updatePicture=asyncHandler(async (req,res)=>{
    try{
         const {url}=req.body 
         validateImage(url)
         const user=await User.findByIdAndUpdate(req.user.id,{
              picture:url
         })
         res.json(url)
    }catch(err){
         res.status(500).json({message:err.message})
    }
})

