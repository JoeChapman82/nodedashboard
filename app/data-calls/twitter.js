/*jshint esversion: 6 */
const ApiCaller = require('../services/api-caller');

const twitterCall = new ApiCaller();

twitterCall.options = {
  method: 'GET',
  url: 'https://api.twitter.com/1.1/search/tweets.json?q=DWP%20Digital&count=5',
  json: true,
  oauth: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    token: process.env.TWITTER_TOKEN,
    token_secret: process.env.TWITTER_TOKEN_SECRET,
  }
};

module.exports = function(req, res, next) {
  twitterCall.call().then(function(response) {
    res.locals.data.twitter = response;
    res.locals.data.twitter.mentioning = "DWP Digital";
    next();
  });
};
