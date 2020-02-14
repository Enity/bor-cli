const { Spinner } = require('clui');
const fs = require('fs-extra');
const path = require('path');
const { promisify } = require('util');
const childProcess = require('child_process');
const simpleGit = require('simple-git/promise');

const exec = promisify(childProcess.exec);
const { TS_REPO_URL } = require('../constants');

const initTsBoilerplate = async ({
  path: initPath, docker, gitlab, npmi,
}) => {
  const progress = new Spinner('Ensure dir..', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
  progress.start();
  await fs.ensureDir(initPath);

  progress.message('Cloning repo...');
  const git = simpleGit(initPath);

  try {
    await git.clone(TS_REPO_URL, initPath);
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }

  progress.message('Change names...');
  const projectName = path.basename(initPath);
  const packageJsonPath = path.join(initPath, 'package.json');
  const packageJson = await fs.readFile(packageJsonPath, 'utf-8');
  const parsedPackage = JSON.parse(packageJson);
  parsedPackage.name = projectName;
  parsedPackage.description = `${projectName} project`;
  await fs.writeFile(packageJsonPath, JSON.stringify(parsedPackage, null, 2));

  progress.message('Clean...');
  if (!docker) {
    await fs.remove(path.join(initPath, 'Dockerfile'));
  }

  if (!gitlab) {
    await fs.remove(path.join(initPath, '.gitlab-ci.yml'));
  }

  if (npmi) {
    progress.message('Installing dependencies...');
    await exec('npm ci', { cwd: initPath });
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
