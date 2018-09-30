'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_sequelize-example';

  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    "username": "yuhonyon",
    "password": "123456",
    "database": "tracker_development",
    host: '97.64.36.18',
    port: 3306,
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  exports.static = {
     maxAge: 31536000,
  };

  return config;
};
