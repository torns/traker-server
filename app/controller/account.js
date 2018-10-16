'use strict';

const Controller = require('egg').Controller;
const { request, summary, query, path, body, tags ,description,responses}=require('egg-swagger-decorator');
const group = tags(['账号管理']);

const accountInfoSchema = {
  name: { type: 'string', required: true },
  mobile: { type: 'string', required: true},
};


class AccountController extends Controller {
  constructor(ctx){
    super(ctx)
    this.session = ctx.session;
  }
  /**
   * [index 获取用户列表]
   * @return {Promise} [用户列表]
   */
  @request('get', '/account')
  @summary('获取用户列表')
  @description('获取用户列表')
  @group
  @query({
   page: { type: 'number', required: false, default: 1, description: '页码' },
   pageSize: { type: 'number', required: false, default: 20, description: '每页尺寸' }
  })
  @responses({ 200: {
    list:{
      type:'array',
      items:{
        type:'object',
        properties:accountInfoSchema
      }
    }
  }})
  async index() {
    const ctx = this.ctx;
    const query = {
      page: ctx.helper.parseInt(ctx.query.page),
      pageSize: ctx.helper.parseInt(ctx.query.pageSize),
    };
    ctx.body = await ctx.service.account.list(query);
  }

  /**
   * [update 修改用户信息]
   * @return {Promise} [用户信息]
   */
  @request('put', '/account/{id}')
  @summary('修改用户信息')
  @description('修改用户信息')
  @group
  @path({
    id: { type: 'number', required: true, description: '用户id' }
  })
  @body({
    name: { type: 'string', required: true },
    mobile: { type: 'string', required: true},
  })
  @responses({200:accountInfoSchema})
  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.body = await ctx.service.account.update({ id, updates: body });
  }

  /**
   * [destroy description]
   * @return {Promise} [description]
   */
  @request('delete', '/account/{id}')
  @summary('注销用户')
  @description('注销用户')
  @group
  @path({
    id: { type: 'number', required: true, description: '用户id' }
  })
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const response= await ctx.service.account.del(id);
    if(response.isSuccess()){
      ctx.session=null;
    }
    ctx.body=response
  }

  /**
   * [register description]
   * @return {Promise} [description]
   */
   @request('post', '/account/register')
   @summary('注册用户')
   @description('注册用户')
   @group
   @body({
     name: { type: 'string', required: true },
     mobile: { type: 'string', required: true},
     password: { type: 'string', required: true},
   })
   @responses({200:accountInfoSchema})
  async register() {

    const {ctx} = this;
    const rule={
      name:{
        type:'string',
        message:'用户名最多20个字符',
        max:20

      },
      mobile:{
        type:'string',
        format:/^1\d{10}$/,
        message:"手机号格式错误"
      },
      password:{
        type:'password',
        min:6,
        message:"密码最少6位"
      }
    }

    try {
        ctx.validate(rule)
    } catch (e) {

      return ctx.body = ctx.response.ServerResponse.error('参数不合法');
    }


    const account = await ctx.service.account.register(ctx.request.body);
    ctx.body = account;
  }

  /**
   * [login description]
   * @return {Promise} [description]
   */
   @request('post', '/account/login')
   @summary('登录用户')
   @description('登录用户')
   @group
   @body({
     mobile: { type: 'string', required: true},
     password: { type: 'string', required: true},
   })
   @responses({200:accountInfoSchema})
  async login() {
    const { mobile, password } = this.ctx.request.body;

    const response = await this.service.account.login(mobile, password);

    if (response.isSuccess()) {
      await this.ctx.app.redis.set('currentUser', response.getData());
      this.session.currentUser = response.getData();
    }

    this.ctx.body = response;
  }


  /**
   * [logout description]
   * @return {Promise} [description]
   */
   @request('get', '/account/logout')
   @summary('退出用户')
   @description('退出用户')
   @group
  async logout() {
    this.ctx.session = null;
    this.ctx.body = this.ctx.response.ServerResponse.success('退出成功')
  }
}

module.exports = AccountController;
