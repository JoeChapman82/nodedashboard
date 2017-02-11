/*jshint esversion: 6 */
const request = require('request');

class ApiCaller {
  constructor(url) {
    this.options = {
      url: url,
      json: true,
    };
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
