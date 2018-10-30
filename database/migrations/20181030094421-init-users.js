'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, UUID, UUIDV4 } = Sequelize;
    await queryInterface.createTable('users', {
      identify: {type:UUID,primaryKey: true,defaultValue: UUIDV4},
      user_id:INTEGER,
      ua:STRING(300),
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
