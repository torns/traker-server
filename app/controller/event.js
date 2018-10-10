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
    console.log(ctx)
    ctx.body = await ctx.service.event.list();
  }


}

module.exports = EventController;
