import config from "react-global-configuration";

const zipData = require('../../../data/zip_codes.json');

function systemTypeName(systemTypes, type) {
  let system_type_info = systemTypes.find((type_info) => {
    return type_info.type === type
  });

  return system_type_info.name;
}

export function unitImage(unit, width = 300, height = 200, crop = 'fit') {
  let attachments = unit["Attachments"];

  if (attachments === null || attachments.length === 0) {
    return config.get('no_image_path');
  }
  let url = attachments[0]['url'];

  if (url === '') {
    return config.get('no_image_path');
  }

  return config.get('cloudinary_resize_url') + `/w_${width},h_${height},c_${crop},f_auto/${url}`;
}

export function brandLogoImage(unit) {
  let brand = toSlug(unit['Brand']);
  return brand_logos.find((logo) => {
    return logo.indexOf(brand) !== -1;
  });
}

export function unitDescription(systemTypes, unit) {
  let st = unit['System Type'];
  return `${systemTypeName(systemTypes, st)} ${unit['Brand Series']} by ${unit['Brand']}`;
}

export function unitID(unit) {
  return unit['AHRI'].toLowerCase().trim();
}

function toSlug(val) {
  return val.toLowerCase().replace(/ /g, "-");
}

export function unitURL(unit) {
  return `${config.get('root_url')}/ac-units/${toSlug(unit['Brand'])}/${toSlug(unit['Brand Series'])}/${unitID(unit)}.html`;
}

export function seerRange(seer) {
  let seer_ranges = config.get('seer_ranges');
  let last_min_seer = seer_ranges.slice(-1)[0].min

  let range = seer_ranges.find((seer_range) => {
    return seer >= seer_range.min && seer < seer_range.max;
  });

  return range.min;
}

export function unitBrochureURL(unit) {
  return unit["Product Brochure url"]
}

export function floatToPrice(price) {
  if (price >= 0) {
    return price.toFixed(2);
  }

  return 'N/A';
}

export function getZone(zip_code) {
  // We take for granted that the zips will be sorted already
  if (/^\d+$/.test(zip_code)) {
    let idx = zipData.findIndex(obj => obj['Zip'] === parseInt(zip_code));

    if (idx === -1) return null;

    return zipData[idx]['Zone'];
  }

  return null;
}