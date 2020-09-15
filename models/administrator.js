/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('administrator', {
    idadministrator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    timestamps: false
  }, {
    tableName: 'administrator'
  });
};
/* jshint indent: 2 */
