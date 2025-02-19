FROM node:18 AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY . .

RUN yarn build

FROM node:18 AS production

WORKDIR /app

COPY --from=build /app ./

EXPOSE 3000

CMD ["node", "./.output/server/index.mjs"]