import mixitup from 'mixitup';
import mixitupMultifilter from "./lib/mixitup-multifilter";
import mixitupPagination from "./lib/mixitup-pagination";

const FILTERS_STORAGE_KEY = 'mixitup_filters';
const FILTER_REGEX = /(\.{1}[a-zA-Z0-9\-]+)/g;

mixitup.use(mixitupMultifilter);
mixitup.use(mixitupPagination);

export function handleMixClick(state, futureState) {
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

function getStyleProp(el, styleProp) {
  var y;

  if (window.getComputedStyle) {
    y = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) {
    y = el.currentStyle[styleProp];
  }

  return y;
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

export function saveFilters(filters = {}) {
  sessionStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters))
}

export function loadFilters() {
  return JSON.parse(sessionStorage.getItem(FILTERS_STORAGE_KEY));
}

function getFilterGroups() {
  let filter_groups = {};

  jQuery('.div-search-dropdown .dropdown').each(function () {
    filter_groups[jQuery(this).attr('data-filter-group')] = {};
  });

  return filter_groups;
}

function findFilterGroup(filter) {
  let el = jQuery(`*[data-toggle="${filter}"]`);
  return el.closest('.dropdown').attr('data-filter-group');
}

function getFiltersByGroup(filters) {
  let filter_groups = getFilterGroups();
  let groups_by_index = [];

  filters.split(',').forEach((filter_group) => {
    let filter_matches = filter_group.match(FILTER_REGEX);

    // Find which group is at each index of the matches since we always have the
    // same order of groups in a filter string
    if (groups_by_index.length === 0) {
      filter_matches.forEach((filter) => {
        let group = findFilterGroup(filter);
        groups_by_index.push(group);
      })
    }

    // Push each match to the proper filter group array using the
    // groups_by_index array
    for (let i in filter_matches) {
      if (filter_groups[groups_by_index[i]] === undefined) {
        // If a filter changes name when the session is still active, group
        // won't be valid
        continue;
      }
      filter_groups[groups_by_index[i]][filter_matches[i]] = true;
    }
  });

  return filter_groups;
}

function scrollToContainer(containerSelector = '.breadcrumbs') {
  jQuery('html, body').animate({
    scrollTop: jQuery(containerSelector).offset().top
  }, 300);
}

export function initializeMixitup(container, cfg) {
  let mixer = mixitup(container, {
    pagination: {
      limit: 12
    },
    multifilter: {
      enable: true
    },
    animation: {
      enable: false
    },
    callbacks: {
      onMixClick: handleMixClick,
      onMixEnd: (state) => {
        saveFilters(state.activeFilter.selector);
        scrollToContainer('.section-hero-interior');
      },
      onMixFail: (state) => {
        console.log('Mix failed: ');
        console.table(state)
      }
    }
  });

  let filters = loadFilters();

  if (filters !== undefined && filters !== null && filters !== '' && filters !== '.mix') {
    let filtersGroup = getFiltersByGroup(filters);

    for (let key in filtersGroup) {
      let selectors = Object.keys(filtersGroup[key]);
      selectors.forEach((selector) => {
        let el = jQuery(`*[data-toggle="${selector}"]`)[0];
        if (el === undefined) {
          return;
        }
        toggleCB(el);
      });
      mixer.setFilterGroupSelectors(key, selectors);
    }

    mixer.parseFilterGroups();
  }

  return mixer;
}
