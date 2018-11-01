'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER, BOOLEAN, DATE } = Sequelize;
    await queryInterface.createTable('base_metas', {
      id: { type: INTEGER, primaryKey: true, unique: true },
      project_id: INTEGER,
      track_id: STRING(100),
      track_name: STRING(100),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('base_metas');
  }
};
