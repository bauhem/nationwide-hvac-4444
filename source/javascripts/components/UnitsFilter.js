
export function unitsFilter(ctx) {
  const state = ctx; // DO NOT MODIFY ctx DIRECTLY
  let units = ctx.units;

  if (units === null) {
    units = require('../../../data/products.json');
  }

  let filtered_units = [] ;
  filtered_units = units.filter(filterOutBySystemType.bind(this, state.system_type))
    .filter(filterOutByTons.bind(this, state.tonnage))
    .filter(filterOut39InchesOrHigher.bind(this, state.air_handler_location))
    .filter(filterOutSingleStageFrontReturn.bind(this, state.air_handler_location))
    .filter(filterOutByBrand.bind(this, state.selected_brands));
  return filtered_units;
}

export function brandsFilter(units, ctx) {
  return [...new Set(units.map(unit => unit['Brand']))];
}

function filterOutBySystemType(type, unit) {
  return type === unit['System Type'];
}

function filterOutByTons(tons, unit) {
  return tons === unit['Tons'];
}

function filterOut39InchesOrHigher(ah_loc, unit) {
  if (ah_loc !== 'closet') {
    return true;
  }
  
  return unit['AHU H'] <= 39;
}

function filterOutSingleStageFrontReturn(ah_loc, unit) {
  if (ah_loc == 'closet') {
    return true;
  }

  return unit['System Categorization'] !== 'Single Stage/Front Return';
}

function filterOutByBrand(selected_brands, unit) {
  if (selected_brands === null || selected_brands.length === 0) {
    return true;
  }

  return selected_brands.includes(unit['Brand']);
}