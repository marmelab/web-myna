import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import rc from 'rc';

import { questions } from './questions.js';

clear();

console.log(chalk.yellow(figlet.textSync('Web Myna', { horizontalLayout: 'full' })));

const globalConfiguration = rc('webmynat');

if (!globalConfiguration.config) {
    const run = async () => {
        const locations = await questions.askConfigurationLocation();
        console.log(locations);
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
