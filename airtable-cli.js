require('dotenv').config()

const api = require("./airtable-api");
const apiGH = require("./airtable-github");

const Airtable = require('airtable');
const process = require('process')
const path = require('path')

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

console.time('cli-sync')
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_API_BASE);

let args = process.argv.slice(2);

let promise;

let baseDir = '/tmp';

let outputDir = api.createOutputDir(baseDir, apiGH.repositoryName);

let files = [];
if (typeof api[args[0]] === 'function') {
  promise = api[args[0]](base, outputDir);
  files.push(path.join(outputDir, api.dataFiles[args[0]]));
} else {
  promise = api.syncAll(base, outputDir);
  for (let property in api.dataFiles) {
      if (api.dataFiles.hasOwnProperty(property)) {
          files.push(path.join(outputDir, api.dataFiles[property]))
      }
  }
}

promise.then(() => {
  let fileSyncPromises = apiGH.updateAllFiles(outputDir, files);
  fileSyncPromises.then(() => {
    console.log('sync complete')
    console.timeEnd('cli-sync')
  })
})
