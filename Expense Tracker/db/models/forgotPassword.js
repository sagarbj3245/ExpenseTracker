
module.exports = (sequelize, DataTypes) => {
  const ForgotPassword = sequelize.define('ForgotPassword', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  return ForgotPassword;
};
