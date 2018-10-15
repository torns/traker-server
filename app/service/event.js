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

    const response = await this.EventModel.bulkCreate(data);
    if(response){
      return this.ServerResponse.success("保存成功")
    }else{
      return this.ServerResponse.error("保存失败")
    }
  }


  async list({ page = 1, pageSize = 10, type, projectId, startDate, endDate }) {
    const event = await this.EventModel.findAll({
      attributes: ['name', 'start_time', 'end_time', 'visit_times', 'page_id'],
      where: {
        type,
        project_id: projectId,
        start_time: {
            [this.Op.between]: [startDate, endDate]
        }
        
      },
      limit: pageSize,
      offset: (page - 1) * pageSize
    });
    if (type === 'track_page') {
      const page = groupBy(event, 'page_id');
      for (let id in page) {
        const page_date = groupBy(page.in, 'start_time');
      }
    }


  }


}

module.exports = Event;
