'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, UUID } = app.Sequelize;

  const Project = app.model.define('project', {
    id: {
      type: UUID,
      primaryKey: true,
      unique: true
    },
    name: {
      type: STRING(30),
      allowNull: false
    }, // 英文标识，必须唯一
    name_cn: STRING(30), // 中文标识
    creator: UUID,
    visitor: STRING(100),
  });

  // Project.prototype.associate = function() {
  //   app.model.Project.hasMany(app.model.Post, { as: 'posts' });
  // };

  return Project;
};
