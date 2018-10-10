const Service = require('egg').Service;

class Page extends Service {
    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.session = ctx.session;
        this.ProjectModel = ctx.model.Project;
        this.eventModel = ctx.model.Event;
        this.ResponseCode = ctx.response.ResponseCode;
        this.ServerResponse = ctx.response.ServerResponse;
        this.Op = ctx.app.Sequelize.Op;
    }

    async list({ page = 1, pageSize = 10, id = null, startDate = '1978-01-01 00:00:00', endDate = '1978-01-01 23:59:59' }) {
        const pages = await this.EventModel.findAndCountAll({ 
            where: {
                project_id: id,
                visit_at: {
                    [this.Op.between]: [startDate, endDate]
                },
                type: 'pageView'
            },
            offset: (page - 1) * pageSize,
            limit: pageSize
        });
         
        

    }

    async findOrCreate(data = []) {
        // 同一天的数据归纳在一条数据里
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const { name, url, project_id, visit_time, is_entry, is_exit } = item;
            // 通过url, project_id 生成page_id
            const page_id = ctx.helper.hashCode(url + project_id);
            await this.EventModel.findOrCreate({
                where: {
                    page_id,
                    // 如何比较日期
                    // visit_at: Date.now()
                },
                defaults: {
                    type: 'pageView',
                    name,
                    url,
                    project_id,
                    visit_count: 1,
                    visit_time,
                    entry_count: is_entry ? 1 : 0,
                    exit_count: is_exit ? 1 : 0 
                }
            }).spread((page, created) => {
                if (!created) {
                    // 更新数据
                }
            })
        }     

    }

    async show({ id = null, pageId = null, startDate = '1978-01-01 00:00:00', endDate = '1978-01-01 23:59:59'}) {
        const page = await this.PageModel.findAndCountAll({
            where: {
                project_id: id,
                page_id: pageId
            },
            order: ['visit_at', 'DESC'],
            offset: (page - 1) * pageSize,
            limit: pageSize
        })
    }
    
}

module.exports = Page;