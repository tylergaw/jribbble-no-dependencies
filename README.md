# Jribbble No Dependency
A jQuery-free version of the JavaScript [Dribbble API](http://dribbble.com/api) API wrapper

Live demos available at [http://lab.tylergaw.com/jribbble](http://lab.tylergaw.com/jribbble)

## Dependencies
* None, just that purty JavaScript that runs in your favorite Web Browser.

## Building
Jribbble uses a Makefile that is pretty much jQuery's Makefile. The Makefile adds the version number and
date to the output files then creates the Ugly version of Jribbble using [UglifyJS](https://github.com/mishoo/UglifyJS)

NodeJS is required to build an Ugly version of Jribbble.

To build navigate to the Jribbble directory and run the `make` command

## Credit where it's due
I used ~93.2% of the GET portion of https://github.com/alotaiba/FlyJSONP