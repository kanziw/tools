FROM node:10.16.3-alpine as web-builder

WORKDIR /app
COPY ./web/public ./public
COPY ./web/package.json web/package-lock.json ./
COPY ./web/src ./src

ENV NODE_ENV=production

RUN npm ci --only=production && npm run build


# Runtime
FROM node:10.16.3-alpine

WORKDIR /app
COPY ./package.json ./package-lock.json ./
COPY src/ src/

COPY --from=web-builder /app/build ./public

ENV NODE_ENV=production

RUN npm ci --only=production

CMD ["npm", "start"]
