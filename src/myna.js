import signale from "signale";
import queryString from "query-string";
import fs from "fs";
import path from "path";
import md5 from "md5";

import { buildHar } from "./harFactory.js";

export const myna = apiConfig => (req, res, next) => {
  const apiRecordingsPath = path.resolve(
    path.dirname(""),
    "recordings",
    apiConfig.name
  );
  if (!fs.existsSync(apiRecordingsPath)) {
    fs.mkdirSync(apiRecordingsPath, parseInt("0744", 8));
  }

  const apiCall = `${apiConfig.url}${req.path}?${queryString.stringify(
    req.query
  )}`;
  const apiRecordPath = `${apiRecordingsPath}/${md5(apiCall)}.har`;
  if (fs.existsSync(apiRecordPath)) {
    signale.success("THE RECORD EXIST! PLAY IT");
    const record = fs.readFileSync(apiRecordPath, "utf8");
    const recordedCall = JSON.parse(record).entries[0];

    return res.json(recordedCall.response.content);
  }

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
    fs.writeFileSync(apiRecordPath, JSON.stringify(harContent), {
      encoding: "utf8"
    });

    oldEnd.apply(res, arguments);
  };

  next();
};
