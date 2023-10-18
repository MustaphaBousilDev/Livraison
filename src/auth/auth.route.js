// features/lists/lists.route.ts
const express=require('express')
const {} =require('./auth.controller')
const {validateToken} = require('../../common/middleware/app.middleware')
const {getAllItems,getAccessToken } = require('./auth.controller')

const router = express.Router();

router.post('/',getAccessToken);
router.get('/', validateToken,getAllItems);

module.exports = router;