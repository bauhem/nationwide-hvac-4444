require("@babel/polyfill");

const github = require('@octokit/rest')();
const api = require("../airtable-api");
const util = require('util');

const Airtable = require('airtable');

const fs = require('fs')
const path = require('path')
const process = require('process')
const {spawnSync} = require('child_process')

const {AIRTABLE_API_KEY, AIRTABLE_API_BASE, GITHUB_TOKEN, GITHUB_USERNAME, GITHUB_EMAIL, GIT_BRANCH, GIT_REPO} = process.env
// leaving this without https:// in order to reuse it when adding the remote
const gitRepositoryURL = 'github.com/bauhem/nationwide-hvac-4444.git'
const repositoryName = GIT_REPO || 'nationwide-hvac-4444'
const gitBranch = GIT_BRANCH || 'master'
const owner = 'bauhem';

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

async function updateGitFile(filename) {
  console.log(`Updating file ${filename}`);
  let file_path = path.join(process.cwd(), filename);
  let fileContent = Buffer.from(fs.readFileSync(file_path, 'utf8')).toString('base64');

  try {
    github.repos.getContents({
      owner: owner,
      repo: repositoryName,
      ref: gitBranch,
      path: filename,
    }).then(result => {
      console.log(`getContents returned with status ${result.status}`);
      if (result.status !== 200) {
        throw new Error("unable to get file content: " + JSON.stringify(result));
      }

      if (result.data.content !== fileContent) {
        console.log(`getContents sha: ${result.data.sha}`);
        github.repos.updateFile({
          owner: owner,
          repo: repositoryName,
          branch: gitBranch,
          path: filename,
          message: "Update Airtable content for file " + filename,
          content: fileContent,
          sha: result.data.sha
        }).then(result => {
          if (result.status !== 200) {
            throw new Error("updating file: " + JSON.stringify(result));
          }
        });
      }
    });
  } catch(e) {
    console.log(e);
  }
}

exports.handler = async function (event, context, callback) {
  let orig_dir = process.cwd();

  const base = new Airtable({
    apiKey: AIRTABLE_API_KEY
  }).base(AIRTABLE_API_BASE);

  github.authenticate({
    type: 'token',
    token: GITHUB_TOKEN
  });

  process.chdir('/tmp');

  let output_dir = path.join(process.cwd(), repositoryName);

  if (!fs.existsSync(output_dir)) {
    fs.mkdirSync(output_dir, 0o0774);
  }

  let data_dir = path.join(output_dir, 'data');

  if (!fs.existsSync(data_dir)) {
    fs.mkdirSync(data_dir, 0o0774);
  }

  process.chdir(output_dir);

  //await api.syncAll(base, output_dir);

  for (let [key, filename] of Object.entries(api.dataFiles)) {
    try {
      await
        updateGitFile(filename);
    } catch (e) {
      callback(null, {
        statusCode: 500,
        body: "An error occured: " + e
      })
    }
  }

  process.chdir(orig_dir);

  // terminate the lambda
  callback(null, {
    statusCode: 200,
    body: "All synched!"
  })
}
