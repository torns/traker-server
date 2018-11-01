const Controller = require('egg').Controller;


class BaseMetaController extends Controller {
    constructor(ctx) {
        super(ctx);
    }

    async index() {
        const ctx = this.ctx;
        ctx.body = await ctx.service.baseMeta.list(ctx.query);
    }

    async create() {
        const ctx = this.ctx;
        const { trackId } = ctx.request.body;
        const rule={
            trackId:{
              type:'string',
              message:'事件ID不能为空',
              max:100,
              format:/^\s*[a-zA-Z\d_-$]+\s*$/,

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



        ctx.body = await ctx.service.project.create({ ...ctx.request.body });
    }

    async update() {

    }
}

module.exports = BaseMetaController;