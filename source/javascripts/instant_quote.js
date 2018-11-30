import React from 'react';
import ReactDOM from 'react-dom';
import config from 'react-global-configuration';
import configuration from './config';

import QuoteBuilder from "./components/QuoteBuilder.js";

function onReady(completed) {
  if (document.readyState === "complete") {
    setTimeout(completed);
  } else {
    document.addEventListener("DOMContentLoaded", completed, false);
  }
}

onReady(function () {
  config.set(configuration);

  let quote_builder = document.getElementById("quote_builder");
  if (quote_builder) {
    ReactDOM.render(
      <QuoteBuilder/>,
      quote_builder
    );
  }
});
