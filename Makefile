
install:
	npm install

run: install
	npm run serve

build: install
	npm run build

lint:
	npm run lint