/*jshint esversion: 6 */
const request = require('request');

class ApiCaller {
  constructor(url) {
    this.options = {
      url: url,
      json: true,
    };
  }

  set url(val) {
    this._options.url = val;
  }

  get url() {
  return this._options.url;
}

  call() {
    var self = this;
    return new Promise(function(resolve, reject) {
      request(self.options, function(error, response, body) {
        if (error) {
          reject(error);
        } else {
          resolve(response.body);
        }
      });
    });
}

}

module.exports = ApiCaller;
