module.exports = app => {
    const checkLogin = app.middleware.checkLogin({});
    const prefix="/project";
    
    app.resources('project', '/project', app.controller.project);

    app.router.get(prefix + '/self', app.controller.project.self);
    app.router.get(prefix + '/visit', app.controller.project.visit)
  
  };
  