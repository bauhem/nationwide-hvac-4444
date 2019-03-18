const Octokit = require('@octokit/rest');
const fs = require('fs')
const path = require('path')
const process = require('process')

const {GITHUB_TOKEN, GIT_BRANCH, GIT_REPO} = process.env
// leaving this without https:// in order to reuse it when adding the remote
const repositoryName = GIT_REPO || 'nationwide-hvac-4444'
const gitBranch = GIT_BRANCH || 'master'
const owner = 'bauhem';

var branchTree = [];

exports.repositoryName = repositoryName;
exports.branchTree = branchTree;

const github = Octokit({
  auth: `token ${GITHUB_TOKEN}`
});

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

async function updateGitFile(dir, file) {
  console.log(`Updating file ${file.filename}`);
  let file_path = path.join(dir, file.filename);
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
    branchTree = tree.data.tree;
  } catch(e) {
    throw(e);
  }
}

exports.updateAllFiles = async function(dir, files) {
  console.log(`Updating data files on GitHub: ${files}`)
  let gitFiles = [];

  await loadBranchTree();
  branchTree = branchTree.filter(file => /^data\/.*[\.json]/.test(file.path))
  branchTree.forEach((file) => {
    if (files.indexOf(path.join(dir, file.path)) > -1) {
      gitFiles.push({filename: file.path, sha: file.sha});
    }
  });

  let fileSyncPromises = [];

  gitFiles.forEach((file) => {
    fileSyncPromises.push(updateGitFile(dir, file));
  })

  return Promise.all(fileSyncPromises);
}

