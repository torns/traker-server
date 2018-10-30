module.exports = app => {
    const checkLogin = app.middleware.checkLogin({});
    const prefix="/project";
    
    app.router.get(prefix + '/all', checkLogin, app.controller.project.all);
    app.router.get(prefix + '/self', checkLogin, app.controller.project.self);
    app.router.get(prefix + '/visit', checkLogin, app.controller.project.visit)

    app.resources('project', '/project', checkLogin, app.controller.project);
    
  
  };
  