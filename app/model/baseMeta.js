'use strict';

module.exports = app => {
    const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

    const BaseMeta = app.model.define('base_meta', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
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
        status: BOOLEAN,
        tags: STRING(100),
        description: {
            type: STRING(100),
            
        }
    })
    return BaseMeta;
}