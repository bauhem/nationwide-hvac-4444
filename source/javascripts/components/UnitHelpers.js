import config from "react-global-configuration";

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
  if (seer >= 20) {
    return "20+"
  }

  return config.get('seer_ranges').find((seer_range) => {
    let vals = seer_range.split('-');

    if (vals.length !== 2) {
      return false;
    }

    return seer >= vals[0] && seer < vals[1];
  });
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
