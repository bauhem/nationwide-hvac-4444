require('dotenv').config()

const api = require("./airtable-api");
const Airtable = require('airtable');

const productsFile = 'data/products.json';
const vendorsFile = 'data/vendors.json';
const accessoriesFile = 'data/accessories.json';
const zonesFile = 'data/zip_codes.json';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_API_BASE);

api.syncAll(base);