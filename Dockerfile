FROM node:20-alpine3.19

ENV NODE_VERSION 20.5.1


WORKDIR /src/app

# Copy in the package.json file
COPY package.json package-lock.json ./

RUN npm ci

# Install app dependencies
RUN npm install && npm i nodemon@^2.0.12 -g

# Copy in remaining development files
COPY . /src/app

# Expose the api port
EXPOSE 3333

# Start server
CMD exec nodemon --inspect ./main.js --use-strict
