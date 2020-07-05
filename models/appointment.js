/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('appointment', {
    idappointment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    reason: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    petowner_idpetownerappoint: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'petowner',
        key: 'idpetowner'
      }
    },
    pet_idpetappoint: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pet',
        key: 'idpet'
      }
    }
  }, {
    timestamps: false
  }, {
    tableName: 'appointment'
  });
};
