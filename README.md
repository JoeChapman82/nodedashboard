# Node Dashboard

<!-- TODO learn markup for readmes -->

## Setup

* npm install
* gulp runs the default development tasks - port 3000, browsersync 3001
* gulp build should just get everything ready in the public folder

## Basic widget creation guide

* Choose a name for you widget. *Naming is important. You'll need to use the same name in a few different places.*
* In development/widgets create a new folder for your widget
* Create a .nkj file in the folder with your chosen name eg yourchosenname.njk
* Create a .scss file. The name isn't important
* A div will be wrapped around your widget with the class widget-yourchosenname . Use this to style the background colour etc.
* Add a .js file with any javascript or JQuery you'd like to use. The name isn't important
* Finally go to app/defaults/defaults.json and add a JSON object in the following format
  * yourwidgetname {
    name: yourwidgetname,
    displayName: The name that will appear on the selection button,
    width: A number, 1 - 4 (The default width)
    height: Any number as long as it's 1, (The default height)
    dataCaller: true/false (See below for calling data),
    dataRate: number - frequency of datacalls in milliseconds (60000 minimum at the moment),
    dataCallTo: I've not set this one up properly yet,
    style: The default stylesheet for your widget (currently on dashing is available),
    available: true / false (Whether the widget is avaiable in the selection menu)    
  }

## Data calls basic guide

* in app/data-calls create a .js file named yourchosenname.js
* For now, look at weather.js for a simple example, xkcd.js for a slightly more complicated one, and jenkins for a mildly complicated one.
* That should be it for now. Your data will be called and available to your widget in your .njk file as data.yourwidgetname

## Recalls for data
* For now, check out xkcd.js, weather.js or progress.js in development/widgets
* Requests can be made for JSON - see xkcd.js or a rendered nunjucks partial - see weather.js
* Any partial in the development/widgets folder (that has a data caller set up) will be rendered with updated data.
* You can even add further partials to your widget .njk file if you just want to update smaller chunks. Just bob the .njk partial in the folder and return that partial in the .js file ajax call



## Create new stylesheets

* Choose a name for your style sheet
* Create a new scss file in app/development eg yourchosenname.scss
* In app/defaults/defaults.json, add your stylesheet name to the stylesheets array
* Add an image titles yourchosenname.png to app/public/images
* add your styles for body background and individual widgets...
* Or use the basic reset available at {{ not made yet }} as a starter if you want.
* Either select your stylesheet from the select menu or just change the style of the fist object in the defaults.json file to your stylesheet name to set it as default.
* Your stylesheet will be placed last so any styles use will apply over defaults

## Jenkins widget setup

* You'll need your api key and a crumb
* You'll find your API token from the menu (In your Jenkins) next to your name at the top right of each page - Choose configure, then show API token
* For the crumb:
* Go to YourJenkinsURL/crumbIssuer/api/json to get your crumb
* Sorry, that's it for now (Set environment variables for key, url and crumb - I need to change the variable names first).
