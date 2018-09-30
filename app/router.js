'use strict';

const { wrapper,makeSwaggerRouter} = require('egg-swagger-decorator');

module.exports = app => {
  wrapper(app, {
    title: '埋点接口',
    version: 'v1.0.0',
    description: '埋点接口',
  });

  makeSwaggerRouter(app);
  require('./router/account')(app);
};
