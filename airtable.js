var Airtable = require('airtable');
var jsonfile = require('jsonfile');

var productsFile = 'data/products.json';
var vendorsFile = 'data/vendors.json';
var accessoriesFile = 'data/accessories.json';
var productJson = [];
var vendorJson = [];
var accessoryJson = [];

var base = new Airtable({
  apiKey: 'keyHpcZOz0geS06xM' // TODO - CHANGE THIS
}).base('appOeXpigm1IdFQzv');

base('Products').select({
  //sort
  sort: [{
    field: "AHRI",
    direction: "desc"
  }]
}).eachPage(function page(records, fetchNextPage) {
  // This function (`page`) will get called for each page of records.
  records.forEach(function (record) {
    productJson.push(record._rawJson.fields);
  });
  fetchNextPage();
}, function done(error) {
  if (error) {
    console.log(error);
  }
  jsonfile.writeFile(productsFile, productJson, 'utf8', function (err) {
    console.error(err)
  });
  console.log('Match-ups loaded!');
});

base('Vendors').select()
  .eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    records.forEach(function (record) {
      vendorJson.push(record._rawJson.fields);
    });
    fetchNextPage();
  }, function done(error) {
    if (error) {
      console.log(error);
    }
    jsonfile.writeFile(vendorsFile, vendorJson, 'utf8', function (err) {
      console.error(err)
    });
    console.log('Vendors loaded!');
  });
