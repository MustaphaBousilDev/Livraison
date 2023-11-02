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
/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     tags:
 *       - logout
 *     summary: Point d'accès pour authentifier un utilisateur.
 *     description: Utilisez cette route pour vous connecter et obtenir un jeton d'authentification.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object contenant login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: logout success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: login success
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: All field are required
 *       409:
 *         description: Conflict - Email déja exist
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: email déja exist
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
router.get('/logout',logOut)
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - register
 *     summary: Point d'accès pour authentifier un utilisateur.
 *     description: Utilisez cette route pour vous connecter et obtenir un jeton d'authentification.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object contenant login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: login success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: login success
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: All field are required
 *       409:
 *         description: Conflict - Email déja exist
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: email déja exist
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
router.post('/register',createUser);
/**
 * @swagger
 * /api/v1/auth/refresh:
 *   get:
 *     tags:
 *       - refresh
 *     summary: Point d'accès pour authentifier un utilisateur.
 *     description: Utilisez cette route pour vous connecter et obtenir un jeton d'authentification.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object contenant login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: login success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: login success
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: All field are required
 *       409:
 *         description: Conflict - Email déja exist
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: email déja exist
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
router.get("/refresh", handleRefreshTokens);
/**
 * @swagger
 * /api/v1/auth/login: 
 *   post:
 *     tags:
 *       - login
 *     summary: Point d'accès pour authentifier un utilisateur.
 *     description: Utilisez cette route pour vous connecter et obtenir un jeton d'authentification.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object contenant login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: login success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: login success
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: All field are required
 *       409:
 *         description: Conflict - Email déja exist
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: email déja exist
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
router.post('/login',login)
/**
 * @swagger
 * /api/v1/auth/login-admin:
 *   post:
 *     tags:
 *       - login-admin
 *     summary: Point d'accès pour authentifier un utilisateur.
 *     description: Utilisez cette route pour vous connecter et obtenir un jeton d'authentification.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object contenant login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: login success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: login success
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: All field are required
 *       409:
 *         description: Conflict - Email déja exist
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: email déja exist
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
router.post('/login-admin',loginAdmin)
/**
 * @swagger
 * /api/v1/auth/activate/{token}:
 *   get:
 *     tags:
 *       - activate
 *     summary: Point d'accès pour authentifier un utilisateur.
 *     description: Utilisez cette route pour vous connecter et obtenir un jeton d'authentification.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object contenant login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: login success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: login success
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: All field are required
 *       409:
 *         description: Conflict - Email déja exist
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: email déja exist
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
router.get('/activate/:token',activeAccount)
/**
 * @swagger
 * /api/v1/auth/sendResetPasswordCode:
 *   post:
 *     tags:
 *       - sendResetPasswordCode
 *     summary: Point d'accès pour authentifier un utilisateur.
 *     description: Utilisez cette route pour vous connecter et obtenir un jeton d'authentification.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object contenant login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: login success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: login success
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: All field are required
 *       409:
 *         description: Conflict - Email déja exist
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: email déja exist
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
router.post('/sendResetPasswordCode',resetPassword)
/**
 * @swagger
 * /api/v1/auth/validateResetPassword/{email}:
 *   post:
 *     tags:
 *       - validateResetPassword
 *     summary: Point d'accès pour authentifier un utilisateur.
 *     description: Utilisez cette route pour vous connecter et obtenir un jeton d'authentification.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object contenant login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: login success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: login success
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: All field are required
 *       409:
 *         description: Conflict - Email déja exist
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: email déja exist
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
router.post('/validateResetPassword/:email',validateResetPassword)
/**
 * @swagger
 * /api/v1/auth/changePassword:
 *   post:
 *     tags:
 *       - changePassword
 *     summary: Point d'accès pour authentifier un utilisateur.
 *     description: Utilisez cette route pour vous connecter et obtenir un jeton d'authentification.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object contenant login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: login success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: login success
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: All field are required
 *       409:
 *         description: Conflict - Email déja exist
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: email déja exist
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
router.post('/changePassword',changePassword)
/**
 * @swagger
 * /api/v1/auth/getUserAuth/{token}:
 *   get:
 *     tags:
 *       - getUserAuth
 *     summary: Point d'accès pour authentifier un utilisateur.
 *     description: Utilisez cette route pour vous connecter et obtenir un jeton d'authentification.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object contenant login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: login success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: login success
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: All field are required
 *       409:
 *         description: Conflict - Email déja exist
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: email déja exist
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
router.get('/getUserAuth/:token',getUserAuth)
/**
 * @swagger
 * /api/v1/auth/logout/{token}:
 *   post:
 *     tags:
 *       - logout
 *     summary: Point d'accès pour authentifier un utilisateur.
 *     description: Utilisez cette route pour vous connecter et obtenir un jeton d'authentification.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object contenant login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: login success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: login success
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: All field are required
 *       409:
 *         description: Conflict - Email déja exist
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: email déja exist
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
router.get('/logout/:token',authMiddleware,logOut)


module.exports = router;