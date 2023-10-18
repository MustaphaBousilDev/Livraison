const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const validator = require('validator');
//create schema
const roleSchema=new mongoose.Schema({ 
    role:{
        type:String,
        required:[true,'role is required'],
        trim:true,
        uppercase:true,
        unique:true,
        //validation enum ADMIN or USER or EMPLOYEE
        enum:['MANAGER','USER','LIVREUR']
    },
    isBlocked: {type: Boolean,default: false,},
    user:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    ]
},{timestamps:true})

module.exports=mongoose.model('Role',roleSchema)