// features/lists/lists.route.ts
const express=require('express')
const {} =require('./auth.controller')
const {validateToken} = require('../../common/middleware/app.middleware')
const {
    getAllItems,
    getAccessToken ,
    createUser,
    login,
    handleRefreshTokens,
    loginAdmin,
    logOut,
} = require('./auth.controller')

const router = express.Router();

router.post('/',getAccessToken);
router.get('/', validateToken,getAllItems);
router.get('/logout',logOut)
router.post('/register',createUser);
router.get("/refresh", handleRefreshTokens);
router.post('/login',login)
router.post('/login-admin',loginAdmin)
//router.post('/activate',activeAccount)
//router.post('/sendVerification',sendVerification)
//router.post('/sendResetPasswordCode',resetPassword)
//router.post('/changePassword',changePassword)

module.exports = router;