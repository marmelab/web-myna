#!/usr/bin/env node
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import rc from 'rc';
import signale from 'signale';
import boxen from 'boxen';
import fs from 'fs';

import { questions } from './questions.js';
import config from '../src/config.js';
import { app } from '../src/app.js';

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

const globalConfiguration = rc('webmyna');

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

        clearWn();
        const finalConfiguration = {
            recordingsPath: configurationLocation.recordingsPath,
            apis,
        };
        try {
            if (!fs.existsSync(configurationLocation.recordingsPath)) {
                fs.mkdirSync(configurationLocation.recordingsPath);
            }
            fs.writeFileSync(configurationLocation.configPath, JSON.stringify(finalConfiguration, null, 2), {
                encoding: 'utf8',
            });
            signale.log(
                'The configuration of Web Myna is completed and saved. You can restart it, everything should work!',
            );
        } catch (error) {
            signale.log(`Error when saving your configuration of the ${configurationLocation.configPath} file.`);
            signale.error(error);
        }
        process.exit();
    };

    run();
} else {
    app.listen(config.proxyPort, () => {
        signale.info(`Web Myna is starded on port ${config.proxyPort} in environment ${config.env}`);
    });
}

process.on('SIGINT', function() {
    clear();
    signale.log(chalk.yellow(figlet.textSync('Bye', { horizontalLayout: 'full' })));
    process.exit(1);
});
