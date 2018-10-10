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
        return !!data;
    }
    
    async list({ page = 1, pageSize = 10, creator = '', role = 0}) {
        const result = await this.ProjectModel.findAndCountAll({
            where: { creator: role === 1 ? null : creator  },
            offset: (page - 1) * pageSize,
            limit: pageSize
        });
        if (result) {
            return this.ServerResponse.success('查询成功', result);
        } else {
            return this.ServerResponse.error('查询失败');
        }
    }


    async create(data) {
        const { name, name_cn } = data;
        let key = '';
        let project = await this._checkExistByField('name', name);
        if (project) {
            return this.ServerResponse.error('项目已经存在', this.ResponseCode.ERROR_ARGUMENT);
        } else {
            project = await this.ProjectModel.create({ name, name_cn, creator: this.ctx.session.name });
            key = this.ctx.helper.hashCode(name);
        }
        if (project) {
            return this.ServerResponse.success('创建成功', key);
        } else {
            return this.ServerResponse.error('创建失败');
        }
    }

    async destory(id) {
        const project = await this.ProjectModel.findById(id);
        if (project) {
            return this.ServerResponse.success('删除成功');
        } else {
            return this.ServerResponse.error('项目不存在');
        }
    }

    
    
}

module.exports = Project;