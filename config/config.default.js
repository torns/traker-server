'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_sequelize';

  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    "username": "yuhonyon",
    "password": "123456",
    "database": "tracker_development",
    host: '97.64.36.18',
    port: 3306,
  };

  config.redis = {
    client: {
      port: 6379,
      host: '97.64.36.18',
      db: 1,
      password: '123456'
    }
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.bodyParser={
    formLimit: '1000kb',
    jsonLimit: '1000kb',
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/xml', 'application/xml'],
    }
  };

  exports.static = {
     maxAge: 31536000,
  };



  return config;
};
