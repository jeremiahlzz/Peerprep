FROM docker:24-dind-rootless as build

# Switch to root to install packages
USER root
RUN apk add --no-cache nodejs npm

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN chown -R rootless:rootless /app
USER rootless

EXPOSE 5004
CMD ["npm", "start"]
