const Service = require('egg').Service;

class Project extends Service {
    constructor(ctx) {
        super(ctx);
        this.session = ctx.session;
        this.ProjectModel = ctx.model.Project;
        this.PageModel = ctx.model.Page;
        this.ResponseCode = ctx.response.ResponseCode;
        this.ServerResponse = ctx.response.ServerResponse;
        this.Op = ctx.app.Sequelize.Op;
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


    async create({ name }) {
        const project = await this.ProjectModel.create({ name, creator: this.ctx.session.name });
        if (project) {
            return this.ServerResponse.success('创建成功', project);
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

    async show({ page = 1, pageSize = 10, id = null, startDate = '1978-01-01 00:00:00', endDate = '1978-01-01 23:59:59' }) {
        const page = await this.PageModel.findAndCountAll({ 
            where: {
                project_id: id,
                visit_at: {
                    [this.Op.between]: [startDate, endDate]
                }
            },
            offset: (page - 1) * pageSize,
            limit: pageSize
        });
         
        

    }

    
}

module.exports = Project;