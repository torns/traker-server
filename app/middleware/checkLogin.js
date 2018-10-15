module.exports = options => {

  return async function checkLogin(ctx, next) {
    let user = await ctx.app.redis.get('currentUser');
    if (!user) {
      user = ctx.session.currentUser;
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
