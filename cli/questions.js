import inquirer from 'inquirer';
import path from 'path';

const processEnv = process.env;

export const questions = {
    askConfigurationLocation: () => {
        const globalPath = `${processEnv['HOME']}/.webmynarc`;
        const currentPath = `${path.resolve(process.cwd())}/.webmynarc`;
        const locations = [
            {
                type: 'list',
                name: 'configPath',
                message: 'Where do you want to store the WebMyna configuration file?',
                choices: [
                    { name: `Global (${globalPath})`, value: globalPath },
                    { name: `Project (${currentPath})`, value: currentPath },
                ],
                default: '~/.webmynarc',
            },
            {
                type: 'input',
                name: 'recordingPath',
                message: `Where do you want to store the WebMyna recordings?`,
                default: answers => answers.configPath.replace('.webmynarc', '.webmyna'),
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please, set a folder path';
                    }
                },
            },
        ];
        return inquirer.prompt(locations);
    },
};
