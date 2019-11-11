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
                name: 'recordingsPath',
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
                message: 'What is the name of the API? (in slug format)',
                validate: function(value) {
                    if (value.length && value.match(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/)) {
                        return true;
                    } else {
                        return 'Please, set an api name slugified';
                    }
                },
            },
            {
                type: 'input',
                name: 'url',
                message: 'What is the basic url of the real API? (without slash at the end)',
                validate: function(value) {
                    const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
                    if (value.length && value.match(urlRegex) && !value.endsWith('/')) {
                        return true;
                    } else {
                        return 'Please set a valid url, without final slash';
                    }
                },
            },
            {
                type: 'confirm',
                name: 'requiresAuthentication',
                message: 'Does the API need an authentication token?',
            },
            {
                type: 'input',
                name: 'tokenKey',
                message: 'What is the name of the http header with the authentication token?',
                default: 'authorization',
                when: value => value.requiresAuthentication,
            },
            {
                type: 'input',
                name: 'tokenPrefix',
                message: 'Should the token be prefixed in the header?',
                default: 'Bearer',
                when: value => value.requiresAuthentication,
            },
            {
                type: 'confirm',
                name: 'continue',
                message: 'Do you want to configure another API?',
            },
        ];
        return inquirer.prompt(locations);
    },
};
