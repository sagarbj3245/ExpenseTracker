module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    time: { type: DataTypes.TIME, allowNull: false },
    note: { type: DataTypes.STRING }, 
    userId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    timestamps: true
  });

  return Expense;
};
