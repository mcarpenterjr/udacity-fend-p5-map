# udacity-fend-p5-map
Udacity Front End Nano Degree Project 5.1 Neighborhood map, this is a SPA that runs on knockout.js, jQuery, and APIs from Google maps, Yelp and FourSquare. UI is powered by MaterializeCss and Font-Awesome.
## Developer Install Instructions
### Git... Going...
Use git to clone this repository into your chosen working directory.
[The Repository](https://github.com/mcarpenterjr/udacity-fend-p5-map.git)
#### Then...
**Open You're Favorite CLI and Start Pluggin' Away!**

### Install Node
_Node Install Instructions Go Here_
You can install nodeJs by following the instructions here...
[NODEjs](https://nodejs.org/en/download/)
This should also install NPM _(Node Package Manager)_.

## Installation
run the following commands from the project directory

`npm install`

Then

`npm update`

followed by

`npm install --global bower`

Then

`bower install`

followed by

`bower update`

_Running install followed by update is redundant
but this aides in preventing packages from not installing._

All required node packages, and bower components should be installed and the app development envirement should be setup.


## Using gulp

this app uses gulp as it's streaming build tool. below you will find some useful commands for building, testing, and optimising the app.

##### browserSync

use `gulp browser-sync` from the command line, this will launch the development version of the app with live reload. Watching for changes to `.html`  `.css`  `.js` files.

#### icon-builder-XX

use `gulp icon-builder-33` to launch a gulp task that resizes the glyphicons down to a usable icon size for usage through out the app.

The task can be modified to build other sizes also. Looking for the task in the gulp file, changing the `height:` and `width:` values will adjust the size of the icons output.
It is highly advisable to change the output directory ( `.pipe(gulp.dest('app/img/glyphs/33'))` ), when changing icon sizes, this will maintain a level of organization.

## Hard Coded Locations
Main area is West Dover, VT

## Powered by...
Hotel Sign by icon 54 from the Noun Project
Beer by Edward Boatman from the Noun Project
singer by riyazali from the Noun Project
Campfire by parkjisun from the Noun Project
Store by Edward Boatman from the Noun Project
skis by Creative Stall from the Noun Project
