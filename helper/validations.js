// Custom Error class
const User=require('../src/auth/user/model/user.model')
const validator=require('validator')

const EmailValidator=(email)=>{
    let check= String(email)
    .toLowerCase()
    .match(/^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/)
    if(!check){
         throw new Error('email is not valid')
    }
}


const PasswordValidator=(password)=>{
    let check= String(password)
    

    if(!check){
         throw new Error('password is not valid')
    }

    return true
}

const LengthValidator=(text,min,max)=>{
    if(text.length > max || text.length < min){
        return false
    }
    return true
}

const validateImage=(image)=>{          
    if(image.mimetype.split('/')[0] !== 'image'){
         return false;
    }
    //validate image type 
    const imageType=image.mimetype.split('/')[1]
    if(imageType !== 'jpeg' && imageType !== 'jpg' && imageType !== 'png'){
         return false;
    }
    if(image.size > 1024 * 1024 * 5){
         return false;
    }

    return true;
}

const validateNumberIntegers=(number)=>{
    if(!Number.isInteger(number)){
         return false;
    }
    return true;
}

const validateNumber=(number)=>{
    if(!Number(number)){
         return false;
    }
    return true;
}


const validateString=(text,minChar=1,maxChar=20)=>{
    if(!String(text) || text.length < minChar || text.length >300){
         return false
    }
    return true 
}

const validateStatus=(status)=>{
    //must be 1 or 0
    if(status !== 1 && status !== 0){
         return false;
    }
    return true;
}



const registerValidation=(data)=>{
    const registerSchema=validator_express.checkSchema({
        username:{
            trim:true,
            isLength:{
                errorMessage:'username should be between 3 and 20 characters',
                options:{min:3,max:20}
            },
            escape:true,
        },
        email:{
            trim:true,
            isEmail:{
                errorMessage:'email is not valid'
            },
            escape:true,
        },
        password:{
            trim:true,
            isLength:{
                errorMessage:'password should be between 6 and 20 characters',
                options:{min:6,max:20}
            },
            escape:true,
        }
    })
}

const loginValidation=(data)=>{
    const loginSchema=validator_express.checkSchema({
        email:{
            trim:true,
            isEmail:{
                errorMessage:'email is not valid'
            },
            escape:true,
        },
        password:{
            trim:true,
            isLength:{
                errorMessage:'password should be between 6 and 20 characters',
                options:{min:6,max:20}
            },
            escape:true,
        }
    })
}

module.exports={
    EmailValidator,
    PasswordValidator,
    LengthValidator,
    validateImage,
    validateStatus,
    validateString,
    validateNumberIntegers,
    validateNumber,
    validateImage,
    registerValidation,
    loginValidation
}