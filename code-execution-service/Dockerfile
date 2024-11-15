FROM docker:24-dind-rootless as build

# Switch to root to install packages
USER root
RUN apk add --no-cache nodejs npm

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
# RUN chown -R rootless:rootless /app
USER rootless

EXPOSE 5004
CMD ["sh", "-c", "dockerd-entrypoint.sh > /dev/null 2>&1 & sleep 3 && npm start"]
# > /dev/null redirects standard output, silencing output from the entrypoint script
# 2>&1 redirects standard error, silencing it
