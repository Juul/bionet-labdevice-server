#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var colors = require('colors');
var browserify = require('browserify');
var watchify = require('watchify');
var minimist = require('minimist');
var beep = require('beepbeep');

var argv = minimist(process.argv.slice(2), {
  alias: {
    d: 'dev'
  },
  boolean: [
    'dev'
  ],
  default: {}
});

var output = path.join(__dirname, '..', 'static', 'build', 'bundle.js');

function getTime() {
  var d = new Date;
  var t = [d.getHours(), d.getMinutes(), d.getSeconds()];
  t = t.map(function(i) {
    return (i < 9) ? '0'+i : i;
  })
  return t[0] + ':' + t[1] + '.' + t[2];
}


function onBuildEnd(msg) {
  console.log("Completed".green + ((msg) ? (': ' + msg) : ''));
}

function onBuildStart() {
  process.stdout.write("Build started at " + getTime() + "... ");

  var outStream = fs.createWriteStream(output);

  if(!argv.dev) {
    outStream.on('close', onBuildEnd);
  }

  b.bundle()

    .on('error', function(err) {
      beep();
      if(err instanceof SyntaxError) {
        // Format syntax error messages nicely
        var re = new RegExp(err.filename+'\:? ?');
        var msg = err.message.replace(re, '');
        msg = msg.replace(/ while parsing file\:.*/, '');
        console.error();
        console.error("\nError: ".red + msg.underline);
        console.error();
        console.error("Filename:", err.filename);
        console.error();
        console.error(err.loc);
        console.error();
        console.error(err.codeFrame);
        console.error();
      } else {
        console.error(err);
      }
    })
  
    .pipe(outStream);
}

var b = browserify({
  entries: [path.join(__dirname, '..', 'src', 'index.js')],
  cache: {},
  packageCache: {}
})

if(argv.dev) {
  console.log("Watching for changes...".yellow);
  b.plugin(watchify);
}

b.on('update', function(time) {
  onBuildStart();  
});

if(argv.dev) {
  b.on('log', onBuildEnd);
}

b.transform('babelify', {
  presets: [
    'es2015'
  ],
  plugins: [
    ['transform-react-jsx', {pragma: 'h'}]
  ]
})

onBuildStart();