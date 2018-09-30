'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Account = app.model.define('account', {
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

  // Account.prototype.associate = function() {
  //   app.model.Account.hasMany(app.model.Post, { as: 'posts' });
  // };

  return Account;
};
