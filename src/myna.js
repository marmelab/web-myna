import signale from "signale";
import queryString from "query-string";

import { buildHar } from "./harFactory.js";

export const myna = apiConfig => (req, res, next) => {
  const apiCall = `${apiConfig.url}${req.path}?${queryString.stringify(
    req.query
  )}`;
  const { write: oldWrite, end: oldEnd } = res;

  const chunks = [];

  res.write = function(chunk) {
    chunks.push(Buffer.from(chunk));

    oldWrite.apply(res, arguments);
  };

  res.end = function(chunk) {
    if (chunk) chunks.push(Buffer.from(chunk));

    const body = Buffer.concat(chunks).toString("utf8");
    signale.info("We've got a body to record");
    const harContent = buildHar(req, res, body, apiCall, apiConfig.name);
    signale.info("HAR: ", harContent);

    oldEnd.apply(res, arguments);
  };

  next();
};
