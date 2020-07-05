/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('petowner', {
    idpetowner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    adress: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    phonenum: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'petowner'
  });
};
