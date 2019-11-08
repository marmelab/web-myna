import signale from 'signale';

import * as appJs from './app.js';
import config, { getMissingEnvironmentTokens } from './config.js';

const missingTokens = getMissingEnvironmentTokens();

if (missingTokens.length) {
    signale.error('IL MANQUE DES TOKENS', missingTokens);
} else {
    appJs.app.listen(config.proxyPort, () => {
        signale.info(`Web Myna is starded on port ${config.proxyPort} in environment ${config.env}`);
    });
}
