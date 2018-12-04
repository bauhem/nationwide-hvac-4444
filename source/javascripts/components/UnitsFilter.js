const units = require('../../../data/products.json');

export function unitsFilter(ctx) {
  const state = ctx; // DO NOT MODIFY ctx DIRECTLY
  let filtered_units = units
    .filter(filterOutBySystemType.bind(this, ctx.system_type))
    .filter(filterOutByTons.bind(this, ctx.tonnage))
    .filter(filterOut39InchesOrHigher.bind(this))
    .filter(filterOutSingleStageFrontReturn.bind(this));
  let brands = [...new Set(filtered_units.map(unit => unit['Brand']))];

  return [filtered_units, brands];
}

function filterOutBySystemType(type, unit) {
  return type === unit['System Type'];
}

function filterOutByTons(tons, unit) {
  return tons === unit['Tons'];
}

function filterOut39InchesOrHigher(unit) {
  return unit['AHU H'] <= '39';
}

function filterOutSingleStageFrontReturn(unit) {
  return unit['System Categorization'] !== 'Single Stage/Front Return';
}