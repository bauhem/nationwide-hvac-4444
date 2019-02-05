// This method is used to get the z-index of the filters checkboxes.
function getStyleProp(el, styleProp) {
  let y;
  if (window.getComputedStyle) {
    y = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) {
    y = el.currentStyle[styleProp];
  }

  return y;
}

function scrollToContainer(containerSelector = '.breadcrumbs') {
  jQuery('html, body').animate({
    scrollTop: jQuery(containerSelector).offset().top
  }, 300);
}

function handleMixClick(state, futureState) {
  if (this.classList.contains('filter_button')) {
    toggleCB(this);
  }
}

function toggleCB(el) {
  let greyCB = el.children[0].children[0];
  let activeCB = el.children[0].children[1];

  const tmpGreyVal = getStyleProp(greyCB, "z-index");
  const tmpActiveVal = getStyleProp(activeCB, "z-index");

  greyCB.style.zIndex = (tmpGreyVal === '1') ? '0' : '1';
  activeCB.style.zIndex = (tmpActiveVal === '1') ? '0' : '1';
}

function disableCB(el) {
  let greyCB = el.children[0].children[0];
  let activeCB = el.children[0].children[1];

  greyCB.style.zIndex = 1;
  activeCB.style.zIndex = 'auto';
}

function disableAllFilters(el) {
  let parent = el.parentNode;
  let filters = Array.from(parent.children);

  filters.forEach((filter) => {
    if (filter !== el) {
      Quote.disableCB(filter);
    }
  });
}

function itemAddedPopup(item) {
  var ix = Webflow.require('ix');
  var $el = jQuery('.div-added-to-cart');

  var trigger = {
    "type": "click",
    "selector": ".div-added-to-cart",
    "stepsA": [{"wait": "300ms"}, {
      "display": "flex",
      "opacity": 1,
      "height": "300px",
      "transition": "opacity 750ms ease 0, height 750ms ease 0"
    }, {"wait": "2000ms"}, {
      "opacity": 0,
      "height": "0px",
      "transition": "opacity 750ms ease 0, height 750ms ease 0"
    }],
    "stepsB": []
  }

  ix.run(trigger, $el);
}

function validateZipCode(ev, data) {
  if (ev.type == 'billing-address') {
    let zone = getZone(data.postalCode);
    
    if (zone !== this.state.zone_num) {
      ev.preventDefault();
      ev.addError('postalCode', 'Your zip code does not match what you provided before. Please use the same zip code or go back to change it in the quote builder.');
    }
  }
}

function getZone(zip_code) {
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
