'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Project = app.model.define('project', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_id: INTEGER, // 项目标识
    name: {
      type: STRING(30),
      allowNull: false
    }, // 英文标识，必须唯一
    name_cn: STRING(30), // 中文标识
    creator: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  });

  // Project.prototype.associate = function() {
  //   app.model.Project.hasMany(app.model.Post, { as: 'posts' });
  // };

  return Project;
};
