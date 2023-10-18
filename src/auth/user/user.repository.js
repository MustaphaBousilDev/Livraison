const User=require('./model/user.model')


const getUser=async(id)=>{
    try{
        const user=await User.find({_id:id}).populate('role')
        res.status(200).json(user)
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

const getAllUser=async(req,res)=>{
    try{
        const user=await User.find({}).populate('role')
        res.status(200).json(user)
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

const updateUser=async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        res.status(200).json(user)
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

const deleteUser=async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete({_id:req.params.id})
        res.status(200).json(user)
    }catch(err){
        res.status(400).json({message:err.message})
    }
}


module.exports={
    getUser,
    getAllUser,
    updateUser,
    deleteUser
}