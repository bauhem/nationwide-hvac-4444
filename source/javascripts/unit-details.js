function validateZip(e) {
  let zip = prompt("Your zip code is required to get the price with installation", "");

  if (zip !== null) {
    let zone = installZoneFromZip(parseInt(zip));

    if (zone === null) {
      window.alert('Your zip code is not on our usual territory. Give us a call at 877-910-HVAC to chat with our live agents');
      return false;
    } else {
      sessionStorage.setItem('zone', zone);
      updateForZone(zone);
    }
  }
}

function updateForZone(zone) {
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
  jQuery('div.pricing').html(`$${price}`);
  cart_btn.removeClass('w-hidden-main w-hidden-medium w-hidden-small w-hidden-tiny');
}

function installZoneFromZip(zip_code) {
  let idx = zipData.findIndex(function(obj) {
    return obj['Zip'] === parseInt(zip_code)
  });
  
  if (idx === -1) return null;

  return zipData[idx]['Zone'];
}

function loadZipData() {
  jQuery.get({
    url: '/javascripts/data/zip_codes.json'
  })
    .done(function (data) {
      zipData = data
    });
}

var zipData = [];

loadZipData();

let zone = sessionStorage.getItem('zone');

if (zone !== "undefined" && zone !== null) {
  updateForZone(zone);
}

jQuery(document).ready(function ($) {

  $('a#get-installed-price').click(validateZip);

  Snipcart.subscribe('item.added', itemAddedPopup);
});