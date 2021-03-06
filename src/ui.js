const inquirer = require('inquirer');
const { ACTION_TYPE } = require('./constants');

const askAction = () => inquirer.prompt([{
  name: 'action',
  type: 'list',
  message: 'What are u want?',
  choices: [
    { name: 'Initialize typescript boilerplate', value: ACTION_TYPE.INIT_TS_BOILERPLATE },
  ],
},
]);

const askProjectName = () => inquirer.prompt([{
  name: 'dirname',
  type: 'input',
  message: 'Enter new project folder name. Empty for current directory',
}]);

const askTsBoilerplateOptions = () => inquirer.prompt([{
  name: 'options',
  type: 'checkbox',
  message: 'Select options',
  choices: [
    { name: 'Dockerfile', value: 'docker', checked: true },
    { name: 'Gitlab Ci config', value: 'gitlab', checked: true },
    { name: 'Install dependencies', value: 'npmi' },
  ],
}]);

module.exports = {
  askAction,
  askProjectName,
  askTsBoilerplateOptions,
};
