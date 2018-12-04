const units = require('../../../data/products.json');

export function unitsFilter(ctx) {
  const state = ctx; // DO NOT MODIFY ctx DIRECTLY
  let filtered_units = [] ;
  filtered_units = units.filter(filterOutBySystemType.bind(this, state.system_type))
    .filter(filterOutByTons.bind(this, state.tonnage))
    .filter(filterOut39InchesOrHigher.bind(this, state.air_handler_location))
    .filter(filterOutSingleStageFrontReturn.bind(this, state.air_handler_location));
  let brands = [...new Set(filtered_units.map(unit => unit['Brand']))];

  return [filtered_units, brands];
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