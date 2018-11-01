'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('base_meta', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      project_id: INTEGER,
      creator: STRING(40),
      track_id: STRING(100),
      track_name: STRING(100),
      description: STRING(100),
      tags: STRING(100),
      status: {type: INTEGER(4), defaultValue: 1},
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('base_meta');
  }
};
