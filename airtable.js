const Airtable = require('airtable');
const jsonfile = require('jsonfile');

const productsFile = 'data/products.json';
const vendorsFile = 'data/vendors.json';
const accessoriesFile = 'data/accessories.json';
const zonesFile = 'data/zip_codes.json';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY //'keyHpcZOz0geS06xM' // TODO - CHANGE THIS
}).base(process.env.AIRTABLE_API_BASE); //'apppfZRVZdFKMDYpt'

function sync(column_name, output_file, sort_fields = []) {
  let dataJson = [];
  base(column_name).select({
    //sort
    sort: sort_fields
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    records.forEach(function (record) {
      let data = record._rawJson.fields;
      data['id'] = record.getId();
      dataJson.push(data);
    });
    fetchNextPage();
  }, function done(error) {
    if (error) {
      console.log(error);
    }
    jsonfile.writeFile(output_file, dataJson, 'utf8', function (err) {
      console.error(err)
    });
    console.log(column_name + ' completed!');
  });
}

sync('Match-Ups', productsFile, [{field: "AHRI", direction: "asc"}]);

sync('Vendors', vendorsFile, [{field: "Name", direction: "asc"}]);

sync('Accessories', accessoriesFile, [{field: "Model", direction: "asc"}]);

sync('Zones', zonesFile, [{field: "Zip", direction: "asc"}]);
