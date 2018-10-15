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
    this.UserModel = ctx.model.User;
    this.Op = this.app.Sequelize.Op;
  }



  async _checkExistByField(field, value) {
  }

  async _dealData(data){
    let identify=this.ctx.cookies.get('TRACKER_IDENTIFY');
    if(!identify){
      const user=await this.UserModel.create({
        ua:data.ua,
        clientHeight:data.clientHeight,
        clientWidth:data.clientWidth
      })

      this.ctx.cookies.set(
        'TRACKER_IDENTIFY',
        user.identify,
        {
          expires: new Date('2099-01-01')
        }
      )
    }

    data.forEach(item=>{
       item.firstVisit=!identify
       item.ip=this.ctx.request.ip
       item.ua=item.ua||this.ctx.request.header['user-agent'];
       item.pageTimes=JSON.stringify(item.pageTimes)
    })


    return data;


  }

  async track(data) {
    try{
      data=JSON.parse(data)

      data=await this._dealData(data)

      const response =await this.EventModel.bulkCreate(data);
      if(response){
        return this.ServerResponse.success("保存成功")
      }else{
        return this.ServerResponse.error("保存失败")
      }
    }catch(e){
      console.log(e)
      return this.ServerResponse.error("保存失败")
    }

  }


  async list({ page = 1, pageSize = 10, type, projectId, startDate, endDate }) {



  }


}

module.exports = Event;
