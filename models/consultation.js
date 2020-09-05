/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('consultation', {
    idconsultation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    race: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    symptoms: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    disease: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    idpet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pet',
        key: 'idpet'
      }
    },
    idveterinary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'veterinary',
        key: 'nordinal'
      }
    }
  }, {
    timestamps: false
  }, {
    tableName: 'consultation'
  });
};
