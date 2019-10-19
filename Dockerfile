FROM node:12.12.0-alpine AS builder

ENV NODE_ENV production

RUN apk update --no-cache && apk --no-cache add curl
RUN curl -sL https://github.com/tj/node-prune/releases/download/v1.0.1/node-prune_1.0.1_linux_amd64.tar.gz | tar xzvf - -C /tmp

RUN mkdir /app

ADD ./package.json /app/package.json
ADD ./yarn.lock /app/yarn.lock

WORKDIR /app

RUN yarn install --non-interactive --pure-lockfile --production && yarn cache clean && /tmp/node-prune

# Starts a new build stage which will be the final image
FROM node:12.12.0-alpine

ENV NODE_ENV production

RUN mkdir /app
COPY --from=builder ./app/node_modules /app/node_modules
COPY ./src /app/src

WORKDIR /app

CMD ["yarn", "start"]

