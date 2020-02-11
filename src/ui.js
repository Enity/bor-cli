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
  message: 'Enter new project folder name. Or \'.\' for current directory',
}]);

module.exports = {
  askAction,
  askProjectName,
};
