/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clinic', {
    nsiret: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    adress: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phonenum: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'clinic'
  });
};
