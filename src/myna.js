import signale from 'signale';
import queryString from 'query-string';
import fs from 'fs';
import path from 'path';
import md5 from 'md5';

import { buildHar } from './harFactory.js';
import config from './config.js';
import { MODE_RECORDER, MODE_PLAYER } from './modes.js';

/**
 * Description of the WebMyna Middleware.
 *
 * @function
 * @param {object} apiConfig - Configuration for the current mocked api
 * @returns {Function} - The curried middleware
 */
export const myna = apiConfig => (req, res, next) => {
    const apiRecordingsPath = path.resolve(config.recordingsPath, apiConfig.name);
    if (!fs.existsSync(apiRecordingsPath) && config.mode === MODE_RECORDER) {
        fs.mkdirSync(apiRecordingsPath, parseInt('0777', 8));
    }

    const apiCall = `${apiConfig.url}${req.path}?${queryString.stringify(req.query)}`;
    signale.info('Request on path', apiCall);
    const apiRecordPath = `${apiRecordingsPath}/${md5(apiCall)}.har`;

    if (fs.existsSync(apiRecordPath)) {
        signale.success('THE RECORD EXIST! PLAY IT');
        const record = fs.readFileSync(apiRecordPath, 'utf8');
        const recordedCall = JSON.parse(record).entries[0];

        return res.json(recordedCall.response.content);
    } else if (config.mode === MODE_PLAYER) {
        return res.status(421).json({ message: 'This request has not been recorded by WebMyna' });
    }

    const { write: oldWrite, end: oldEnd } = res;

    const chunks = [];

    res.write = function(chunk) {
        chunks.push(Buffer.from(chunk));

        oldWrite.apply(res, arguments);
    };

    res.end = function(chunk) {
        if (chunk) chunks.push(Buffer.from(chunk));

        const body = Buffer.concat(chunks).toString('utf8');
        try {
            const harContent = buildHar(req, res, body, apiCall, apiConfig.name);
            fs.writeFileSync(apiRecordPath, JSON.stringify(harContent, null, 2), {
                encoding: 'utf8',
            });
        } catch (error) {
            signale.error(error);
            signale.error(`Impossible to create .har from response to ${apiCall}`);
        }

        oldEnd.apply(res, arguments);
    };

    next();
};
