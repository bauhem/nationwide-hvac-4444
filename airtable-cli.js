const Airtable = require('airtable');
const jsonfile = require('jsonfile');

const path = require('path')
const process = require('process')
const {spawnSync} = require('child_process')

const {AIRTABLE_API_KEY, AIRTABLE_API_BASE, GITHUB_TOKEN, GITHUB_USERNAME, GITHUB_EMAIL} = process.env
// leaving this without https:// in order to reuse it when adding the remote
const gitRepositoryURL = 'github.com/bauhem/nationwide-hvac-4444.git'
const repositoryName = 'nationwide-hvac-4444'

const productsFile = 'data/products.json';
const vendorsFile = 'data/vendors.json';
const accessoriesFile = 'data/accessories.json';
const zonesFile = 'data/zip_codes.json';


function sync(column_name, output_file, sort_fields = []) {
  let dataJson = [];

  const base = new Airtable({
    apiKey: AIRTABLE_API_KEY //'keyHpcZOz0geS06xM' // TODO - CHANGE THIS
  }).base(AIRTABLE_API_BASE); //'apppfZRVZdFKMDYpt'

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

function runCommand(commandString, options) {
  const [command, ...args] = commandString.match(/(".*?")|(\S+)/g)
  const cmd = spawnSync(command, args, options)

  // you should probably obfuscate the credentials before logging
  const errorString = cmd.stderr.toString()
  if (errorString) {
    throw new Error(
      `Git command failed
      ${commandString}
      ${errorString}`
    )
  }
}

// Git handling inspired by: https://gist.github.com/Loopiezlol/e00c35b0166b4eae891ec6b8d610f83c

exports.handler = async function (event, context, callback) {
  await require('lambda-git')()
  process.chdir('/tmp')
  runCommand(`git clone --quiet https://${gitRepositoryURL}`)
  process.chdir(path.join(process.cwd(), repositoryName))

  sync('Match-Ups', productsFile, [{field: "AHRI", direction: "asc"}]);

  sync('Vendors', vendorsFile, [{field: "Name", direction: "asc"}]);

  sync('Accessories', accessoriesFile, [{field: "Model", direction: "asc"}]);

  sync('Zones', zonesFile, [{field: "Zip", direction: "asc"}]);

  // TODO - Find a way to wait until all syncs are completed

  //   runCommand(`git config --local user.email ${GITHUB_EMAIL}`)
  //   runCommand(`git config --local user.name ${GITHUB_USERNAME}`)
  //   runCommand('git add .')
  //   // commit changes
  //   runCommand('git commit -m "commit by :robot:"')
  //   // replace the remote with an authenticated one
  //   runCommand('git remote rm origin')
  //   runCommand(
  //     `git remote add origin https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@${gitRepositoryURL}`
  //   )
  //   // push changes to remote
  //   runCommand('git push --porcelain --set-upstream origin master')
  //   // terminate the lambda
  //   callback(null, 'bye')

}
