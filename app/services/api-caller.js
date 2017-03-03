/*jshint esversion: 6 */
const request = require('request');

class ApiCaller {
  constructor(url) {
    this.options = {
      url: url,
      rejectUnauthorized: false,
      json: true,
      headers: {},
    };
  }

  set options(val) {
    this._options = val;
  }

  get options() {
  return this._options;
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
    }).catch(function(error) {
      console.error(error);
      return;
    });
}

}

module.exports = ApiCaller;
