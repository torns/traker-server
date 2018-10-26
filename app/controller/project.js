const Controller = require('egg').Controller;
const { request, summary, query, path, body, tags ,description,responses}=require('egg-swagger-decorator');
const group = tags(['项目管理']);


class ProjectController extends Controller {
    constructor(ctx) {
        super(ctx);
        this.session = ctx.session;
    }

    

    async index() {
        const ctx = this.ctx;
        const { page = 1, pageSize = 10 } = ctx.query;
        const query = {
            page: ctx.helper.parseInt(page),
            pageSize: ctx.helper.parseInt(pageSize)
        }
        ctx.body = await ctx.service.project.list(query);
    }

    async self() {
        const ctx = this.ctx;
        const { page = 1, pageSize = 10 } = ctx.query;
        const query = {
            page: ctx.helper.parseInt(page),
            pageSize: ctx.helper.parseInt(pageSize)
        }
        ctx.body = await ctx.service.project.self(query);
    }

    async visit() {
        const ctx = this.ctx;
        const { page = 1, pageSize = 10 } = ctx.query;
        const query = {
            page: ctx.helper.parseInt(page),
            pageSize: ctx.helper.parseInt(pageSize)
        }
        ctx.body = await ctx.service.project.visit(query);
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

            },
            nameCn: {
                type: 'string',
                max: 20,
                message: '项目名称不能为空'
            }
          }
          try {
              ctx.validate(rule);
          } catch(e) {
            return ctx.body = ctx.response.ServerResponse.error('参数不合法');
        }



        ctx.body = await ctx.service.project.create({ ...ctx.request.body });
    }

    async destroy() {
        const ctx = this.ctx;
        const id = ctx.helper.parseInt(ctx.params.id);
        ctx.body = await ctx.service.project.destroy(id);
    }

    async update() {
        const ctx = this.ctx;
        const id = ctx.helper.parseInt(ctx.params.id);
        const { nameCn } = ctx.request.body;
        const rule={
            nameCn: {
                type: 'string',
                max: 20,
                message: '项目名称不能为空'
            }
          }
          try {
              ctx.validate(rule);
          } catch(e) {
            return ctx.body = ctx.response.ServerResponse.error('参数不合法');
        }
        ctx.body = await ctx.service.project.update({...ctx.request.body});
    }


}

module.exports = ProjectController;
