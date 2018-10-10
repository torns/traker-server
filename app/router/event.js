module.exports = app => {
  const checkLogin = app.middleware.checkLogin({});
  const prefix="/event";

  //app.resources('event', '/event',checkLogin, app.controller.event);

  app.router.post(prefix+'/track.gif', app.controller.event.track);
  app.router.get(prefix+'/track.gif', app.controller.event.track);

};
