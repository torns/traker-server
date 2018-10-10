const { SUCCESS, ERROR } = require('../constant/responseCode');

module.exports = class ServerResponse {
  constructor(status, msg, data) {
    this.status = status;
    this.msg = msg;
    this.data = data;
  }
  isSuccess() {
    return this.status === SUCCESS;
  }

  getStatus() {
    return this.status;
  }

  getData() {
    return this.data;
  }

  getMsg() {
    return this.msg;
  }

  static success(msg="", data={}, SUCCESS) {
    return new ServerResponse(SUCCESS, msg, data);
  }
  static error(errorMsg="",errorCode=ERROR) {
    return new ServerResponse(errorCode, errorMsg,null);
  }

};
