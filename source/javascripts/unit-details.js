function showPriceSubmit(e) {
  e.preventDefault();
  let form = jQuery(this);
  let zip = form.find('input#zipcode')[0];

  if (validateZip(parseInt(zip.value))) {
    hideLeadForm();
    // TODO - Send form data to Netlify
    jQuery.post(form.attr("action"), form.serialize()).then(function() {
      console.log('Netlify: lead saved!')
    });
  }
}

function validateZip(zip) {
  if (zip !== null) {
    let zone = getZone(zip);

    if (zone === null) {
      window.alert('Your zip code is not on our usual territory. Give us a call at 877-910-HVAC to chat with our live agents');
      return false;
    } else {
      sessionStorage.setItem('zone', zone);
      showInstalledPrice(zone);
      return true;
    }
  }
}

function showInstalledPrice(zone) {
  if (zone === null || zone === 'undefined' || zone < 1) {
    return;
  }

  let cart_btn = jQuery('a.snipcart-add-item');
  let get_price_btn = jQuery('a#get-installed-price');
  let installation_options = cart_btn.data('item-custom1-options').split('|');

  get_price_btn.addClass('w-hidden-main w-hidden-medium w-hidden-small w-hidden-tiny');
  let installation_price = installation_options[zone - 1];
  let price = jQuery(`input#price-zone-${zone}`).val();
  cart_btn.data('item-custom1-options', installation_price);
  jQuery('.pricing').html(`$${price}`);
  cart_btn.removeClass('w-hidden-main w-hidden-medium w-hidden-small w-hidden-tiny');
}

function showLeadForm() {
  jQuery('div#price-display-form').show();
}

function hideLeadForm() {
  jQuery('div#price-display-form').hide();
}

let zone = sessionStorage.getItem('zone');

if (zone !== "undefined" && zone !== null) {
  showInstalledPrice(zone);
}

jQuery(document).ready(function ($) {

  $('a#get-installed-price').click(showLeadForm);

  $('form#wf-form-price-form').submit(showPriceSubmit);

  Snipcart.subscribe('item.added', itemAddedPopup);
});