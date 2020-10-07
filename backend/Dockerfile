from node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# BUNDLE APP SOURCE
COPY . .

EXPOSE 3000
CMD ["node", "server.js", "neo4j"]

