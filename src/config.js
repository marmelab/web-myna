import convict from 'convict';
import rc from 'rc';

import { MODE_PLAYER } from './modes.js';

const processEnv = process.env;
const isPlayerMode = processEnv['WEB_MYNA_MODE'] === MODE_PLAYER || !processEnv['WEB_MYNA_MODE'];

const globalConfiguration = rc('webmyna', { apis: [], recordingsPath: null });

/**
 * return the token name as environment variable from api name
 *
 * @example api name: rick-and-morty => token name RICK_AND_MORTY_TOKEN
 * @function
 * @param {object} api the api object configuration
 * @returns {string} The token name
 */
export const getApiTokenName = api => {
    return api.name ? `${api.name.toUpperCase().replace(/-/g, '_')}_TOKEN` : 'fakeWebMynaTokenName';
};

/**
 * Returns an array of missing token names from the environment variables
 *
 * @function
 * @param {object[]} apis an array of configured apis
 * @param {object} environment the environment from process.env
 * @returns {string[]} an array of missing token name from environment variables
 */
export const getMissingEnvironmentTokens = (apis = globalConfiguration.apis, environment = processEnv) => {
    let missingTokens = [];
    apis.filter(api => api.requiresAuthentication)
        .map(api => getApiTokenName(api))
        .map(tokenName => {
            if (!environment[tokenName]) {
                missingTokens.push(tokenName);
            }
        });

    return missingTokens;
};

convict.addFormat({
    name: 'apis',
    validate: (apis, schema) => {
        if (!Array.isArray(apis)) {
            throw new Error('must be of type Array');
        }

        // if webmyna mode is recorder and api requires an authentication and token is present in environment variables
        // we add token from environment variable in config
        apis.map((api, index) => {
            const tokenName = getApiTokenName(api);
            const apiToken = processEnv[tokenName] || null;
            if (apiToken && api.requiresAuthentication && !isPlayerMode) {
                apis[index].token = apiToken;
            }
        });

        for (const api of apis) {
            convict(schema.children)
                .load(api)
                .validate();
        }
    },
});

const config = convict({
    apis: {
        doc: 'A collection of APIs to mock.',
        format: 'apis',
        default: [],
        children: {
            name: {
                doc: 'The API name, used as id. So it have to be a slug format, but steel readable',
                format: String,
                default: null,
            },
            url: {
                doc: 'The API main endpoint URL',
                format: 'url',
                default: null,
            },
            requiresAuthentication: {
                doc: 'Does the API require authentication or not',
                format: Boolean,
                default: false,
            },
            token: {
                doc: 'Value of the authorization token to add in http headers',
                format: String,
                default: 'webMynaDefaultToken',
            },
            tokenKey: {
                doc: 'Name of the http header for authentification',
                format: String,
                default: 'authorization',
            },
            tokenPrefix: {
                doc: 'Token prefix into the http header value',
                format: String,
                default: 'Bearer',
            },
        },
    },
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
    },
    mode: {
        doc: 'Recording mode in which WebMyna is started',
        format: ['player', 'recorder'],
        default: 'player',
        env: 'WEB_MYNA_MODE',
    },
    proxyPort: {
        doc: 'The proxy port to bind.',
        format: 'port',
        default: globalConfiguration.proxyPort || 8080,
        env: 'WEB_MYNA_PROXY_PORT',
    },
    recordingsPath: {
        doc: 'path to the main recording folder',
        format: String,
        default: globalConfiguration.recordingsPath || '/tmp/webmyna',
        env: 'WEB_MYNA_RECORDINGS_PATH',
    },
});

config.load({ apis: globalConfiguration.apis });
config.validate({ allowed: 'strict' });

export default config.getProperties();
