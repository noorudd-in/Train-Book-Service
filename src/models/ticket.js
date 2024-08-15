"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Passenger, {
        foreignKey: 'passenger_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Ticket.init(
    {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pnr: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: DataTypes.ENUM("booked", "cancelled"),
      class: DataTypes.ENUM("SL", "3E", "1A", "2A", "3A"),
      category: DataTypes.ENUM("general", "ladies", "senior_citizen", "tatkal"),
      passenger_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      booked: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      cancelled: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
