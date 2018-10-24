'use strict';

// had enabled by egg
// exports.static = true;
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};


exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.redis = {
  enable: true,
  package: 'egg-redis'
};

exports.static = {
   maxAge: 31536000,
};


exports.cors = {
  enable: true,
  package: 'egg-cors'
}