'use strict';

const { wrapper,makeSwaggerRouter} = require('egg-swagger-decorator');

module.exports = app => {
  require('./router/account')(app);
  require('./router/event')(app);
  require('./router/project')(app);
  require('./router/baseMeta')(app);
  wrapper(app, {
    title: '埋点接口',
    version: 'v1.0.0',
    description: '埋点接口',
    prefix: '/',
    swaggerHtmlEndpoint: '/swagger-html',
    swaggerJsonEndpoint: '/swagger-json'
  });

  makeSwaggerRouter(app);

};
