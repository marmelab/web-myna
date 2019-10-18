import convict from "convict";
import path from "path";

const processEnv = process.env;

convict.addFormat({
  name: "apis",
  validate: (apis, schema) => {
    if (!Array.isArray(apis)) {
      throw new Error("must be of type Array");
    }

    apis.map((api, index) => {
      const tokenName = api.name ? `${api.name.toUpperCase()}_TOKEN` : null;
      if (tokenName) {
        const apiToken = processEnv[tokenName];
        apis[index].token = processEnv[tokenName];
      }
    });

    for (const api of apis) {
      convict(schema.children)
        .load(api)
        .validate();
    }
  }
});

const config = convict({
  apis: {
    doc: "A collection of APIs to mock.",
    format: "apis",
    default: [],
    children: {
      name: {
        doc:
          "The API name, used as id. So it have to be a slug format, but steel readable",
        format: String,
        default: null
      },
      url: {
        doc: "The API main endpoint URL",
        format: "url",
        default: null
      },
      token: {
        doc: "Authorization token add in headers",
        format: String,
        default: null
      }
    }
  },
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
    arg: "port"
  }
});

config.loadFile(path.resolve(path.dirname(""), "apis.json"));
config.validate({ allowed: "strict" });

export default config.getProperties();
