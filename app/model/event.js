'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Event = app.model.define('event', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: STRING(30), // 事件类型
    name: STRING(30), // 事件名称
    project_id: INTEGER, // 所属项目
    created_at: DATE, // 触发日期
    updated_at: DATE,
    action_count: INTEGER, // 触发次数
    action_time: INTEGER // 触发时长
  });

  // Event.prototype.associate = function() {
  //   app.model.Event.hasMany(app.model.Post, { as: 'posts' });
  // };

  return Event;
};
