# KNARTwork: The Community Knowledge Artifact Editor

KNARTwork is a multi-purpose web application for authoring, viewing, and transforming knowledge artifact-like documents across popular specifications, primarily aimed healthcare-specific uses. By default, this application provides a purely standalone experience that does not use any standard-specific APIs (such as FHIR) or databases (such as RDBMS or NoSQL) systems, and may be used as-is by end users wanting to manage source documents as an out-of-band process using git/subversion, Dropbox, email etc. Server-side persistence options will be added as optional features as backend implementations emerge from the CDS community.

Community contributions -- especially those specific to evolving clinical standards -- are highly encouraged! Please submit your pull requests (PRs) via the community's public GitHub project page.

## Repository Browsing

If you have an existing library of KNARTs, KNARTwork supports browsing an opening your existing content through a special built-in launch page. To use it, create a manifest.json file like [this], and host it, along with your KNART files, on a website directory accessible to your users. This "repository" URL is then passed to KNARTwork's brower page as a url parameter. The website directory doesn't have to be on the public Internet.. just somewhere your users can access it from their local browsers. Be sure the server allows for "CORS" requests: otherwise KNARTwork won't be able to load the manifest and content.

KNARTwork comes with a fully working example of the manifest format, referencing example KNARTs from the HL7 specification. You can organize your content any way you want, as long as the "path" for each KNART is relative to the URL. Here is an example of a working repository-based launch:

	https://knartwork.healthcreek.org/browser?repository=https://knartwork.healthcreek.org/examples

This decoupling of repository structure allows authors to easily share entire libraries of KNARTs by simply dropping them into a directory on the web.

## Developer Quick Start

This is an [AngularJS 5](https://angular.io) project using `grunt` as the build system, [pug](https://pugjs.org/api/getting-started.html) for HTML templates, [SASS](http://sass-lang.com) for CSS and [Bootstrap](http://getbootstrap.com/) for layout. `npm` is the package manager. Assuming you already have node installed via `brew install node` or similar:

	npm install -g grunt typings
	npm install # to install project development dependencies
	typings install # to install TypeScript declarations

To run in development mode, just:

	grunt # to serve the project and automatically recompile on file changes

Visit [http://localhost:9000](http://localhost:9000) and do your thang. :)

## Building for Production

First, build:

	grunt build # to build your local copy with any local changes

Then, assuming you've already familiar with [Docker](https://www.docker.com) awesomeness and have it installed, plop the build into a wicked-fast [nginx](http://nginx.org) web server container using the including Dockerfile with:

	docker build -t p3000/knartwork:latest . # though you probably want your own repo and tag strings :)

## Production Deployment

Extremely easy in your existing Dockerized hosting environment. Just:

	docker run -d -p 9000:80 --restart unless-stopped p3000/knartwork:latest # or any official tag

And you're done. No environment variables or further configuration are needed. Jedi's may use your existing Kubernetes, Open Shift etc installations as you see fit. :)

## Screenshots

Create new files, load from the Internet, or local computer:
![Loader](https://raw.githubusercontent.com/preston/knartwork/master/screenshots/1.png)

Load the examples from the official HL7 CDS Knowledge Artifact distribution:
![Examples](https://raw.githubusercontent.com/preston/knartwork/master/screenshots/2.png)

Comprehensively manage the "metadata" section of each artifact:
![Metadata](https://raw.githubusercontent.com/preston/knartwork/master/screenshots/3.png)

Build complex action structures:
![Actions](https://raw.githubusercontent.com/preston/knartwork/master/screenshots/4.png)

Preview your work:
![Preview](https://raw.githubusercontent.com/preston/knartwork/master/screenshots/5.png)

## Attribution

Please add your name when making contributions!

* Preston Lee <preston@asu.edu>
* Bryn Rhodes <bryn@databaseconsultinggroup.com>
* Austin Michne <amichne@asu.edu>

## License

**The MIT License (MIT)**
Copyright (c) 2016-2017 Preston Lee

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
