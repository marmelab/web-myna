import signale from 'signale';

import { app } from './app.js';
import config from './config.js';

app.listen(config.proxyPort, () => {
    signale.info(`Web Myna is starded on port ${config.proxyPort} in environment ${config.env}`);
});
