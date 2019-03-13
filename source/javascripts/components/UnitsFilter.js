export function unitsFilter(ctx) {
  const state = ctx; // DO NOT MODIFY ctx DIRECTLY
  let units = require('../../../data/products.json');

  let filtered_units = [];
  filtered_units = units.filter(filterOutBySystemType.bind(this, state.system_type))
    .filter(filterOutByTons.bind(this, state.tonnage))
    .filter(filterOutClosetWaterUnderAirHandler.bind(this, state.air_handler_location, state.water_heater_under_air_handler))
    .filter(filterOutSingleStageFrontReturn.bind(this, state.air_handler_location))
    .filter(filterOutByBrand.bind(this, state.selected_brands));
  return filtered_units;
}

export function brandsFilter() {
  let units = require('../../../data/products.json');
  units = units.filter(function (unit) {
    return unit['Brand'] !== undefined && unit['Brand'] !== null
  });
  return [...new Set(units.map(unit => unit['Brand']))];
}

function filterOutBySystemType(type, unit) {
  let unitType = unit['System Type'];

  if (unitType === undefined || unitType === null) {
    return false;
  }

  return type.trim() === unit['System Type'].trim();
}

function filterOutByTons(tons, unit) {
  let unitTons = unit['Tons'];

  if (unitTons === undefined || unitTons === null) {
    return false;
  }

  return tons === unitTons;
}

function filterOutClosetWaterUnderAirHandler(ah_loc, wh_under_ah, unit) {
  if (ah_loc !== 'closet' || wh_under_ah === false) {
    return true;
  }

  // TODO - This is a hack for now until we find out if the " is desired or not
  return unit['AHU H'] <= 40 || unit['AHU H"'] <= 40;
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