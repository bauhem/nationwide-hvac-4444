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

async function getBranchRefs() {
  try {
    let result = await github.git.getRef({
      owner: owner,
      repo: repositoryName,
      ref: `heads/${gitBranch}`
    });

    return result.data.object.sha;

  } catch (e) {
    console.log(e);
  }
}

async function getBranchTree(sha) {
  try {
    let result = await github.git.getTree({
      owner: owner,
      repo: repositoryName,
      tree_sha: sha,
      recursive: 1
    });

    return result.data.tree;
  } catch (e) {
    console.log(e);
  }
}

async function updateGitFile(file) {
  console.log(`Updating file ${file.filename}`);
  let file_path = path.join(process.cwd(), file.filename);
  let fileContent = Buffer.from(fs.readFileSync(file_path, 'utf8')).toString('base64');

  try {
    let blobResult = await github.git.getBlob({
      owner: owner,
      repo: repositoryName,
      sha: file.sha
    });

    console.log(fileContent);
    console.log(blobResult.data.content);
    
    if (blobResult.status === 200 && blobResult.data.content !== fileContent) {
      await github.repos.updateFile({
        owner: owner,
        repo: repositoryName,
        branch: gitBranch,
        path: file.filename,
        message: "Update Airtable content for file " + file.filename,
        content: fileContent,
        sha: file.sha
      });
    }

    console.log(result);
    if (result.status !== 200) {
      throw new Error("updating file: " + JSON.stringify(result));
    }
  } catch (e) {
    //console.log(e);
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

  let branchSHA = await getBranchRefs();
  let branchTree = await getBranchTree(branchSHA);
  let files = [];

  branchTree.forEach((file) => {
    if (Object.values(api.dataFiles).indexOf(file.path) > -1) {
      files.push({filename: file.path, sha: file.sha});
    }
  });

  console.log(files);

  files.forEach((file) => {
    try {
      let result = updateGitFile(file);
    } catch (e) {
      callback(null, {
        statusCode: 500,
        body: "An error occured: " + e
      })
    }
  });

  process.chdir(orig_dir);

  // terminate the lambda
  callback(null, {
    statusCode: 200,
    body: "All synched!"
  })
}
