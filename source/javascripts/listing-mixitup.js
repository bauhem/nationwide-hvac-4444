import {initializeMixitup} from "../javascripts/mixitup-helpers";

jQuery(document).ready(function ($) {
  var containerEl = document.querySelector('.container');
  var mixer;

  if (containerEl) {

    mixer = initializeMixitup(containerEl);
  }

  $('.radio-link').click(function (e) {
    e.stopPropagation();
    // Set all images checkbox-grey visible
    $(this).parent().find('.w-radio-input').attr('checked', false);
    $(this).parent().find('.checkbox-button-grey').css('z-index', 1);
    $(this).parent().find('.checkbox-button').css('z-index', 0);

    let label = $(this).find('.checkbox-label').text();

    // Set selected link image to checkbox
    $(this).find('.w-radio-input').attr('checked', true);
    $(this).find('.checkbox-button').css('z-index', 1);
    $(this).find('.checkbox-button-grey').css('z-index', 0);

    $('.results-list').html("<div class='w-inline-block'>Loading "+label+" units...</div>");
    window.location.href = $(this).attr('data-link');
  });
});
