/*jshint esversion: 6 */

const request = require('request');
const qs = require('querystring');

module.exports = {

initialCall : function(req, res, next) {
const oauth = {
  callback: "http://localhost:3000/oauth-return",
  consumer_key: "oHKkO3BHZ7qt6r7P2pEbGnzDB",
  consumer_secret: "fOkgB1yT5SMAHOcCWvAGowH7qSjrvHgc712iREdflN9XsclbfV"
};

// const headers = [{
//   "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8."
// }];

const url = "https://api.twitter.com/oauth/request_token";

request.post({
  url: url,
  oauth: oauth,
}, function(error, response, body) {

  const requestData = qs.parse(body);
  const uri = 'https://api.twitter.com/oauth/authenticate' + '?' + qs.stringify({oauth_token: requestData.oauth_token});
  console.log(uri);
  res.locals.uri = uri;
  next();
});
}, returnCall : function(req, res, next) {

  const authData = req.body;
  console.log(req.body);
  console.log(authData);
  const oauth = {
    consumer_key: "oHKkO3BHZ7qt6r7P2pEbGnzDB",
    consumer_secret: "fOkgB1yT5SMAHOcCWvAGowH7qSjrvHgc712iREdflN9XsclbfV",
    token: "587597864-5uVXoe7PmHPnMLiqYakPZvx1xNCSmPwuBYbWK950",
    token_secret: "byOdmIkpTel6GjxRdV1e7LmDb2y1SXJw8a2B4dwnsW0Nk",
  //  verifier: req.body.oauth_verifier
  };
  const url = 'https://api.twitter.com/1.1/search/tweets.json?q=DWP%20Digital&count=5';

  request.get({
    url: url,
    oauth: oauth,
    json: true
  }, function(error, response, body) {
    console.log(error);
    console.log(response.body);
    res.locals. twitter = response.body;
    next();
  });
}
};
