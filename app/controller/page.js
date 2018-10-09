const Controller = require('egg').Controller;
const { request, summary, query, path, body, tags ,description,responses}=require('egg-swagger-decorator');
const group = tags(['页面分析']);

const projectInfoSchema = {
    name: { type: 'string', required: true },
  };

class PageController extends Controller {
    constructor(ctx) {
        super(ctx);
        this.session = ctx.session;
    }

    async findOrCreate() {
        const ctx = this.ctx;
        const { data = [] } = ctx.request.body;
        ctx.body = await ctx.service.findOrCreate(data);
    }
    
    
}