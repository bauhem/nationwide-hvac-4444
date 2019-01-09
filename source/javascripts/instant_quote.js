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

  Snipcart.subscribe('item.added', function (item) {
    var ix = Webflow.require('ix');
    var $el = $('.div-added-to-cart');

    var trigger = {"type":"click","selector":".div-added-to-cart","stepsA":[{"wait":"300ms"},{"display":"flex","opacity":1,"height":"300px","transition":"opacity 750ms ease 0, height 750ms ease 0"},{"wait":"2000ms"},{"opacity":0,"height":"0px","transition":"opacity 750ms ease 0, height 750ms ease 0"}],"stepsB":[]}

    ix.run(trigger, $el);
  });

  let quote_builder = document.getElementById("quote_builder");
  if (quote_builder) {
    ReactDOM.render(
      <QuoteBuilder/>,
      quote_builder
    );
  }
});
