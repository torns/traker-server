'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Page = app.model.define('page', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: STRING(100),
    name: STRING(30),
    page_id: INTEGER,
    project_id: INTEGER, // 所属项目
    visit_time: INTEGER, // 停留时长
    visit_at: DATE, // 访问时间
    visit_count: INTEGER, // 访问次数
    entry_count: INTEGER, // 入口页次数
    exit_count: INTEGER // 退出页次数
  });

  return Page;
};
