const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/expenses', authMiddleware, expenseController.addExpense);

router.get('/expenses', authMiddleware, expenseController.getExpenses);

router.delete('/expenses/:id', authMiddleware, expenseController.deleteExpense);

router.put('/expenses/:id', authMiddleware, expenseController.editExpense);

module.exports = router;
