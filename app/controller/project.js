const Controller = require('egg').Controller;
const { request, summary, query, path, body, tags ,description,responses}=require('egg-swagger-decorator');
const group = tags(['项目管理']);

const projectInfoSchema = {
    name: { type: 'string', required: true },
  };

class ProjectController extends Controller {
    constructor(ctx) {
        super(ctx);
        this.session = ctx.session;
    }

    @request('get', '/project')
    @summary('获取项目列表')
    @description('获取项目列表')
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
            properties:projectInfoSchema
          }
        }
    }})
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
        const { name } = ctx.request.body;
        ctx.body = await ctx.service.project.create({ name });
    }

    async destory() {
        const ctx = this.ctx;
        const { id } = ctx.request.body;
        ctx.body = await ctx.service.project.destory(id);
    }

    async show() {
        const ctx = this.ctx;
        const { id, startDate, endDate } = ctx.query;
    }

    async detail() {
        const ctx = this.ctx;
        const { id, pageId } = ctx.query; 
    }
}