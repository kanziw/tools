FROM node:10.16.3-alpine as server-builder

WORKDIR /app
COPY package.json package-lock.json tsconfig.json .babelrc ./
COPY ./src ./src

RUN npm ci && npm run build


FROM node:10.16.3-alpine as web-builder

WORKDIR /app
COPY ./web/public ./public
COPY ./web/package.json web/package-lock.json web/jsconfig.json ./
COPY ./web/src ./src

RUN npm ci && npm run build


# Runtime
FROM node:10.16.3-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY package.json package-lock.json  ./
RUN npm ci --only=production

COPY --from=server-builder /app/dist ./dist
COPY --from=web-builder /app/build ./public

CMD ["npm", "start"]
