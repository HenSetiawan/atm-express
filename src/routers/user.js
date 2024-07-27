const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');
const { registerValidator, updateValidator } = require('../middlewares/validator/user');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Retrieve the current user
 *     description: Retrieve the details of the currently authenticated user
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
userRouter.get('/api/v1/user', auth, userController.getCurrentUser);

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by their ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
userRouter.delete('/api/v1/user/:userId', auth, userController.deleteUserById);

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided details
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: user full name
 *                 example: hendy
 *               email:
 *                 type: string
 *                 description: email
 *                 example: hendy@app.com
 *               nik:
 *                 type: string
 *                 description: nik user
 *                 example: 12345678912345678912
 *               address:
 *                 type: string
 *                 description: user address
 *                 example: Jl. macan hitam, jakarta barat
 *               username:
 *                 type: string
 *                 description: username
 *                 example: hendy12345
 *               fullname:
 *                 type: string
 *                 description: password
 *                 example: admin12345
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
userRouter.post('/api/v1/register', registerValidator, userController.registerUser);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update the details of a user by their ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
userRouter.put('/api/v1/user/:id', updateValidator, userController.updateUserById);

module.exports = userRouter;
