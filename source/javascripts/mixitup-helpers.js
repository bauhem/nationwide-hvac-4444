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
