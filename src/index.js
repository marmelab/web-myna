import signale from 'signale';
import boxen from 'boxen';

import * as appJs from './app.js';
import config, { getMissingEnvironmentTokens, getMissingTokensMessage } from './config.js';

const missingTokens = getMissingEnvironmentTokens();

if (missingTokens.length) {
    const message = getMissingTokensMessage(config, missingTokens);
    signale.log(boxen(message, { padding: 1, margin: 1, borderColor: 'red', align: 'center' }));
} else {
    appJs.app.listen(config.proxyPort, () => {
        signale.info(`Web Myna is starded on port ${config.proxyPort} in environment ${config.env}`);
    });
}
