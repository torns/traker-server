module.exports = app => {
    const checkLogin = app.middleware.checkLogin({});
    const prefix="/project";
    
    app.resources('project', '/project', checkLogin, app.controller.project);

    app.router.get(prefix + '/self', checkLogin, app.controller.project.self);
    app.router.get(prefix + '/visit', checkLogin, app.controller.project.visit)
  
  };
  