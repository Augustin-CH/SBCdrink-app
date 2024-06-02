# Étape de build
FROM node:20 AS build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:20 AS development

WORKDIR /app
COPY . .
COPY --from=build /app/node_modules ./node_modules
RUN yarn global add nodemon
EXPOSE 3000
CMD ["sleep", "infinity"]

FROM node:20 AS production

WORKDIR /app
COPY --from=build /app/build ./build
COPY ./docker/env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh
RUN yarn global add serve
EXPOSE 3000
CMD ["sh", "/docker-entrypoint.d/env.sh"]