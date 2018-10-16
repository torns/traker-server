'use strict';
const { ROLE_CUSTOMER } = require('../constant/role');
module.exports = app => {
  const { STRING, INTEGER, DATE, UUID, UUIDV4 } = app.Sequelize;

  const Account = app.model.define('account', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    mobile: STRING(40),
    password:STRING(100),
    role: {
      type: INTEGER(4),
      defaultValue: ROLE_CUSTOMER
    },
    created_at: DATE,
    updated_at: DATE,
  });

  // Account.prototype.associate = function() {
  //   app.model.Account.hasMany(app.model.Post, { as: 'posts' });
  // };

  return Account;
};
