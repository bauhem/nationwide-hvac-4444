import React from 'react';
import ReactDOM from 'react-dom';
import netlifyIdentity from 'netlify-identity-widget';

import SyncApp from "./components/SyncApp";

window.netlifyIdentity = netlifyIdentity;
// You must run this once before trying to interact with the widget
netlifyIdentity.init();

function onReady(completed) {
  if (document.readyState === "complete") {
    setTimeout(completed);
  } else {
    document.addEventListener("DOMContentLoaded", completed, false);
  }
}

onReady(function () {
  const appDiv = document.getElementById('sync-app');

  if (appDiv) {
    ReactDOM.render(<SyncApp {...(appDiv.dataset)}/>, appDiv);
  }
});