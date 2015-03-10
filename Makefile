##
# Bowser Make
# Copyright(c) 2014 Koreviz
# MIT Licensed
##
SHELL := /bin/bash

APP = rayman
VERSION = v0.1.0
REPO = koreviz/$(APP)

all: configure
	
configure:
	npm install
	bower install

push:
	rm -fR .git
	git init
	git add .
	git commit -m "Initial release"
	git remote add origin gh:$(REPO).git
	git push origin master
	# $(MAKE)
	# gulp
	rm -fR .git
	
	cd dist/; git init && git remote add origin gh:$(REPO).git && git symbolic-ref HEAD refs/heads/gh-pages && git add . && git commit -m "Initial release" && git push origin gh-pages && rm -fR .git