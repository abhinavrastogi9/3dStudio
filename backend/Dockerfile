FROM node:18-alpine

WORKDIR  /home/node/app

COPY package*.json .

RUN npm install

COPY --chown=node:node . .

EXPOSE 5000

CMD ["node","src/server.js"]
