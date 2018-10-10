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
        const { name, name_cn } = ctx.request.body;
        ctx.body = await ctx.service.project.create({ name, name_cn });
    }

    async destory() {
        const ctx = this.ctx;
        const { id } = ctx.params;
        ctx.body = await ctx.service.project.destory(id);
    }

    
}

module.exports = ProjectController;