import express from "express";
import signale from "signale";

import config from "./config.js";

if (!config.apis.length) {
  signale.error("There is no API to mock !");
}

for (const api of config.apis) {
  signale.info(
    `We will mock ${api.name} on url ${api.url} with token ${api.token}`
  );
}

const app = express();

app.get("/", (req, res) => res.send("Hello Web Myna"));

app.listen(config.port, () => {
  signale.info(
    `Web Myna is starded on port ${config.port} in environment ${config.env}`
  );
});
