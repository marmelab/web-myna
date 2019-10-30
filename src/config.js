import convict from 'convict';
import path from 'path';
import { MODE_PLAYER } from './modes.js';

const processEnv = process.env;
const isPlayerMode = processEnv['WEB_MYNA_MODE'] === MODE_PLAYER || !processEnv['WEB_MYNA_MODE'];

convict.addFormat({
    name: 'apis',
    validate: (apis, schema) => {
        if (!Array.isArray(apis)) {
            throw new Error('must be of type Array');
        }

        apis.map((api, index) => {
            const tokenName = api.name ? `${api.name.toUpperCase()}_TOKEN` : null;
            if (tokenName || isPlayerMode) {
                const apiToken = processEnv[tokenName];
                apis[index].token = isPlayerMode ? 'webMynaPlayerToken' : apiToken;
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
            token: {
                doc: 'Value of the authorization token to add in http headers',
                format: String,
                default: null,
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
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 8080,
        env: 'PORT',
        arg: 'port',
    },
});

config.loadFile(path.resolve(path.dirname(''), 'apis.json'));
config.validate({ allowed: 'strict' });

export default config.getProperties();
