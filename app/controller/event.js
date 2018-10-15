'use strict';

const Controller = require('egg').Controller;
const { request, summary, query, path, body, tags ,description,responses}=require('egg-swagger-decorator');
const group = tags(['事件管理']);




class EventController extends Controller {
  constructor(ctx){
    super(ctx)
    this.session = ctx.session;
  }

  /**
   * [track 获取埋点]
   * @return {Promise} [description]
   */
  @request('get', '/event')
  @summary('获取埋点')
  @description('获取埋点,支持get&post')
  @group
  @query({
   data: { type: 'object', required: false,  description: '页码' },
   lib: { type: 'object', required: false, description: '每页尺寸' }
  })
  @responses({ 200: {description:'OK'}})
  async track() {
    const ctx = this.ctx;
    const body=ctx.request.body;
    let data=null;

    if(ctx.method==='GET'){
      data=ctx.query.data
    }else{
      data=body
    }
    data=JSON.parse(Buffer.from(data,'base64').toString())
    ctx.body =await ctx.service.event.track(data);
  }


  async index() {
    const ctx = this.ctx;
    const { type, page = 1, pageSize = 10, projectId } = ctx.query;
    ctx.body =await ctx.service.event.list({...ctx.query});
  }

}

module.exports = EventController;
