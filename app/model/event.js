'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Event = app.model.define('event', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    //埋点信息
    userId: {type:INTEGER,field:'user_id'},
    actionType: {type:STRING(30),field:'action_type'},
    eventName: {type:STRING(30),field:'event_name'},
    trackId: {type:STRING(100),field:'track_id'},
    pageId: {type:STRING(100),field:'page_id'},
    url: STRING(100),
    path: STRING(100),
    host: STRING(100),
    hash: STRING(100),
    domId:{type:STRING(100),field:'dom_id'},
    domClass:{type:STRING(200),field:'dom_class'},
    domHref:{type:STRING(100),field:'dom_href'},
    domName:{type:STRING(100),field:'dom_name'},
    domTag:{type:STRING(100),field:'dom_tag'},
    domContent:{type:STRING(200),field:'dom_content'},
    startTime:{type:DATE,field:'start_time'},
    endTime:{type:DATE,field:'end_time'},
    pageTimes:{type:STRING(200),field:'page_times'},
    invalidTime:{type:INTEGER,field:'invalid_time'},
    //预留3个自定义自动
    custom1:STRING(100),
    custom2:STRING(100),
    custom3:STRING(100),
    ip:STRING(100),




    //lib
    libVersion: {type:STRING(100),field:'lib_version'},
    libType: {type:STRING(100),field:'lib_type'},

    //client
    ua: STRING(100),
    clientWidth:{ type:INTEGER,field:'client_width'},
    clientHeight: {type:INTEGER,field:'client_height'},
    title: STRING(100),
    referrer: STRING(100),
    domain:STRING(100),


  });

  // Event.prototype.associate = function() {
  //   app.model.Event.hasMany(app.model.Post, { as: 'posts' });
  // };

  return Event;
};
