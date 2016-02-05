# udacity-fend-p5-map
Udacity Front End Nano Degree Project 5.1 Neighborhood map, this is a SPA that runs on knockout.js, jQuery, and APIs from Google maps, Yelp and FourSquare. UI is powered by MaterializeCss and Font-Awesome.
## Developer Install Instructions
### Git... Going...
Use git to clone this repository into your chosen working directory.
[The Repository](https://github.com/mcarpenterjr/udacity-fend-p5-map.git)
#### Then...
**Open You're Favorite CLI and Start Pluggin' Away!**

### Requirements

- nodeJs
- npm (comes built into nodeJs)
- gulp
- bower

#### NPM
[Get nodeJs here][NPM].

Once node is installed you can open a bash and run
`npm install` if all dev dependencies from the package file do not install you may have to run `npm install -f` this will force the download and installation of all dependencies. I noticed this issue when cloning the repository to my other development stations.

#### bower
[More about Bower Here][BOWER]

While it is not 100% required to run the project, installing bower and related project packages, will help with future development. Run `bower install` if all project dependencies do not install try `bower install -f` this will force the download and installation of dependencies. This too was an issue when clonig to my other development stations.

### Using gulp

_Gulp should have been installed by bower, and most of the packages required should have installed with npm. If not run `bower install --save -dev gulp`_

Why gulp and not grunt? We don't have that many tasks that require automation, Gulp also lends it's self to ease of use and build streams. Keeping the development of this project simple and straight forward.

**Preview the build right away with `gulp`**

##### Gulp Default Task

The `gulp` default task. This launches a preview of the actual development build located in the `app/` directory. The stream is dependent on `browser-sync` and watches the `app/js/`, `app/css/`, `app/img/` and `app/` directories for any changes to `.js`, `.css` or `.html` files.
[More on gulp-browser-sync here][BRSNC]

_There is alot you can do with browser-sync_

#### The Build Task



## Hard Coded Locations
Main area is West Dover, VT

## Powered by...
Hotel Sign by icon 54 from the Noun Project
Beer by Edward Boatman from the Noun Project
singer by riyazali from the Noun Project
Campfire by parkjisun from the Noun Project
Store by Edward Boatman from the Noun Project
skis by Creative Stall from the Noun Project

[NPM]: (https://npmjs.org)
[BOWER]: (https://bower.io)
[BRSNC]: (https://www.browsersync.io/docs/gulp/)
