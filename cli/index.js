import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

clear();

console.log(chalk.yellow(figlet.textSync('Web Myna', { horizontalLayout: 'full' })));

// CHECK IF CONFIG FILE EXIST
// IF NOT ASK TO CREATE ONE WITH LOCATION CHOICE
// THEN ASK THE DEFAULT RECORDINGS FOLDER PATH
// THEN ASK TO CONFIGURE AT LEAST ONE API
// SHOW RECAP FOR CONFIRMATION
// THEN START WEBMYNA IN REAL
