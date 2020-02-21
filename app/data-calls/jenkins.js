/*jshint esversion: 6 */
const ApiCaller = require('../services/api-caller');

const jenkinsCall = new ApiCaller();

jenkinsCall.options = {
  url: process.env.JENKINS_URL,
  rejectUnauthorized: false,
  json: true,
  timeout: 10000,
  headers: {
    "Jenkins-Crumb": process.env.CRUMB
  },
};

module.exports = function(req, res, next) {
  jenkinsCall.call().then(function(response) {
    if (typeof response !== 'undefined') {
    res.locals.data.jenkins = response;
    res.locals.data.jenkins.successfulJobs = 0;
    res.locals.data.jenkins.totalJobs = res.locals.data.jenkins.jobs.length;
    res.locals.data.jenkins.jobs.forEach(function(job) {
      if (job.lastCompletedBuild !== null && typeof job.lastCompletedBuild !== 'undefined') {
      if (job.lastCompletedBuild.result === 'SUCCESS') {
        res.locals.data.jenkins.successfulJobs++;
      }
    }
  });
}
    next();
  });
};
