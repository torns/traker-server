'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE,UUID,UUIDV4 } = app.Sequelize;

  const User = app.model.define('user', {
    identify: {type:UUID,primaryKey: true,defaultValue: UUIDV4},
    userId:INTEGER,
    ua:STRING(300),
  });

  // User.prototype.associate = function() {
  //   app.model.User.hasMany(app.model.Post, { as: 'posts' });
  // };

  return User;
};
