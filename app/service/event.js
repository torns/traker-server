'use strict';

const Service = require('egg').Service;
const groupBy = require('lodash/groupBy');


class Event extends Service {
  constructor(ctx){
    super(ctx)
    this.session = ctx.session;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
    this.EventModel = ctx.model.Event;
    this.Op = this.app.Sequelize.Op;
  }



  async _checkExistByField(field, value) {
  }

  async track(data) {
    try{
      data=JSON.parse(data)
      data.ip=this.ctx.request.ip;
      data.ua=data.ua||this.ctx.request.header['user-agent'];
      const response =await this.EventModel.bulkCreate(data);
      if(response){
        return this.ServerResponse.success("保存成功")
      }else{
        return this.ServerResponse.error("保存失败")
      }
    }catch(e){
      return this.ServerResponse.error("保存失败")
    }

  }


  async list({ page = 1, pageSize = 10, type, projectId, startDate, endDate }) {



  }


}

module.exports = Event;
