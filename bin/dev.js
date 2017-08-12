#!/usr/bin/env node

/*
  This script launches both the builder (in watchify mode) and the server.
  Console output from builder and server are prefixed to differentiate them.
  If either exits then this script exits.
*/

var path = require('path');
var byline = require('byline');
var colors = require('colors');
var spawn = require('child_process').spawn;

// the '--color' argument is intercepted by the the 'colors' node module
var builder = spawn(path.join(__dirname, 'build.js'), ['-d', '--color']);

var server = spawn(path.join(__dirname, 'cmd.js'), [])

function prefix(str, prefix) {
  var els = str.split(/\r?\n/);
  return els.join("\n"+prefix);
}

var buildPrefix = "[builder] ".gray;
builder.stdout.setEncoding('utf8');
byline(builder.stdout).on('data', function(data) {
  process.stdout.write(buildPrefix + data + "\n");
});

builder.stderr.setEncoding('utf8');
byline(builder.stderr).on('data', function(data) {
  process.stderr.write(buildPrefix + data + "\n");
});

builder.on('close', function(code) {
  process.exit(code);
});

var servePrefix = "[server] ".magenta;
server.stdout.setEncoding('utf8');
byline(server.stdout).on('data', function(data) {
  process.stdout.write(servePrefix + data + "\n");
});

server.stderr.setEncoding('utf8');
byline(server.stderr).on('data', function(data) {
  process.stderr.write(servePrefix + data + "\n");
});

server.on('close', function(code) {
  process.exit(code);
});



