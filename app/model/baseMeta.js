'use strict';

module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;

    const BaseMeta = app.model.define('base_meta', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        creator: STRING(40),
        projectId: {
            type: INTEGER,
            field: 'project_id'
        },
        trackId: {
            type: STRING(100),
            field: 'track_id'
        },
        trackName: {
            type: STRING(100),
            field: 'track_name'
        },
        status: {
            type: INTEGER,
            defaultValue: 1
        },
        tags: STRING(100),
        description: {
            type: STRING(100),
            
        }
    })
    return BaseMeta;
}