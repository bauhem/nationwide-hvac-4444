const FILTERS_STORAGE_KEY = 'mixitup_filters';
const FILTER_REGEX = /(\.{1}[a-zA-Z0-9\-]+)/g;
var mixer;

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

function saveFilters(filters = {}) {
  sessionStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters))
}

function loadFilters() {
  return JSON.parse(sessionStorage.getItem(FILTERS_STORAGE_KEY));
}

function getFilterGroups() {
  let filter_groups = {};

  jQuery('.div-search-dropdown .dropdown').each(function() {
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
      filter_groups[groups_by_index[i]][filter_matches[i]] = true;
    }
  });

  return filter_groups;
}

jQuery(document).ready(function ($) {
  var containerEl = document.querySelector('.container');

  if (containerEl) {
    let filters = loadFilters();

    mixer = mixitup(containerEl, {
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
          scrollToContainer('.breadcrumbs');
        }
      }
    });

    if (filters !== undefined && filters !== null && filters !== '' && filters !== '.mix') {
      let filtersGroup = getFiltersByGroup(filters);

      for (let key in filtersGroup) {
        let selectors = Object.keys(filtersGroup[key]);
        mixer.setFilterGroupSelectors(key, selectors);
        selectors.forEach((selector) => {
          let el = jQuery(`*[data-toggle="${selector}"]`)[0];
          if (el === undefined) {
            return;
          }
          toggleCB(el);
        });
      }

      mixer.parseFilterGroups();
    }
  }
});

