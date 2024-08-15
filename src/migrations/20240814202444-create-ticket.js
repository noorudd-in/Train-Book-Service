'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pnr: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      from_schedule_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      to_schedule_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('booked', 'cancelled')
      },
      class: {
        type: Sequelize.ENUM('SL', '3E', '1A', '2A', '3A')
      },
      category: {
        type: Sequelize.ENUM('general', 'ladies', 'senior_citizen', 'tatkal')
      },
      passenger_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Passengers',
          key: 'id',
          as: 'passenger_id'
        }
      },
      booked: {
        type: Sequelize.DATE,
        allowNull: false
      },
      cancelled: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  }
};