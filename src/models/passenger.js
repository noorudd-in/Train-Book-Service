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
      p1_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      p2_name: DataTypes.STRING,
      p2_age: DataTypes.INTEGER,
      p2_status: DataTypes.STRING,
      p3_name: DataTypes.STRING,
      p3_age: DataTypes.INTEGER,
      p3_status: DataTypes.STRING,
      p4_name: DataTypes.STRING,
      p4_age: DataTypes.INTEGER,
      p4_status: DataTypes.STRING,
      p5_name: DataTypes.STRING,
      p5_age: DataTypes.INTEGER,
      p5_status: DataTypes.STRING,
      p6_name: DataTypes.STRING,
      p6_age: DataTypes.INTEGER,
      p6_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Passenger",
    }
  );
  return Passenger;
};
