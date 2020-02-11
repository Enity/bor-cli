const path = require('path');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const { askAction, askProjectName } = require('./ui');
const { ACTION_TYPE } = require('./constants');
const { initTsBoilerplate } = require('./actions/ts-boilerplate');

const getLogo = () => chalk.red(figlet.textSync('BOR-CLI', { horizontalLayout: 'full' }));

const main = async () => {
  clear();
  console.log(getLogo());
  const currentPath = process.cwd();
  const { action } = await askAction();

  if (action === ACTION_TYPE.INIT_TS_BOILERPLATE) {
    const { dirname } = await askProjectName();
    const fullPath = path.resolve(currentPath, dirname);
    await initTsBoilerplate({ path: fullPath });
  } else {
    process.exit(0);
  }
};

main();
