// features/lists/lists.route.ts
const express=require('express')
const {
    getUser
} =require('./user.controller')

const router = express.Router();

router.get('/user/:id', getUser);

module.exports = router;