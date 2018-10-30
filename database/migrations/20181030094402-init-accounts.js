'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 accounts 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('accounts', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING(30),
      moblie: STRING(40),
      password:STRING(100),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 accounts 表
  down: async queryInterface => {
    await queryInterface.dropTable('accounts');
  },
};
