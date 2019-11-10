import signale from 'signale';
import boxen from 'boxen';

import * as appJs from './app.js';
import config, { getApiTokenName, getMissingEnvironmentTokens } from './config.js';

const missingTokens = getMissingEnvironmentTokens();

if (missingTokens.length) {
    const missingApisWithAuthentication = config.apis
        .filter(api => missingTokens.includes(getApiTokenName(api)))
        .map(api => api.name);
    const isPlural = missingApisWithAuthentication.length > 1;
    const message = `
You have declared ${missingApisWithAuthentication.length} api${
        isPlural ? 's' : ''
    } as requiring an authentication token: ${missingApisWithAuthentication.join(', ')}.

You must therefore declare the following token${isPlural ? 's' : ''} as an environment variable: ${missingTokens
        .map(
            token => `
 => ${token}`,
        )
        .join('')}`;
    signale.log(boxen(message, { padding: 1, margin: 1, borderColor: 'red', align: 'center' }));
} else {
    appJs.app.listen(config.proxyPort, () => {
        signale.info(`Web Myna is starded on port ${config.proxyPort} in environment ${config.env}`);
    });
}
