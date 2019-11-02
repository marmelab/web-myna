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
        ];
        return inquirer.prompt(locations);
    },
};
