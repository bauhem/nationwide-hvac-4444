require('dotenv').config()

const api = require("./airtable-api");
const Airtable = require('airtable');

const productsFile = 'data/products.json';
const vendorsFile = 'data/vendors.json';
const accessoriesFile = 'data/accessories.json';
const zonesFile = 'data/zip_codes.json';

process.on(
    "unhandledRejection",
    function handleWarning( reason, promise ) {

        console.log( "[PROCESS] Unhandled Promise Rejection" );
        console.log( "- - - - - - - - - - - - - - - - - - -" );
        console.log( reason );
        console.log( promise );
        console.log( "- -" );

    }
);

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_API_BASE);

let args = process.argv.slice(2);

console.time('sync');
let promise;
if (typeof api[args[0]] === 'function') {
  promise = api[args[0]](base, '.');
} else {
  promise = api.syncAll(base, '.');
}

promise.then(() => {
  console.timeEnd('sync');
})
