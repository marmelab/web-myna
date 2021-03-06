help: ## Display available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

export UID = $(shell id -u)
export GID = $(shell id -g)

export NODE_ENV ?= development

install: ## Install js deps
	yarn

start: ## Start server
	yarn run start

record: ## Start server in recorder mode
	WEB_MYNA_MODE=recorder yarn run start

start-cli: ## Start Web Myna in CLI
	node --experimental-modules cli/index.js

test: ## Run unit test
	yarn run test

test-watch: ## Run unit test in watch mode
	yarn run test:watch
	
build: ## Build js code in a single file
	yarn run build

get-current-version: ## Set the current package version in the environment variable
	$(eval WM_VERSION = $(shell node -p "require('./package.json').version"))

image-build:
	docker build -t web_myna --force-rm .

image-publish: get-current-version
	docker tag web_myna alexisjanvier/web-myna:${WM_VERSION}
	docker tag web_myna alexisjanvier/web-myna:latest
	docker push alexisjanvier/web-myna:${WM_VERSION}
	docker push alexisjanvier/web-myna:latest

publish-docker: image-build image-publish ## Build then publish image to Github registry

publish-npm: build ## Build cli then publish new version on npm (nedd np install on global)
	np

documentation: ## Generate documentation from JsDoc
	yarn run jsdoc

run-documentation:
	cd website && yarn start
