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
        const { name, query, role } = ctx.session;
        const querys = {
            creator: name,
            role,
            page: ctx.helper.parseInt(query.page),
            pageSize: ctx.helper.parseInt(query.pageSize)
        }
        ctx.body = await ctx.service.project.list(querys);
    }

    async create() {
        const ctx = this.ctx;
        const { name, name_cn = name } = ctx.request.body;
        const project_id = ctx.helper.hashCode(name + Date.now().toString());

        if (!ctx.helper.isNotEmpty(name)) {
           return ctx.body = ctx.response.ServerResponse.error('参数不合法');
        }
        ctx.body = await ctx.service.project.create({ name: name.trim(), name_cn: name_cn.trim(), project_id });
    }

    async destory() {
        const ctx = this.ctx;
        const { id } = ctx.params;
        ctx.body = await ctx.service.project.destory(id);
    }

    async update() {
        const ctx = this.ctx;
        const id = ctx.helper.parseInt(ctx.params.id);
        const { name } = ctx.request.body;
        if (!ctx.helper.isNotEmpty(name)) {
           return ctx.body = ctx.response.ServerResponse.error('参数不合法');
        }
        ctx.body = await ctx.service.project.update({id, name: name.trim()});
    }

    
}

module.exports = ProjectController;