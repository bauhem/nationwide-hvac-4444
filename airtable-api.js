const jsonFile = require('jsonfile');
const path = require('path')

const dataFiles = {
  products:  'data/products.json',
  vendors: 'data/vendors.json',
  accessories: 'data/accessories.json',
  zones: 'data/zip_codes.json'
}

exports.dataFiles = dataFiles;
  
var select = function (base, column_name, output_file, sort_fields = []) {
  let dataJson = [];

  return base(column_name).select({
    //sort
    sort: sort_fields
  }).all();
}

var saveRecords = function (records, output_file) {
  let dataJson = [];
  records.forEach(function (record) {
    let data = record._rawJson.fields;
    data['id'] = record.getId();
    dataJson.push(data);
  });
  jsonFile.writeFileSync(output_file, dataJson, { flag: 'w' });
  console.log('Saving records completed!')
}

exports.syncAll = async function (base, output_dir='.') {
  const productsFile = path.join(output_dir, dataFiles.products);
  const vendorsFile = path.join(output_dir, dataFiles.vendors);
  const accessoriesFile = path.join(output_dir, dataFiles.accessories);
  const zonesFile = path.join(output_dir, dataFiles.zones);

  console.log('Syncing Match-Ups');
  await select(base, 'Match-Ups', productsFile, [{field: "AHRI", direction: "asc"}])
    .then((records) => {
      saveRecords(records, productsFile)
    });

  console.log('Syncing Vendors');
  await select(base, 'Vendors', vendorsFile, [{field: "Name", direction: "asc"}])
    .then((records) => {
      saveRecords(records, vendorsFile)
    });

  console.log('Syncing Accessories');
  await select(base, 'Accessories', accessoriesFile, [{field: "Model", direction: "asc"}])
    .then((records) => {
      saveRecords(records, accessoriesFile)
    });

  console.log('Syncing Zones');
  await select(base, 'Zones', zonesFile, [{field: "Zip", direction: "asc"}])
    .then((records) => {
      saveRecords(records, zonesFile)
    });

}

