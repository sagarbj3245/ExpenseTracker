const { Expense, User, sequelize } = require('../db');

exports.addExpense = async (req, res) => {
  const { amount, description, category, date, time, note } = req.body; 
  const userId = req.user.userId;

  const t = await sequelize.transaction();
  try {
    const expense = await Expense.create(
      { amount, description, category, date, time, note, userId }, 
      { transaction: t }
    );

    const user = await User.findByPk(userId, { transaction: t });
    user.totalExpense += parseFloat(amount);
    await user.save({ transaction: t });

    await t.commit();
    res.status(201).json(expense);
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).send('Server error');
  }
};


exports.getExpenses = async (req, res) => {
  const userId = req.user.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Expense.findAndCountAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    res.json({
      expenses: rows, 
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.deleteExpense = async (req, res) => {
  const userId = req.user.userId;
  const expenseId = req.params.id;

  const t = await sequelize.transaction();
  try {
    const expense = await Expense.findOne({
      where: { id: expenseId, userId },
      transaction: t,
    });

    if (!expense) {
      await t.rollback();
      return res.status(403).send('Not allowed');
    }

    const user = await User.findByPk(userId, { transaction: t });
    user.totalExpense -= parseFloat(expense.amount);
    if (user.totalExpense < 0) user.totalExpense = 0;
    await user.save({ transaction: t });

    await expense.destroy({ transaction: t });

    await t.commit();
    res.sendStatus(204);
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.editExpense = async (req, res) => {
  const { amount, description, category, date, time, note } = req.body; 
  const userId = req.user.userId;
  const expenseId = req.params.id;

  const t = await sequelize.transaction();
  try {
    const expense = await Expense.findOne({
      where: { id: expenseId, userId },
      transaction: t,
    });

    if (!expense) {
      await t.rollback();
      return res.status(403).send('Not allowed');
    }

    const user = await User.findByPk(userId, { transaction: t });

  
    user.totalExpense -= parseFloat(expense.amount);
    user.totalExpense += parseFloat(amount);
    if (user.totalExpense < 0) user.totalExpense = 0;

    await user.save({ transaction: t });

  
    expense.amount = amount;
    expense.description = description;
    expense.category = category;
    expense.date = date;
    expense.time = time;
    expense.note = note; 
    await expense.save({ transaction: t });

    await t.commit();
    res.sendStatus(200);
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).send('Server error');
  }
};
