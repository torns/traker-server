'use strict';
require('babel-register')({
  plugins: [
    'transform-decorators-legacy',
  ],
});

module.exports = app => {
  app.beforeStart(async function() {
    await app.model.sync({force:true});
  });
};
