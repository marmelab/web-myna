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
    askApiConfiguration: () => {
        const globalPath = `${processEnv['HOME']}/.webmynarc`;
        const currentPath = `${path.resolve(process.cwd())}/.webmynarc`;
        const locations = [
            {
                type: 'input',
                name: 'name',
                message: 'Quel nom donner au endpoint ?',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please, set an api name';
                    }
                },
            },
            {
                type: 'input',
                name: 'url',
                message: "Quelle est l'url de rediraction vers l'api ?",
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please set an url';
                    }
                },
            },
            {
                type: 'confirm',
                name: 'needToken',
                message: "L'api a-t-elle besoin d'un token d'authentification ?",
            },
            {
                type: 'input',
                name: 'tokenKey',
                message: "Quel est le nom du header http portant le token d'authentification ?",
                default: 'authorization',
                when: value => value.needToken,
            },
            {
                type: 'input',
                name: 'tokenPrefix',
                message: 'Le token doit-il être préfixer dans le header ?',
                default: 'Bearer',
                when: value => value.needToken,
            },
            {
                type: 'confirm',
                name: 'continue',
                message: 'Souhaitez-vous configurer une autre api ?',
            },
        ];
        return inquirer.prompt(locations);
    },
};
