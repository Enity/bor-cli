const { Spinner } = require('clui');
const fs = require('fs-extra');
const path = require('path');
const simpleGit = require('simple-git/promise');

const { TS_REPO_URL } = require('../constants');

const initTsBoilerplate = async ({ path: initPath }) => {
  const progress = new Spinner('Ensure dir..', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
  progress.start();
  await fs.ensureDir(initPath);

  progress.message('Cloning repo...');
  const git = simpleGit(initPath);

  try {
    await git.clone(TS_REPO_URL);
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }

  progress.message('Git...');
  const gitDir = path.join(initPath, '.git');
  await fs.remove(gitDir);
  await git.init();
  progress.stop();
  console.log('Enjoy!');
};

module.exports = {
  initTsBoilerplate,
};
