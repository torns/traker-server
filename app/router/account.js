module.exports = app => {
  const checkLogin = app.middleware.checkLogin({});
  const prefix="/account";

  app.resources('account', '/account',checkLogin, app.controller.account);

  app.router.post(prefix+'/logout', app.controller.account.logout);
  app.router.post(prefix+'/login', app.controller.account.login);
  app.router.post(prefix+'/register', app.controller.account.register);

};
