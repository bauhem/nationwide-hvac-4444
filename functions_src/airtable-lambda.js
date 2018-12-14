require("@babel/polyfill");

const api = require("../airtable-api");

const Airtable = require('airtable');

const fs = require('fs')
const path = require('path')
const process = require('process')
const {spawnSync} = require('child_process')

const {AIRTABLE_API_KEY, AIRTABLE_API_BASE, GITHUB_TOKEN, GITHUB_USERNAME, GITHUB_EMAIL, GIT_BRANCH} = process.env
// leaving this without https:// in order to reuse it when adding the remote
const gitRepositoryURL = 'github.com/bauhem/nationwide-hvac-4444.git'
const repositoryName = 'nationwide-hvac-4444'
const gitBranch = GIT_BRANCH || 'master'

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
  let orig_dir = process.cwd();

  try {
    // Don't load lambda-git when git is available already. Used of testing mostly
    runCommand('git --version')
  } catch {
    await require('lambda-git')()
  }

  const base = new Airtable({
    apiKey: AIRTABLE_API_KEY
  }).base(AIRTABLE_API_BASE);

  process.chdir('/tmp')
  let output_dir = path.join(process.cwd(), repositoryName);
  if (!fs.existsSync(output_dir)) {
    runCommand(`git clone --quiet https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@${gitRepositoryURL}`)
  }
  process.chdir(output_dir);

  if (gitBranch !== 'master') {
    runCommand(`git checkout --quiet ${gitBranch}`);
  }

  await api.syncAll(base, output_dir);

  runCommand(`git config --local user.email ${GITHUB_EMAIL}`)
  runCommand(`git config --local user.name ${GITHUB_USERNAME}`)
  runCommand('git add .')
  // commit changes
  runCommand('git commit -m "Updated airtable data files from lambda."')
  // replace the remote with an authenticated one
  runCommand('git status')
  runCommand('git remote rm origin')
  runCommand(
    `git remote add origin https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@${gitRepositoryURL}`
  )
  // push changes to remote
  runCommand(`git push --porcelain --set-upstream origin ${gitBranch}`)

  process.chdir(orig_dir);

  // terminate the lambda
  return callback(null, {
    statusCode: 200,
    body: "All synched!"
  })
}
