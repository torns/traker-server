'use strict';

module.exports = {
up: async (queryInterface, Sequelize) => {
    const { DATE, STRING, INTEGER } = Sequelize;
    await queryInterface.createTable('projects', {
      id: { type: INTEGER, primaryKey: true, unique: true },
      project_code: STRING(30),
      project_name: STRING(30),
      creator: STRING(40),
      visitor: STRING(100),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('projects');
  },
};
