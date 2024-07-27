const express = require('express');
const transactionRouter = express.Router();
const transactionController = require('../controllers/transactions');
const { transferValidator } = require('../middlewares/validator/transaction');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management routes
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all user transactions
 *     description: Retrieve all transactions for the authenticated user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
transactionRouter.get('/transactions', auth, transactionController.getAllUserTransaction);

/**
 * @swagger
 * /deposito:
 *   post:
 *     summary: Deposit an amount
 *     description: Deposit a specified amount into the user's account
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount to deposit
 *                 example: 1000
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
transactionRouter.post('/deposito', auth, transactionController.transactionDepositoByUser);

/**
 * @swagger
 * /transfer:
 *   post:
 *     summary: Transfer an amount
 *     description: Transfer a specified amount to another user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount to transfer
 *                 example: 1000
 *               recepientId:
 *                 type: string
 *                 description: ID of the recipient user
 *                 example: 123e4567-e89b-12d3-a456-426614174001
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
transactionRouter.post('/transfer', auth, transferValidator, transactionController.transactionTransferByUser);

module.exports = transactionRouter;
