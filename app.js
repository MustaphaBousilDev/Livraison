const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
//get db connection from config/dbConnect.js
const authRouter=require('./auth/auth.router')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./common/middleware/errorHandler')
const { authMiddleware } = require('./middleware/authMiddleware')
const PORT=process.env.PORT || 4000

//connect to db
app.use(bodyParser.json())
app.use(cookieParser());
//this is for form data  urlencoded is meaning of form data extended is false means only string and array
app.use(bodyParser.urlencoded({ extended: false }))


 
app.use('/api/user',authRouter)
app.use('/api/product',authMiddleware,productRouter)
app.use('/api/category',authMiddleware,categoryRouter)
app.use('/api/subcategory',authMiddleware,subCategoryRouteer)
app.use('/api/brands',authMiddleware,brandRouter)
app.use('/api/country',authMiddleware,countryRouter)
app.use('/api/city',authMiddleware,cityRouter)
app.use('/api/sizes',authMiddleware,sizeRouter)
app.use('/api/colors',authMiddleware,colorRouter)
app.use('/api/images-uploads',authMiddleware,imgsRoute)

//this is for not found
app.use(notFound)
//this is for error handler 
app.use(errorHandler)

app.listen(PORT,()=>{
     console.log(`Server is running on port ${PORT}`)
})