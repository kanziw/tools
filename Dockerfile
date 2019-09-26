FROM node:10.16.3-alpine

WORKDIR /app
COPY ./package.json ./
COPY src/ src/

ENV NODE_ENV=production

RUN npm install

CMD ["npm", "start"]
