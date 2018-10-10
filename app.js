'use strict';
require('babel-register')({
  plugins: [
    'transform-decorators-legacy',
    'transform-object-rest-spread'
  ],
});

module.exports = app => {
  app.beforeStart(async function() {
    await app.model.sync({force:true});
  });
};
