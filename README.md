# Node Dashboard

<!-- TODO learn markup for readmes -->

## Create new styles

* Choose a name for your style sheet
* Filenaming is important (use dash syntax, no camel case)
* Create a new scss file in app/development eg yourchosenname.scss
* In app/defauls/defaults.json, add your stylesheet name to the stylesheets array
* Add an image titles yourchosenname.png to app/public/images
* add your styles for body background and individual widgets
* Your stylesheet will be placed last so any styles use will apply over defaults
* Use the basic reset available {{ }} as a starter if you want.

## Jenkins widget setup

* You'll need your api key and a crumb
* You'll find your crumb from the menu next to your name at the top right of each page - Choose configure, then show API token
* For the crumb:
* Go to YourJenkinsURL/crumbIssuer/api/json to get your crumb
