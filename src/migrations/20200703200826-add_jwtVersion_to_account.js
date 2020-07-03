'use strict';

const jwt = require("../helpers/jwt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.addColumn('Accounts', 'jwtVersion', {
     type: Sequelize.INTEGER,
     allowNull: false,
     after: 'password',
     defaultValue: 0,
   })
   
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Accounts', 'jwtVersion');
     /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
