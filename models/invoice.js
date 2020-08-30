/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invoice', {
    idinvoice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    veterinary_nordinal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'veterinary',
        key: 'nordinal'
      }
    },
    amountinvoice: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  }, {
    tableName: 'invoice'
  });
};
