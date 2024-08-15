"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Passenger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Ticket, {
        foreignKey: 'passenger_id'
      })
    }
  }
  Passenger.init(
    {
      p1_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      p1_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      p1_gender: {
        type: DataTypes.ENUM("M", "F", "T"),
        allowNull: false
      },
      p1_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      p2_name: DataTypes.STRING,
      p2_age: DataTypes.INTEGER,
      p2_gender: DataTypes.ENUM("M", "F", "T"),
      p2_status: DataTypes.STRING,
      p3_name: DataTypes.STRING,
      p3_age: DataTypes.INTEGER,
      p3_gender: DataTypes.ENUM("M", "F", "T"),
      p3_status: DataTypes.STRING,
      p4_name: DataTypes.STRING,
      p4_age: DataTypes.INTEGER,
      p4_gender: DataTypes.ENUM("M", "F", "T"),
      p4_status: DataTypes.STRING,
      p5_name: DataTypes.STRING,
      p5_age: DataTypes.INTEGER,
      p5_gender: DataTypes.ENUM("M", "F", "T"),
      p5_status: DataTypes.STRING,
      p6_name: DataTypes.STRING,
      p6_age: DataTypes.INTEGER,
      p6_gender: DataTypes.ENUM("M", "F", "T"),
      p6_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Passenger",
    }
  );
  return Passenger;
};
