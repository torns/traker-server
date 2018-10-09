'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Project = app.model.define('project', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    creator: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  });

  // Project.prototype.associate = function() {
  //   app.model.Project.hasMany(app.model.Post, { as: 'posts' });
  // };

  return Project;
};
