import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import rc from 'rc';
import signale from 'signale';
import boxen from 'boxen';

import { questions } from './questions.js';

const clearWn = () => {
    clear();
    signale.log(chalk.yellow(figlet.textSync('Web Myna', { horizontalLayout: 'full' })));
};

const displayApiHelp = () => {
    const help = `You must now configure at least one API.
 
To do this, you will need to provide following informations:
 * the name of the API in slug format. For example "rick-and-morty" to call the API on http://localhost/rick-and-morty
 * the real basic url of the API. For example, https://rickandmortyapi.com/api (without final slash)

Optionally, if the API needs an authentication token
 * the name of the http header to add
 * the possible prefix to add to the token
    `;
    clearWn();
    signale.log(boxen(help, { padding: 1 }));
};

clearWn();

const globalConfiguration = rc('webmynat');

if (!globalConfiguration.config) {
    const run = async () => {
        const configurationLocation = await questions.askConfigurationLocation();

        displayApiHelp();
        let apis = [];
        let configureApi = true;
        while (configureApi) {
            if (apis.length) {
                signale.log(`You already have ${apis.length} api.s configured`);
            }
            const apiConfiguration = await questions.askApiConfiguration();
            apis.push({
                name: apiConfiguration.name,
                url: apiConfiguration.url,
                tokenKey: apiConfiguration.tokenKey || 'authorization',
                tokenPrefix: apiConfiguration.tokenPrefix || 'Bearer',
            });
            configureApi = apiConfiguration.continue;
        }

        const finalConfiguration = {
            recordingPath: configurationLocation.recordingPath,
            apis,
        };
        console.log('On va enregistrer le fichier ', configurationLocation.configPath, finalConfiguration);
    };

    run();
} else {
    console.log('START WEBMYNA');
}
// CHECK IF CONFIG FILE EXIST
// IF NOT ASK TO CREATE ONE WITH LOCATION CHOICE
// THEN ASK THE DEFAULT RECORDINGS FOLDER PATH
// THEN ASK TO CONFIGURE AT LEAST ONE API
// SHOW RECAP FOR CONFIRMATION
// THEN START WEBMYNA IN REAL
