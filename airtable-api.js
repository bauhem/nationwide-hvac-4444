const jsonFile = require('jsonfile');
const path = require('path')

var sync = function (base, column_name, output_file, sort_fields = []) {
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
  jsonFile.writeFile(output_file, dataJson, 'utf8', function (err) {
    console.error(err)
  });
  console.log('Saving records completed!')
}

exports.syncAll = async function (base, output_dir='.') {
  const productsFile = path.join(output_dir, 'data/products.json');
  const vendorsFile = path.join(output_dir, 'data/vendors.json');
  const accessoriesFile = path.join(output_dir, 'data/accessories.json');
  const zonesFile = path.join(output_dir, 'data/zip_codes.json');

  console.log('Syncing Match-Ups');
  await sync(base, 'Match-Ups', productsFile, [{field: "AHRI", direction: "asc"}])
    .then((records) => {
      saveRecords(records, productsFile)
    });

  console.log('Syncing Vendors');
  await sync(base, 'Vendors', vendorsFile, [{field: "Name", direction: "asc"}])
    .then((records) => {
      saveRecords(records, vendorsFile)
    });

  console.log('Syncing Accessories');
  await sync(base, 'Accessories', accessoriesFile, [{field: "Model", direction: "asc"}])
    .then((records) => {
      saveRecords(records, accessoriesFile)
    });

  console.log('Syncing Zones');
  await sync(base, 'Zones', zonesFile, [{field: "Zip", direction: "asc"}])
    .then((records) => {
      saveRecords(records, zonesFile)
    });
}

