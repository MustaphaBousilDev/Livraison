
const express=require('express') 
const app=express()
const helmet = require('helmet');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const winston = require('winston');
var cors = require('cors');
const dotenv=require('dotenv').config()
require('./config/dbConnect')
const userRouter = require('./src/auth/user/user.route');
const authRouter = require('./src/auth/auth.route');
const swaggerDocs=require('./helper/swagger')
const swaggerUi = require('swagger-ui-express');


// enabling cors for selected list of hosts or origins
var corsOptions = {
     origin: [{
          origin: 'http://localhost:5173',
          credentials: true 
     }],
};

//Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});
// Log an info message
logger.info('Application started');

// Log an error
logger.error('An error occurred');


//this is for not found
//app.use(notFound)
//this is for error handler 
//app.use(errorHandler)
const PORT=process.env.PORT || 4000

// enabling cors for all the requests
app.use(cors(corsOptions));

app.use(helmet());
//connect to db
app.use(bodyParser.json())
app.use(cookieParser());
//this is for form data  urlencoded is meaning of form data extended is false means only string and array
app.use(bodyParser.urlencoded({ extended: false }))


//app.use('/api/v1',userRouter)
app.use('/api/v1/auth',authRouter)
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT,()=>{
     console.log(`Server is running on port ${PORT}`)
})