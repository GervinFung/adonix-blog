.PHONY: build test all
MAKEFLAGS += --silent

all:
	make lint &&\
		make typecheck &&\
		make format-check &&\
		make test &&\
		make build

NODE_BIN=node_modules/.bin/

## install
install:
	pnpm i --frozen-lockfile	

## dev
next=$(NODE_BIN)next

clear-cache: 
	rm -rf .next

dev: clear-cache development
	$(next) dev

## env
development:
	cp .env.development .env

staging:
	cp .env.staging .env

production:
	cp .env.production .env

## deployment
vercel-staging: staging
	vercel

vercel-production: production
	vercel --prod

## build
build: clear-cache
	$(next) build

## clean-up:
clean-up:
	rm -rf src test script .github .git post pages docs

## start
start:
	$(next) start

## format
prettier=$(NODE_BIN)prettier
prettify:
	$(prettier) --$(type) src/ test/

format-check:
	make prettify type=check

format:
	make prettify type=write

## lint
lint:
	$(NODE_BIN)eslint src/ test/ -f='stylish' --color

## typecheck
tsc=$(NODE_BIN)tsc

typecheck:
	$(tsc) -p tsconfig.json $(arguments) 

typecheck-watch:
	make typecheck arguments=--w

## test
test:
	$(NODE_BIN)vitest

install-mongo:
	sudo apt-get install gnupg
	wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
	echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
	sudo apt-get update
	sudo apt-get install -y mongodb-org

setup-mongo:
	sudo systemctl start mongod
	sudo systemctl stop mongod
	sudo systemctl restart mongod
	mongosh < script/mongo.js
