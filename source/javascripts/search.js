import React from 'react';
import ReactDOM from 'react-dom';
import config from 'react-global-configuration';
import configuration from './config';

import SearchApp from "./components/SearchApp";


function onReady(completed) {
  if (document.readyState === "complete") {
    setTimeout(completed);
  } else {
    document.addEventListener("DOMContentLoaded", completed, false);
  }
}

onReady(function () {
  config.set(configuration);

  const search_div = document.getElementById("search_results");
  if (search_div) {
    ReactDOM.render(
      <SearchApp/>,
      search_div
    );
  }
});
