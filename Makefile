help: ## Display available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

export UID = $(shell id -u)
export GID = $(shell id -g)

export NODE_ENV ?= development

install: ## Install js deps
	yarn

start: ## Start server
	yarn run start

get-current-version: ## Set the current package version in the environment variable
	$(eval WM_VERSION = $(shell node -p "require('./package.json').version"))

image-build:
	docker build -t web_myna --force-rm .

image-publish: get-current-version
	docker tag web_myna alexisjanvier/web-myna:${WM_VERSION}
	docker tag web_myna alexisjanvier/web-myna:latest
	docker push alexisjanvier/web-myna:${WM_VERSION}
	docker push alexisjanvier/web-myna:latest

publish: image-build image-publish ## Build then publish image to Github registry



