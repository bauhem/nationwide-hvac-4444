import {initializeMixitup} from "../javascripts/mixitup-helpers";

jQuery(document).ready(function ($) {
  var containerEl = document.querySelector('.container');
  var mixer;

  if (containerEl) {

    mixer = initializeMixitup(containerEl);
  }

  $('.radio-link').click(function (e) {
    e.stopPropagation();
    $(document).find('.w-radio-input').attr('checked', false);
    let label = $(this).find('.checkbox-label').text();
    $(this).find('.w-radio-input').attr('checked', true);
    $('.results-list').html("<div class='w-inline-block'>Loading "+label+" units...</div>");
    window.location.href = $(this).attr('data-link');
  });
});
