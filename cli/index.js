import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import rc from 'rc';
import signale from 'signale';

import { questions } from './questions.js';

const clearWn = () => {
    clear();
    console.log(chalk.yellow(figlet.textSync('Web Myna', { horizontalLayout: 'full' })));
};

clearWn();

const globalConfiguration = rc('webmynat');

if (!globalConfiguration.config) {
    const run = async () => {
        const configurationLocation = await questions.askConfigurationLocation();
        clearWn();
        signale.log('Vous devez maintenant configurer au moins une API');
        let apis = [];
        let configureApi = true;
        while (configureApi) {
            if (apis.length) {
                signale.log(`Vous avez déja ${apis.length} api.s configurée.s`);
            }
            const apiConfiguration = await questions.askApiConfiguration();
            apis.push({
                name: apiConfiguration.name,
                url: apiConfiguration.url,
                tokenKey: apiConfiguration.tokenKey || 'authorization',
                tokenPrefix: apiConfiguration.tokenPrefix || 'Bearer',
            });
            clearWn();
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
