'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Passengers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      p1_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      p1_age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      p1_status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      p2_name: {
        type: Sequelize.STRING
      },
      p2_age: {
        type: Sequelize.INTEGER
      },
      p2_status: {
        type: Sequelize.STRING
      },
      p3_name: {
        type: Sequelize.STRING
      },
      p3_age: {
        type: Sequelize.INTEGER
      },
      p3_status: {
        type: Sequelize.STRING
      },
      p4_name: {
        type: Sequelize.STRING
      },
      p4_age: {
        type: Sequelize.INTEGER
      },
      p4_status: {
        type: Sequelize.STRING
      },
      p5_name: {
        type: Sequelize.STRING
      },
      p5_age: {
        type: Sequelize.INTEGER
      },
      p5_status: {
        type: Sequelize.STRING
      },
      p6_name: {
        type: Sequelize.STRING
      },
      p6_age: {
        type: Sequelize.INTEGER
      },
      p6_status: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Passengers');
  }
};