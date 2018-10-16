const Controller = require('egg').Controller;
const { request, summary, query, path, body, tags ,description,responses}=require('egg-swagger-decorator');
const group = tags(['项目管理']);


class ProjectController extends Controller {
    constructor(ctx) {
        super(ctx);
        this.session = ctx.session;
    }

    async _getCurrentUser() {
        const userId = await this.ctx.cookies.get('token', {
            encrypt: false, httpOnly: true 
        })
        let user = await this.ctx.app.redis.get(userId);
        if (!user) {
            user = this.ctx.session.currentUser;
        } else {
            user = JSON.parse(user);
        }
        return user;
    }

    async index() {
        const ctx = this.ctx;
        const { page = 1, pageSize = 10 } = ctx.query;
        const query = {
            page: ctx.helper.parseInt(page),
            pageSize: ctx.helper.parseInt(pageSize)
        }
        ctx.body = await ctx.service.project.list(query, this._getCurrentUser());
    }

    async self() {
        const ctx = this.ctx;
        const { page = 1, pageSize = 10 } = ctx.query;
        const query = {
            page: ctx.helper.parseInt(page),
            pageSize: ctx.helper.parseInt(pageSize)
        }
        ctx.body = await ctx.service.project.self(query, this._getCurrentUser());
    }

    async visit() {
        const ctx = this.ctx;
        const { page = 1, pageSize = 10 } = ctx.query;
        const query = {
            page: ctx.helper.parseInt(page),
            pageSize: ctx.helper.parseInt(pageSize)
        }
        ctx.body = await ctx.service.project.visit(query, this._getCurrentUser());
    }

    async create() {
        const ctx = this.ctx;
        const { name, nameCn } = ctx.request.body;
        const rule={
            name:{
              type:'string',
              message:'项目英文名称不能为空',
              max:20,
              format:/^\s*[a-zA-Z\d_-]+\s*$/,

            }
          }
          try {
              ctx.validate(rule);
          } catch(e) {
            return ctx.body = ctx.response.ServerResponse.error('参数不合法');
        }



        ctx.body = await ctx.service.project.create({ name: name.trim(), nameCn: nameCn.trim() }, this._getCurrentUser());
    }

    async destroy() {
        const ctx = this.ctx;
        const id = ctx.helper.parseInt(ctx.params.id);
        ctx.body = await ctx.service.project.destroy(id, this._getCurrentUser());
    }

    async update() {
        // 只能修改中文标识
        const ctx = this.ctx;
        const id = ctx.helper.parseInt(ctx.params.id);
        const { nameCn } = ctx.request.body;
        if (!ctx.helper.isNotEmpty(nameCn)) {
           return ctx.body = ctx.response.ServerResponse.error('参数不合法');
        }
        ctx.body = await ctx.service.project.update({id, nameCn: nameCn.trim()}, this._getCurrentUser());
    }


}

module.exports = ProjectController;
