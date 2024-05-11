FROM node:20 AS build

WORKDIR /app

COPY . /app

RUN yarn install

FROM build AS development

RUN yarn global add nodemon

CMD ["sleep", "infinity"]

FROM build AS production

RUN yarn global add serve

RUN yarn build

ENTRYPOINT ["node", "build/app.js"]
