const Service = require('egg').Service;

class BaseMeta extends Service {

    constructor(ctx) {
        super(ctx)
        this.BaseMetaModel = ctx.model.BaseMeta;
        this.ServerResponse = ctx.response.ServerResponse;
    }

    async _checkExistByField(conditions) {
        const data = await this.BaseMetaModel.findOne({
            where: conditions,
        });
        return data;
    }

    async list(query) {
        const { page = 1, pageSize = 10, projectId } = query;

        const result = await this.BaseMetaModel.findAndCountAll({
            where: {
                projectId
            },
            order: [['id', 'DESC']],
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
        const { trackId, projectId } = data;
        let result = await this._checkExistByField({'projectId': projectId});
        if (!result) {
            return this.ServerResponse.error('项目不存在', this.ResponseCode.ERROR_ARGUMENT);
        }     
        result = await this._checkExistByField({'projectId': projectId, 'trackId': trackId});
        if (result) {
            return this.ServerResponse.error('元事件已经存在', this.ResponseCode.ERROR_ARGUMENT);
        } else {
            result = await this.ProjectModel.create({ ...data, creator: this.ctx.session.currentUser.mobile });
        }
        if (result) {
            return this.ServerResponse.success('创建成功');
        } else {
            return this.ServerResponse.error('创建失败');
        }
    }

}

module.exports = BaseMeta;