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
        const { name, role } = ctx.session;
        const { page = 1, pageSize = 10 } = ctx.query;
        const query = {
            creator: name,
            role,
            page: ctx.helper.parseInt(page),
            pageSize: ctx.helper.parseInt(pageSize)
        }
        ctx.body = await ctx.service.project.list(query);
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

    async destroy() {
        const ctx = this.ctx;
        const id = ctx.helper.parseInt(ctx.params.id);
        ctx.body = await ctx.service.project.destroy(id);
    }

    async update() {
        // 只能修改中文标识
        const ctx = this.ctx;
        const id = ctx.helper.parseInt(ctx.params.id);
        const { name_cn } = ctx.request.body;
        if (!ctx.helper.isNotEmpty(name_cn)) {
           return ctx.body = ctx.response.ServerResponse.error('参数不合法');
        }
        ctx.body = await ctx.service.project.update({id, name_cn: name_cn.trim()});
    }

    
}

module.exports = ProjectController;