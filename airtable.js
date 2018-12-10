var Airtable = require('airtable');
var jsonfile = require('jsonfile');

var productsFile = 'data/products.json';
var vendorsFile = 'data/vendors.json';
var accessoriesFile = 'data/accessories.json';
var zonesFile = 'data/zip_codes.json';
var productJson = [];
var vendorJson = [];
var accessoryJson = [];
var zoneJson = [];

var base = new Airtable({
  apiKey: 'keyHpcZOz0geS06xM' // TODO - CHANGE THIS
}).base('apppfZRVZdFKMDYpt');

base('Match-Ups').select({
  //sort
  sort: [{
    field: "AHRI",
    direction: "asc"
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

base('Vendors').select({
  sort: [{
    field: "Name",
    direction: "asc"
  }]
})
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

base('Accessories').select({
  sort: [{
      field: "Model",
      direction: "asc"
    }]
})
  .eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    records.forEach(function (record) {
      let data = record._rawJson.fields;
      data['id'] = record.getId();
      accessoryJson.push(data);
    });
    fetchNextPage();
  }, function done(error) {
    if (error) {
      console.log(error);
    }
    jsonfile.writeFile(accessoriesFile, accessoryJson, 'utf8', function (err) {
      console.error(err)
    });
    console.log('Accessories loaded!');
  });

base('Zones').select()
  .eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    records.forEach(function (record) {
      zoneJson.push(record._rawJson.fields);
    });
    fetchNextPage();
  }, function done(error) {
    if (error) {
      console.log(error);
    }
    
    jsonfile.writeFile(zonesFile, zoneJson, 'utf8', function (err) {
      console.error(err)
    });
    console.log('Zones loaded!');
  });
