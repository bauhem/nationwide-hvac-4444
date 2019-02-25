const jsonFile = require('jsonfile');
const path = require('path')
const process = require('process')
const fs = require('fs')

const dataFiles = {
  products: 'data/products.json',
  vendors: 'data/vendors.json',
  accessories: 'data/accessories.json',
  zones: 'data/zip_codes.json',
  thermostats: 'data/thermostats.json',
  warranty: 'data/warranty.json'
};

exports.dataFiles = dataFiles;

exports.createOutputDir = function(dir, repositoryName) {
  let output_dir = path.join(dir, repositoryName);

  if (!fs.existsSync(output_dir)) {
    fs.mkdirSync(output_dir, 0o0774);
  }

  let data_dir = path.join(output_dir, 'data');

  if (!fs.existsSync(data_dir)) {
    fs.mkdirSync(data_dir, 0o0774);
  }

  return output_dir;
}

var select = function (base, column_name, sort_fields = []) {
  let config = {};

  if (sort_fields.length > 0) {
    config['sort'] = sort_fields
  }

  return base(column_name).select(config).all();
};

var saveRecords = function (records, output_file) {
  let dataJson = [];
  records.forEach(function (record) {
    let data = record._rawJson.fields;
    data['id'] = record.getId();
    dataJson.push(data);
  });
  jsonFile.writeFileSync(output_file, dataJson, {flag: 'w'});
  console.log(`Saved records to ${output_file}`)
};

exports.syncAll = async function (base, output_dir = '.') {
  let promises = [];

  promises.push(syncProducts(base, output_dir));

  promises.push(syncVendors(base, output_dir));

  promises.push(syncAccessories(base, output_dir));

  promises.push(syncZones(base, output_dir));

  promises.push(syncThermostats(base, output_dir));

  promises.push(syncWarranty(base, output_dir));

  return Promise.all(promises);
};

function sync(base, table, output_file, sort_fields) {
  return select(base, table, sort_fields)
    .then((records) => {
      saveRecords(records, output_file)
    })
}

async function syncProducts(base, output_dir) {
  console.log('Syncing Match-Ups');
  const output_file = path.join(output_dir, dataFiles.products);

  return sync(base, 'Match-Ups', output_file)
}

async function syncVendors(base, output_dir) {
  console.log('Syncing Vendors');
  const output_file = path.join(output_dir, dataFiles.vendors);

  return sync(base, 'Vendors', output_file, [{
    field: "Name",
    direction: "asc"
  }])
}

async function syncAccessories(base, output_dir) {
  console.log('Syncing Accessories');
  const output_file = path.join(output_dir, dataFiles.accessories);

  return sync(base, 'Accessories', output_file)

}

async function syncThermostats(base, output_dir) {
  console.log('Syncing Thermostats');
  const output_file = path.join(output_dir, dataFiles.thermostats);

  return sync(base, 'Thermostats', output_file, [{
    field: "Model",
    direction: "asc"
  }])

}

async function syncWarranty(base, output_dir) {
  console.log('Syncing Warranty');
  const output_file = path.join(output_dir, dataFiles.warranty);

  return sync(base, 'Warranty', output_file)

}

async function syncZones(base, output_dir) {
  console.log('Syncing Zones');
  const output_file = path.join(output_dir, dataFiles.zones);

  return sync(base, 'Zones', output_file, [{
    field: "Zip",
    direction: "asc"
  }])
}

exports.products = syncProducts;
exports.vendors = syncVendors;
exports.accessories = syncAccessories;
exports.thermostats = syncThermostats;
exports.warranty = syncWarranty;
exports.zones = syncZones;