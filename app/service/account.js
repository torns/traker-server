'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const md5 = require('md5');

class Account extends Service {
  constructor(ctx){
    super(ctx)

    this.session = ctx.session;
    this.AccountModel = ctx.model.Account;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  async _checkExistByField(field, value) {

    const data = await this.AccountModel.findOne({
      attributes: [ field ],
      where: { [field]: value },
    });
    return !!data;
  }

  async checkValid(type, value) {
    if (type.trim()) {
      if ('name' === type) {
        return await this._checkExistByField('name', value)
          ? this.ServerResponse.error('用户名已存在')
          : this.ServerResponse.success('用户名不存在');
      }
      if ('mobile' === type) {
        return await this._checkExistByField('mobile', value)
          ? this.ServerResponse.error('手机号已存在')
          : this.ServerResponse.success('手机号不存在');
      }
    }
    return this.ServerResponse.error('参数错误',this.ServerResponse.responseCode.ERROR_ARGUMENT);
  }

  async list({ page = 1, pageSize = 10 }) {
    const response=await this.AccountModel.findAndCountAll({
      attributes: ['id', 'name','mobile'],
      offset:(page-1)*pageSize,
      limit:pageSize,
      order: [[ 'id', 'desc' ]],
    });
    if(response){
      return this.ServerResponse.success("查询成功",response)
    }else{
      return this.ServerResponse.error("查询失败")
    }
  }


  async find(id) {
    const account = await this.AccountModel.findById(id);
    if (!account) {
      this.ctx.throw(404, 'account not found');
    }
    return account;
  }


  async update({ id, updates }) {
    const account = await this.AccountModel.findById(id);
    if (account) {
      await account.update(updates);
      return this.ServerResponse.success("更新成功")
    }else{
      return this.ServerResponse.error("账号不存在")
    }
  }

  async del(id) {
    const account = await this.AccountModel.findById(id);
    if (account) {
      await account.destroy();
      return this.ServerResponse.success("注销成功")
    }else{
      return this.ServerResponse.error("账号不存在")
    }
  }

  async register(account) {
    try{

      // 验证用户名
      const validNameResponse=await this.checkValid("name",account.name)
      if (!validNameResponse.isSuccess()) {
        return validNameResponse
      }
      //验证手机号
      const validmobileResponse=await this.checkValid("mobile",account.mobile)
      if (!validmobileResponse.isSuccess()) {
        return validmobileResponse
      }
      account.password=md5(account.password)
      account=await this.AccountModel.create(account);

      if(!account){
        return this.ServerResponse.error('注册失败')
      }

      account = account.dataValues
      _.unset(account, 'password');
      return this.ServerResponse.success("注册成功",account)
    }catch(e){
      return this.ServerResponse.error('注册失败')
    }

  }

  async login(mobile,password) {
    try{
      const validmobileResponse=await this.checkValid("mobile",mobile)
      if (validmobileResponse.isSuccess()) {
        return this.ServerResponse.error('账号不存在')
      }

    const account = await this.AccountModel.findOne({
        attributes: [ 'id', 'name', 'mobile' ],
        where: {
          mobile,
          password: md5(password),
        },
      });
      if(!account){
        return this.ServerResponse.error('密码错误')
      }

      return this.ServerResponse.success("登录成功",account.dataValues)
    }catch(e){
      return this.ServerResponse.error('登录失败')
    }

  }
}

module.exports = Account;
