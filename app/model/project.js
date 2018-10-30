'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, UUID } = app.Sequelize;

  const Project = app.model.define('project', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    projectCode: {
      type: STRING(30),
      allowNull: false,
      field: 'project_code'
    }, // 英文标识，必须唯一
    projectName: {
      type: STRING(30),
      field: 'project_name'
    }, // 中文标识
    creator: STRING(40), // 登录用户手机号
    visitor: STRING(100), // 手机号,连接
  });

  // Project.prototype.associate = function() {
  //   app.model.Project.hasMany(app.model.Post, { as: 'posts' });
  // };

  return Project;
};
