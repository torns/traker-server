module.exports = options => {

  return async function checkLogin(ctx, next) {
   
    const userId = await this.ctx.cookies.get('token', {
      encrypt: false, httpOnly: true 
    })
    let user = await this.ctx.app.redis.get(userId);
    if (!user) {
        user = this.ctx.session.currentUser;
    } else {
        user = JSON.parse(user);
    }
    if (!user){
      return ctx.body = ctx.response.ServerResponse.error( '用户未登录',ctx.response.ResponseCode.NO_LOGIN);
    }else {
      if (options.checkAdmin && user.role !== 1) {
        return ctx.body = ctx.response.ServerResponse.error( '用户不是管理员无权操作',ctx.response.ResponseCode.NO_AUTH);
      }
    }
    await next()
  };
};
