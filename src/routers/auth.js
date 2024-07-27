const express = require('express');
const authRouter = express.Router();
const { loginValidator } = require('../middlewares/validator/login');
const authController = require('../controllers/auth');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization routes
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user and return a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: Password123
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
authRouter.post('/auth/login', loginValidator, authController.login);

/**
 * @swagger
 * /refresh-token:
 *   get:
 *     summary: Refresh JWT token
 *     description: Obtain a new JWT token using a refresh token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: New JWT token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
authRouter.get('/refresh-token', authController.refreshToken);

module.exports = authRouter;
