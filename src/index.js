import express from "express";
import signale from "signale";

import config from "./config.js";

const app = express();

app.get("/", (req, res) => res.send("Hello Web Myna"));

app.listen(config.port, () => {
  signale.info(
    `Web Myna is starded on port ${config.port} in environment ${config.env}`
  );
});
