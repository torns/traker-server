'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Event = app.model.define('event', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    created_at: DATE, 
    updated_at: DATE,
    user: INTEGER, // 用户标识
    type: STRING(30), // 事件类型
    name: STRING(30), // 事件名称
    project_id: INTEGER, // 所属项目
    page_id: INTEGER, 
    at: STRING(30),
    count: INTEGER, // 触发次数
    time: INTEGER, // 触发时长
    entry_count: INTEGER, // 入口页次数
    exit_count: INTEGER, // 退出页次数
  });

  // Event.prototype.associate = function() {
  //   app.model.Event.hasMany(app.model.Post, { as: 'posts' });
  // };

  return Event;
};
