module.exports = app => {
    const checkLogin = app.middleware.checkLogin({});
    const prefix="/baseMeta";

    app.resources('baseMeta', '/baseMeta', app.controller.baseMeta);


  };
