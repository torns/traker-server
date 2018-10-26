const Service = require('egg').Service;

class Project extends Service {
    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.session = ctx.session;
        this.ProjectModel = ctx.model.Project;
        this.EventModel = ctx.model.Event;
        this.ResponseCode = ctx.response.ResponseCode;
        this.ServerResponse = ctx.response.ServerResponse;
        this.Op = ctx.app.Sequelize.Op;
    }

    async _checkExistByField(field, value) {
        const data = await this.ProjectModel.findOne({
          attributes: [ field ],
          where: { [field]: value },
        });
        return data;
    }

    
    async list({ page = 1, pageSize = 10 }) {
        const { id } = this.ctx.session.currentUser;
        // 0:超级管理员 1:普通管理员 2:普通用户
        const result = await this.ProjectModel.findAndCountAll({
            attributes: ['id', 'name', 'nameCn'],
            where: {
                [this.Op.or]: [
                    { creator: id }, { visitor: { [this.Op.like]: id }}
                ]
            },
            offset: (page - 1) * pageSize,
            limit: pageSize
        });
        if (result) {
            return this.ServerResponse.success('查询成功', {totalCount: result.count, list: result.rows });
        } else {
            return this.ServerResponse.error('查询失败');
        }
    }

    async self({ page = 1, pageSize = 10 }) {
        const { id } = this.ctx.session.currentUser;
        const result = await this.ProjectModel.findAndCountAll({
            attributes: ['id', 'name', 'nameCn'],
            where: { creator: id  },
            offset: (page - 1) * pageSize,
            limit: pageSize
        });
        if (result) {
            return this.ServerResponse.success('查询成功', {totalCount: result.count, list: result.rows });
        } else {
            return this.ServerResponse.error('查询失败');
        }
    }

    async visit({ page = 1, pageSize = 10 }) {
        const { id } = this.ctx.session.currentUser;
        const result = await this.ProjectModel.findAndCountAll({
            attributes: ['id', 'name', 'nameCn'],
            where: { 
                creator: {
                    [this.Op.ne]: id
                },
                visitor: {
                    [this.Op.like]: id
                } 
            },
            offset: (page - 1) * pageSize,
            limit: pageSize
        });
        if (result) {
            return this.ServerResponse.success('查询成功', {totalCount: result.count, list: result.rows });
        } else {
            return this.ServerResponse.error('查询失败');
        }
    }



    async create(data) {
        const { name } = data;
        
        let project = await this._checkExistByField('name', name);
        if (project) {
            return this.ServerResponse.error('项目已经存在', this.ResponseCode.ERROR_ARGUMENT);
        } else {
            project = await this.ProjectModel.create({ ...data, creator: this.ctx.session.currentUser.mobile });
        }
        if (project) {
            return this.ServerResponse.success('创建成功', project);
        } else {
            return this.ServerResponse.error('创建失败');
        }
    }

    async destroy(id) {
        const project = await this._checkExistByField('id', id);
        // 普通用户无权删除
        if (project.creator !== this.ctx.session.currentUser.mobile) {
            return this.ServerResponse.error('你没有权限删除');
        }
        
        if (project) {
            await project.destroy()
            return this.ServerResponse.success('删除成功');
        } else {
            return this.ServerResponse.error('项目不存在');
        }
    }

    async update({id, ...data}) {
        // 普通用户无权更新
        const project = await this._checkExistByField('id', id);
        if (project.creator !== this.ctx.session.currentUser.mobile) {
            return this.ServerResponse.error('你没有权限删除');
        }
        if (project) {
            await project.update(data);
            return this.ServerResponse.success('更新成功');
        } else {
            return this.ServerResponse.error('项目不存在');
        }
    }

    
    
}

module.exports = Project;