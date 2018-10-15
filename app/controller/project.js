const Controller = require('egg').Controller;
const { request, summary, query, path, body, tags ,description,responses}=require('egg-swagger-decorator');
const group = tags(['项目管理']);


class ProjectController extends Controller {
    constructor(ctx) {
        super(ctx);
        this.session = ctx.session;
    }

    get currentUser() {
        let user = await this.ctx.app.redis.get('currentUser');
        if (!user) {
            user = this.ctx.session.currentUser;
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
        ctx.body = await ctx.service.project.list(query, this.currentUser);
    }

    async self() {
        const ctx = this.ctx;
        const { page = 1, pageSize = 10 } = ctx.query;
        const query = {
            page: ctx.helper.parseInt(page),
            pageSize: ctx.helper.parseInt(pageSize)
        }
        ctx.body = await ctx.service.project.self(query, this.currentUser);
    }

    async visit() {
        const ctx = this.ctx;
        const { page = 1, pageSize = 10 } = ctx.query;
        const query = {
            page: ctx.helper.parseInt(page),
            pageSize: ctx.helper.parseInt(pageSize)
        }
        ctx.body = await ctx.service.project.visit(query, this.currentUser);
    }

    async create() {
        const ctx = this.ctx;
        const { name, name_cn } = ctx.request.body;
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
          
        
           
        ctx.body = await ctx.service.project.create({ name: name.trim(), name_cn: name_cn.trim() }, this.currentUser);
    }

    async destroy() {
        const ctx = this.ctx;
        const id = ctx.helper.parseInt(ctx.params.id);
        ctx.body = await ctx.service.project.destroy(id, this.currentUser);
    }

    async update() {
        // 只能修改中文标识
        const ctx = this.ctx;
        const id = ctx.helper.parseInt(ctx.params.id);
        const { name_cn } = ctx.request.body;
        if (!ctx.helper.isNotEmpty(name_cn)) {
           return ctx.body = ctx.response.ServerResponse.error('参数不合法');
        }
        ctx.body = await ctx.service.project.update({id, name_cn: name_cn.trim()}, this.currentUser);
    }

    
}

module.exports = ProjectController;