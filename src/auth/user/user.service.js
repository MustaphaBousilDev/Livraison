const asyncHandler=require('express-async-handler');
const {
    getUser,
    getAllUser,
    updateUser,
    deleteUser

}=require('./user.repository')


exports.getUserService=asyncHandler(async(req,res)=>{
    await getUser(req.params.id)
})

exports.getAllUserService=asyncHandler(async(req,res)=>{
    await getAllUser(req,res)
})

exports.updateUserService=asyncHandler(async(req,res)=>{
    await updateUser(req,res)
})

exports.deleteUserService=asyncHandler(async(req,res)=>{
    await deleteUser(req,res)
})