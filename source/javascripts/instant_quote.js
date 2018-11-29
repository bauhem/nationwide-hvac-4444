import React from 'react';
import ReactDOM from 'react-dom';
import QuoteBuilder from "./components/QuoteBuilder.jsx";

function onReady(completed) {
  if (document.readyState === "complete") {
    setTimeout(completed);
  } else {
    document.addEventListener("DOMContentLoaded", completed, false);
  }
}

onReady(function () {
  let quote_builder = document.getElementById("quote_builder");
  if (quote_builder) {
    ReactDOM.render(
      <QuoteBuilder/>,
      quote_builder
    );
  }
});
