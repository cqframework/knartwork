# KNARTwork: The Community Knowledge Artifact Editor

KNARTwork is a multi-purpose web application for authoring, viewing, and transforming knowledge artifacts across popular specifications. By default, this project provides a purely standalone experience that does not use any standard-specific APIs (such as FHIR) or databases (such as RDBMS or NoSQL) systems, and may be used as-is by end users wanting to manage source documents using git/subversion, Dropbox, email etc. Launch options will be added as appropriate to support such optional backend integration modes as they are made available by the CDS community.

## Developer Quick Start

This is an [AngularJS 2](https://angular.io) project using `grunt` as the build system, [pug](https://pugjs.org/api/getting-started.html) for HTML templates, [SASS](http://sass-lang.com) for CSS and [Bootstrap](http://getbootstrap.com/) for layout. `npm` is the package manager. Assuming you already have node installed via `brew install node` or similar:

	npm install -g grunt typings
	npm install # to install project development dependencies
	typings install # to install TypeScript declarations

To run in development mode, just:

	grunt # to serve the project and aautomatically recompile on file changes

Visit [http://localhost:9000](http://localhost:9000) and do your thang. :)

## Building for Production

First, build:

	grunt build # to build your local copy with any local changes

Then, assuming you've already familiar with [Docker](https://www.docker.com) awesomeness and have it installed, plop the build into a wicked-fast [nginx](http://nginx.org) web server container using the including Dockerfile with:

	docker build -t p3000/knartwork:latest . # though you probably want your own repo and tag strings :)

## Production Deployment

Extremely easy in your existing Dockerized hosting environment. Just:

	docker run -d -p 9000:9000 --restart unless-stopped p3000/knartwork:latest # or any official tag

And you're done. No environment variables or further configuration are needed. Jedi's may use your existing Kubernetes, Open Shift etc installations as you see fit. :) 

## Attribution

Please add your name when making contributions!

* Preston Lee <preston@asu.edu>
