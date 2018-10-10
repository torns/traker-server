'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('projects', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      name_cn: STRING(30),
      creator: STRING(30),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('projects');
  }
};
