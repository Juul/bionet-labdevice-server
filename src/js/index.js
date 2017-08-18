

import { h, render, Component, createElement } from 'preact'

import Clock from './clock.js'


function renderAll() {
  var app = document.getElementById('app');
  app.innerHTML = ''; // TODO why is this necessary?
  render(<Clock />, app);
}


// hot module reloading
if(module.hot) {
  module.hot.accept();
//  module.hot.accept('./clock.js', renderAll);
}

renderAll();



