FROM node
LABEL maintainer="Preston Lee <preston.lee@prestonlee.com>"
WORKDIR /app

# Make sure the latest version of core dependencies are installed.
RUN npm i -g npm http-server

# --unsafe-perm due to this issue: https://github.com/npm/npm/issues/17431
RUN npm i -g --unsafe-perm @angular/cli

# Cache project dependency installation prior to project files, since code changes more often than dependencies.
COPY package*.json ./
RUN npm i

# Now install everything else.
COPY . .
RUN ng build

EXPOSE 8080
ENTRYPOINT ["http-server", "dist"]
