import signale from "signale";

export const myna = apiName => (req, res, next) => {
  signale.info(`Myna will repeat api ${apiName}`);

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

    oldEnd.apply(res, arguments);
  };

  next();
};
