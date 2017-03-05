/*jshint esversion: 6 */
const ApiCaller = require('../services/api-caller');

const jenkinsCall = new ApiCaller();

module.exports = function(req, res, next) {
  console.log(res.locals.data);
  jenkinsCall.options = {
    url: process.env.JENKINS_URL,
    rejectUnauthorized: false,
    json: true,
    timeout: 10000,
    headers: {
      "Jenkins-Crumb": process.env.CRUMB
    },
  };
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

/**** Jenkins Ball colour info

public enum BallColor implements StatusIcon {
    RED("red",Messages._BallColor_Failed(), ColorPalette.RED),
    RED_ANIME("red_anime",Messages._BallColor_InProgress(), ColorPalette.RED),
    YELLOW("yellow",Messages._BallColor_Unstable(), ColorPalette.YELLOW),
    YELLOW_ANIME("yellow_anime",Messages._BallColor_InProgress(), ColorPalette.YELLOW),
    BLUE("blue",Messages._BallColor_Success(), ColorPalette.BLUE),
    BLUE_ANIME("blue_anime",Messages._BallColor_InProgress(), ColorPalette.BLUE),
    // for historical reasons they are called grey.
    GREY("grey",Messages._BallColor_Pending(), ColorPalette.GREY),
    GREY_ANIME("grey_anime",Messages._BallColor_InProgress(), ColorPalette.GREY),

    DISABLED("disabled",Messages._BallColor_Disabled(), ColorPalette.GREY),
    DISABLED_ANIME("disabled_anime",Messages._BallColor_InProgress(), ColorPalette.GREY),
    ABORTED("aborted",Messages._BallColor_Aborted(), ColorPalette.GREY),
    ABORTED_ANIME("aborted_anime",Messages._BallColor_InProgress(), ColorPalette.GREY),
    NOTBUILT("nobuilt",Messages._BallColor_NotBuilt(), ColorPalette.GREY),
    NOTBUILT_ANIME("nobuilt_anime",Messages._BallColor_InProgress(), ColorPalette.GREY),
    ;

    private final Localizable description;
    private final String iconName;
    private final String iconClassName;
    private final String image;
    private final Color baseColor;

    BallColor(String image, Localizable description, Color baseColor) {
        this.iconName = Icon.toNormalizedIconName(image);
        this.iconClassName = Icon.toNormalizedIconNameClass(image);
        this.baseColor = baseColor;
        // name() is not usable in the constructor, so I have to repeat the name twice
        // in the constants definition.
        this.image = image+ (image.endsWith("_anime")?".gif":".png");
        this.description = description;
    }

    ****/
