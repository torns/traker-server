module.exports = app => {
  const checkLogin = app.middleware.checkLogin({});
  const prefix="/accounts";
  app.resources('accounts', '/accounts', app.controller.account);

  app.router.post(prefix+'/login', app.controller.account.login);
  app.router.get(prefix+'/logout', app.controller.account.logout);
  app.router.post(prefix+'/register', app.controller.account.register);

};
