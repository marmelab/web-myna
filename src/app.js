import express from 'express';
import proxy from 'http-proxy-middleware';

import config from './config.js';
import { myna } from './myna.js';

export const app = express();

app.get('/', (req, res) => res.json({ message: 'Hello Web Myna' }));

for (const api of config.apis) {
    const proxyOptions = {
        changeOrigin: true,
        proxyTimeout: 5000,
        timeout: 5000,
        target: api.url,
        ignorePath: false,
        pathRewrite: path => path.replace(`/${api.name}`, ''),
        onProxyReq: proxyReq =>
            proxyReq.setHeader(`${api.tokenKey || 'authorization'}`, `${api.tokenPrefix || 'Bearer'} ${api.token}`),
    };
    app.use(`/${api.name}`, myna(api), proxy(proxyOptions));
}
