function validateZip(e) {
  let install_options = $(this).data('item-custom1-options').split('|');
  let zip = prompt("Please enter your zip code", "");
  if (zip != null) {
    let zone = installZoneFromZip(parseInt(zip));

    if (zone === null) {
      window.alert('Your zip code is not on our usual territory. Give us a call at 877-910-HVAC to chat with our live agents');
      e.preventDefault();
      return false;
    } else {
      $(this).data('item-custom1-options', install_options[zone - 1]);
    }
  }
}

function installZoneFromZip(zip_code) {
  let idx = zipData.findIndex(obj => obj['Zip'] === parseInt(zip_code));

  if (idx === -1) return null;

  return zipData[idx]['Zone'];
}

function loadZipData() {
  $.get({
    url: '/javascripts/data/zip_codes.json'
  })
    .done(function (data) {
      zipData = data
    });
}