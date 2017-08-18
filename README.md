This is a work in progress. Come back later.

This is the web app used for initial registration of bionet labdevices (printers and scanners).

bionet labdevices are USB devices connected to a computer (usually a small single-board computer) running the [bionet-labdevice](https://github.com/biobricks/) software.

The labdevices keep a connection alive to their parent bionet node and receive print job from that node.

When a labdevice is first powered on, it needs to know which bionet node is its parent. This web app assists in this one-time configuration procedure.

# Development

To begin developing simple run:

```
npm run dev
```

This will start the server, watch for changes to js and css files and enable hot module reloading.

If you don't want hot module reloading do:

```
npm run dev --cold
```

Also available are these `npm run` commands:

* start: start server
* build: build js and css once
* watch: watch js and css and build when changed
* hot: same as watch but with hot module reloading
* build-js: build js once
* watch-js: watch js and build when changed
* hot-js: same as watch-js but with hot module reloading
* build-css: build css once
* watch-css: watch js and build when changed