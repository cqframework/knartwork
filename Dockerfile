FROM node:17-alpine AS builder
LABEL maintainer="Preston Lee <preston.lee@prestonlee.com>"
RUN mkdir -p /app
WORKDIR /app

COPY package.json .

RUN npm install
COPY . .

RUN npm run build 
# --prod

FROM nginx:stable-alpine

# We need to make a few changes to the default configuration file.
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove any default nginx content
RUN rm -rf *

## Copy build from "builder" stage, as well as runtime configuration script public folder
COPY --from=builder /app/dist/app .
COPY --from=builder /app/configure-from-environment.sh .

# CMD ["./configure-from-environment.sh", "&&", "exec", "nginx", "-g", "'daemon off;'"]
CMD /bin/sh /usr/share/nginx/html/configure-from-environment.sh && exec nginx -g 'daemon off;'
