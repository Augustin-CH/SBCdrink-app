DC := docker compose -f ./docker/docker-compose.yml
EXEC := $(DC) exec

.DEFAULT_GOAL: help
.PHONY: help
help: ## Affiche cette aide
	@fgrep -h "##" $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-10s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## --- Docker 🐳 ---
.PHONY: up
up: ## Démarre le conteneur
	$(DC) up -d

.PHONY: down
down: ## Stoppe le conteneur
	$(DC) down 

## --- Projet 🐸 ---
	
.PHONY: init
init: ## Initialise le projet
	$(EXEC) app yarn install

.PHONY: start
start: ## Démarre le projet
	make up
	$(EXEC) app yarn start

.PHONY: logs
logs: ## Affiche les logs du conteneur
	$(DC) logs -f sbcdrink-app

.PHONY: shell
shell: ## Lance un shell bash
	$(EXEC) sbcdrink-app bash
