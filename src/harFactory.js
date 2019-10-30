/**
 * Transform a Binay (Buffer) into string
 *
 * @param {Buffer} value - The binary to convert
 * @returns {string} - The returned binary convert in string
 */
export const transformBinaryToUtf8 = value => {
    if (value === undefined || value === null) {
        return value;
    }

    return Buffer.from(String(value), 'binary').toString('utf8');
};

/**
 * Transform on object param/value in an array withe name from param and value from value
 *
 * @param {object} obj - The object to transform
 * @returns {Array} - The transformed objet
 */
export const buildFlattenedNameValueMap = obj => {
    if (!obj) {
        return [];
    }

    return Object.keys(obj).reduce((result, key) => {
        const value = obj[key];
        if (Array.isArray(value)) {
            return result.concat(
                value.map(v => ({
                    name: key,
                    value: transformBinaryToUtf8(v),
                })),
            );
        } else {
            return result.concat({
                name: key,
                value: transformBinaryToUtf8(value),
            });
        }
    }, []);
};

/**
 * Prepare a json object ready to be transform in a valid .har file
 *
 * @param {object} req - the express request used for the request
 * @param {object} res - The express response return by the reverse proxy
 * @param {object} body - The body json response return by the reverse proxy
 * @param {string} apiCall - The url used for api call
 * @param {string} apiName - The mocked api name
 * @returns {object} - The json object used to create the final .har file
 */
export const buildHar = (req, res, body, apiCall, apiName) => {
    const harRequest = {
        method: req.method,
        url: apiCall,
        httpVersion: 'HTTP/1.1',
        cookies: [],
        headers: buildFlattenedNameValueMap(req.headers),
        queryString: buildFlattenedNameValueMap(req.query),
        postData: {},
        headersSize: JSON.stringify(req.headers).length,
        bodySize: req.body ? req.body.length : 0,
        comment: '',
    };
    const harResponse = {
        status: res.statusCode || 0,
        statusText: res.statusMessage || '',
        httpVersion: 'HTTP/1.1',
        cookies: [],
        headers: buildFlattenedNameValueMap(res.headers),
        content: JSON.parse(body),
        redirectURL: '',
        headersSize: res.headers ? JSON.stringify(res.headers).length : 0,
        bodySize: JSON.stringify(body).length,
        comment: '',
    };

    return {
        entries: [
            {
                pageref: apiName,
                startedDateTime: new Date().toISOString(),
                time: 50,
                request: harRequest,
                response: harResponse,
                cache: {},
                timings: {
                    send: 0,
                    receive: 0,
                    wait: 500,
                },
                comment: '',
            },
        ],
    };
};
