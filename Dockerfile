FROM node:13

ENV DOCKER=enabled

# Create app directory
WORKDIR /usr/src/app

# Get package.json and package-lock.json
COPY package*.json ./
COPY .babelrc ./


# Bundle app resource
COPY . .

# install dependencies
RUN npm run app-install

# Build project
RUN npm run client-build && npm run server-build

EXPOSE 4004

CMD [ "node", "dist/server.js" ]

# command: docker run -it -p 4004:4004  <username>/<name>