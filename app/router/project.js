module.exports = app => {
    const checkLogin = app.middleware.checkLogin({});
    const prefix="/project";
    
    app.resources('project', '/project', app.controller.project);

  
  };
  