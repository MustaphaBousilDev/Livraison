const User=require('./model/user.model')
const handlerAsync=require('express-async-handler')
const {
    getUserService,
    getAllUserService,
    updateUserService,
    deleteUserService


}=require('./user.service')

exports.getUser=handlerAsync(async(req,res)=>{
    await getUserService(req,res)
})
