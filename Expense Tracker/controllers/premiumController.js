const { User, Expense } = require('../db');
const { Parser } = require('json2csv');
const { Op } = require('sequelize');


exports.showLeaderboard = async (req, res) => {
  const leaderboard = await User.findAll({
    attributes: ['name', 'totalExpense'],
    order: [['totalExpense', 'DESC']]
  });
  res.json(leaderboard);
};


exports.filteredReport = async (req, res) => {
  const { filter } = req.query;
  const userId = req.user.userId;

  let where = { userId };
  const today = new Date();

  if (filter === 'daily') {
    where.date = today.toISOString().split('T')[0];
  } else if (filter === 'monthly') {
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    where.date = { [Op.gte]: monthStart };
  } else if (filter === 'yearly') {
    const yearStart = new Date(today.getFullYear(), 0, 1);
    where.date = { [Op.gte]: yearStart };
  }

  const expenses = await Expense.findAll({ where, order: [['date', 'DESC']] });

  const total = expenses.reduce((acc, e) => acc + Number(e.amount), 0);
  res.json({ expenses, total });
};


exports.downloadReport = async (req, res) => {
  const { filter } = req.query;
  const userId = req.user.userId;

  let where = { userId };
  const today = new Date();

  if (filter === 'daily') {
    where.date = today.toISOString().split('T')[0];
  } else if (filter === 'monthly') {
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    where.date = { [Op.gte]: monthStart };
  } else if (filter === 'yearly') {
    const yearStart = new Date(today.getFullYear(), 0, 1);
    where.date = { [Op.gte]: yearStart };
  }

  const expenses = await Expense.findAll({
    where,
    attributes: ['date', 'time', 'amount', 'description', 'category'],
    order: [['date', 'DESC']]
  });

  const rows = expenses.map(e => ({
    Date: e.date,
    Time: e.time || '',
    Amount: e.amount,
    Description: e.description,
    Category: e.category
  }));

  const parser = new Parser({ fields: ['Date', 'Time', 'Amount', 'Description', 'Category'] });
  const csv = parser.parse(rows);

  res.header('Content-Type', 'text/csv');
  res.attachment(`expense_${filter}_report.csv`);
  res.send(csv);
};
