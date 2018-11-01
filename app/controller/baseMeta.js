const Controller = require('egg').Controller;


class BaseMetaController extends Controller {
    constructor(ctx) {
        super(ctx);
    }

    async index() {
        const ctx = this.ctx;
        const { page = 1, pageSize = 10 } = ctx.query;
        const query = {
          ...ctx.query
            page: ctx.helper.parseInt(page),
            pageSize: ctx.helper.parseInt(pageSize),

        }
        ctx.body = await ctx.service.baseMeta.list(query);
    }

    async create() {
        const ctx = this.ctx;
        const rule={
            trackId:{
              type:'string',
              message:'事件ID不能为空',
              max:100,
              format:/^\s*[a-zA-Z\d_-]+\s*$/,

            },
            trackName: {
                type: 'string',
                max: 100,
                message: '项目名称不能为空'
            }
          }
          try {
              ctx.validate(rule);
          } catch(e) {
            return ctx.body = ctx.response.ServerResponse.error('参数不合法');
        }

        ctx.body = await ctx.service.baseMeta.create({ ...ctx.request.body });
    }

    async update() {

    }
}

module.exports = BaseMetaController;
