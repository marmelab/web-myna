help: ## Display available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

export UID = $(shell id -u)
export GID = $(shell id -g)

export NODE_ENV ?= development

install: ## Install js deps
	yarn

start: ## Start server
	yarn run start
