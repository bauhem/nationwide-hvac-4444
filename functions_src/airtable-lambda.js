require("@babel/polyfill");

const github = require('@octokit/rest')();
const api = require("../airtable-api");

const Airtable = require('airtable');

const fs = require('fs')
const path = require('path')
const process = require('process')

const {NODE_ENV, AIRTABLE_API_KEY, AIRTABLE_API_BASE, GITHUB_TOKEN, GIT_BRANCH, GIT_REPO} = process.env
// leaving this without https:// in order to reuse it when adding the remote
const repositoryName = GIT_REPO || 'nationwide-hvac-4444'
const gitBranch = GIT_BRANCH || 'master'
const owner = 'bauhem';

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

function getBranchRefs() {
  return github.git.getRef({
    owner: owner,
    repo: repositoryName,
    ref: `heads/${gitBranch}`
  });
}

function getBranchTree(sha) {
  return github.git.getTree({
    owner: owner,
    repo: repositoryName,
    tree_sha: sha,
    recursive: 1
  });
}

function decodeFileContent(content) {
  return Buffer.from(content, 'base64');
}

async function updateGitFile(file) {
  console.log(`Updating file ${file.filename}`);
  let file_path = path.join(process.cwd(), file.filename);
  let fileContent = fs.readFileSync(file_path, 'utf8');
  let fileContentBase64 = Buffer.from(fileContent).toString('base64');

  try {
    let result = await github.git.getBlob({
      owner: owner,
      repo: repositoryName,
      file_sha: file.sha
    })

    if (result !== null && result.status === 200) {
      let remoteContent = decodeFileContent(result.data.content);

      if (!Buffer.from(fileContent, 'utf8').equals(remoteContent)) {
        return github.repos.updateFile({
          owner: owner,
          repo: repositoryName,
          branch: gitBranch,
          path: file.filename,
          message: "Update Airtable content for file " + file.filename,
          content: fileContentBase64,
          sha: result.data.sha
        });
      }
    }
  } catch(e) {
    console.log(e);
  }
}

async function loadBranchTree() {
  try {
    let branch = await getBranchRefs();
    let tree = await getBranchTree(branch.data.object.sha)
    return tree.data.tree;
  } catch(e) {
    throw(e);
  }
}

exports.handler = async function (event, context, callback) {
  if (NODE_ENV === 'production') {
    const claims = context.clientContext && context.clientContext.user;
    if (!claims) {
      return callback(null, {
        statusCode: 401,
        body: "You must be signed in to call this function"
      });
    }
  }

  let syncMethod = 'all';

  if (event.queryStringParameters.sync !== undefined) {
    syncMethod = event.queryStringParameters.sync;
  }

  github.authenticate({
    type: 'token',
    token: GITHUB_TOKEN
  });

  let orig_dir = process.cwd();
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

  const base = new Airtable({
    apiKey: AIRTABLE_API_KEY
  }).base(AIRTABLE_API_BASE);

  // Use git branch sha and tree to find each files sha. Since some files
  // might be greater than 1 MB in size, we can not use the getContents method
  // to retrieve the content and the sha in 1 operation
  let gitFiles = [];
  let dataFiles = [];
  let branchTree = [];

  try {
    branchTree = await loadBranchTree();
  } catch(e) {
    catchError(e, callback);
  }

  let syncPromise = api[syncMethod](base, output_dir);

  switch (syncMethod) {
    case 'products':
      dataFiles[0] = api.dataFiles.products;
      break;
    case 'vendors':
      dataFiles[0] = api.dataFiles.vendors;
      break;
    case 'accessories':
      dataFiles[0] = api.dataFiles.accessories;
      break;
    case 'zones':
      dataFiles[0] = api.dataFiles.zones;
      break;
    default:
      dataFiles = Object.values(api.dataFiles);
      break;
  }

  await syncPromise.then(() => {

    branchTree.forEach((file) => {
      if (dataFiles.indexOf(file.path) > -1) {
        gitFiles.push({filename: file.path, sha: file.sha});
      }
    });

    let fileSyncPromises = [];

    gitFiles.forEach((file) => {
      fileSyncPromises.push(updateGitFile(file));
    })

    Promise.all(fileSyncPromises)
      .catch(e => catchError(e, callback));
  }).catch(e => catchError(e, callback));

  process.chdir(orig_dir);

  // terminate the lambda
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({msg: `${syncMethod} sync completed!`})
  });

};
