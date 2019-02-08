require("@babel/polyfill");

const api = require("../airtable-api");
const apiGH = require("../airtable-github");

const Airtable = require('airtable');

const path = require('path')
const process = require('process')

const {NODE_ENV, AIRTABLE_API_KEY, AIRTABLE_API_BASE} = process.env

function catchError(e, callback) {
  console.log(e);

  // terminate the lambda
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({msg: "An error occured: " + e})
  })

}

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

exports.handler = async function (event, context, callback) {
  console.time('global-sync');
  if (NODE_ENV === 'production') {
    const claims = context.clientContext && context.clientContext.user;
    if (!claims) {
      callback(null, {
        statusCode: 401,
        body: JSON.stringify({msg: "You must be signed in to call this function"})
      });

      return;
    }
  }

  try {

    let syncMethod = '';

    if (event.queryStringParameters.sync !== undefined) {
      syncMethod = event.queryStringParameters.sync;
    }

    let outputDir = api.createOutputDir('/tmp', apiGH.repositoryName);

    const base = new Airtable({
      apiKey: AIRTABLE_API_KEY
    }).base(AIRTABLE_API_BASE);

    // Use git branch sha and tree to find each files sha. Since some files
    // might be greater than 1 MB in size, we can not use the getContents method
    // to retrieve the content and the sha in 1 operation
    let dataFiles = [];
    let syncPromise;

    if (typeof api[syncMethod] === 'function') {
      syncPromise = api[syncMethod](base, outputDir);
      dataFiles.push(path.join(outputDir, api.dataFiles[syncMethod]));
    } else {
      syncPromise = api.syncAll(base, outputDir);
      for (let property in api.dataFiles) {
          if (api.dataFiles.hasOwnProperty(property)) {
            dataFiles.push(path.join(outputDir, api.dataFiles[property]))
          }
      }
    }

    syncPromise.then(() => {
      apiGH.updateAllFiles(outputDir, dataFiles)
        .catch(e => catchError(e, callback));
    }).catch(e => catchError(e, callback));

    // terminate the lambda
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({msg: `${syncMethod} sync completed!`})
    });
    console.timeEnd('global-sync');
  } catch(e) {
    catchError(e, callback)
  }

};
