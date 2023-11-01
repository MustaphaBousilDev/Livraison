// features/lists/lists.route.ts
const express=require('express')
const {} =require('./auth.controller')
const {validateToken} = require('../../common/middleware/app.middleware')
const {
     getAllItems,
     getAccessToken,
     createUser,
     login,
     handleRefreshTokens,
     loginAdmin,
     logOut,
     activeAccount,
     resetPassword,
     validateResetPassword,
     changePassword,
     getUserAuth
} = require('./auth.controller');
const { authMiddleware } = require('../../common/middleware/authMiddleware');

const router = express.Router();

router.post('/',getAccessToken);
router.get('/', validateToken,getAllItems);
router.get('/logout',logOut)
router.post('/register',createUser);
router.get("/refresh", handleRefreshTokens);
router.post('/login',login)
router.post('/login-admin',loginAdmin)
router.get('/activate/:token',activeAccount)
//router.post('/sendVerification',sendVerification)
router.post('/sendResetPasswordCode',resetPassword)
router.post('/validateResetPassword/:email',validateResetPassword)
router.post('/changePassword',changePassword)
router.get('/getUserAuth/:token',getUserAuth)
router.get('/logout/:token',authMiddleware,logOut)


module.exports = router;