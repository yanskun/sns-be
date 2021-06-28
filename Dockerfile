FROM node:16-alpine3.11
ENV APP_ROOT /app/

WORKDIR $APP_ROOT

COPY package.json yarn.lock $APP_ROOT
RUN yarn install

COPY . $APP_ROOT
