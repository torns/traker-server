'use strict';

const Service = require('egg').Service;


class Account extends Service {
  constructor(ctx){
    super(ctx)
    this.session = ctx.session;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  async track(data) {
    console.log(data)
    //转行格式
    console.log(data)
    const response=true//await this.EventModel.bulkCreate(data);
    if(response){
      return this.ServerResponse.success("保存成功")
    }else{
      return this.ServerResponse.error("保存失败")
    }
  }


}

module.exports = Account;
