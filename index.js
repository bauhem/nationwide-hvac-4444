var Airtable = require('airtable');
var jsonfile = require('jsonfile');
var unitsFile = 'data/units.json';
var vendorsFile = 'data/vendors.json';
var accessoriesFile = 'data/accessories.json';
var unitJson = [];
var vendorJson = [];
var accessoryJson = [];

var base = new Airtable({
  apiKey: 'keyHpcZOz0geS06xM' // TODO - CHANGE THIS
}).base('app5Qv9H93yD5u7gE');

base('Match-ups').select({
  //sort
  sort: [{
    field: "AHRI",
    direction: "desc"
  }]
}).eachPage(function page(records, fetchNextPage) {
  // This function (`page`) will get called for each page of records.
  records.forEach(function (record) {
    unitJson.push(record._rawJson.fields);
  });
  fetchNextPage();
}, function done(error) {
  if (error) {
    console.log(error);
  }
  jsonfile.writeFile(unitsFile, unitJson, function (err) {
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
    jsonfile.writeFile(vendorsFile, vendorJson, function (err) {
      console.error(err)
    });
    console.log('Vendors loaded!');
  });

base('Accessories').select()
  .eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    records.forEach(function (record) {
      accessoryJson.push(record._rawJson.fields);
    });
    fetchNextPage();
  }, function done(error) {
    if (error) {
      console.log(error);
    }
    jsonfile.writeFile(accessoriesFile, accessoryJson, function (err) {
      console.error(err)
    });
    console.log('Accessories loaded!');
  });