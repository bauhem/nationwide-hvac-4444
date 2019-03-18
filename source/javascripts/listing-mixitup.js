import {initializeMixitup} from "../javascripts/mixitup-helpers";

jQuery(document).ready(function ($) {
  var containerEl = document.querySelector('.container');
  var mixer;

  if (containerEl) {

    mixer = initializeMixitup(containerEl);
  }
});
