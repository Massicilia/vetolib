/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pet', {
    idpet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    race: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    sex: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    tatooID: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    chipID: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    sterilized: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    assurance: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    nassurance: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    petowner_idpetowner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'petowner',
        key: 'idpetowner'
      }
    }
  }, {
    timestamps: false
  }, {
    tableName: 'pet'
  });
};
