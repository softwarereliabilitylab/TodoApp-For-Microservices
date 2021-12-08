FROM node:lts-alpine AS Builder

COPY ./ /BoardApi

WORKDIR /BoardApi

RUN yarn install && yarn build

FROM node:lts-alpine AS APP

EXPOSE 3000

ENV TYPEORM_CONNECTION="postgres"
ENV TYPEORM_HOST="boarddb"
ENV TYPEORM_USERNAME="boardapi"
ENV TYPEORM_PASSWORD="boardapi"
ENV TYPEORM_DATABASE="boardapi"
ENV TYPEORM_PORT="5432"
ENV TYPEORM_SYNCHRONIZE="true"
ENV TYPEORM_LOGGING="false"
ENV TYPEORM_ENTITIES="dist/**/*.entity.js"
ENV TYPEORM_MIGRATIONS="dist/migration/**/*.js"

COPY --from=Builder /BoardApi/dist /BoardApi/dist
COPY --from=Builder /BoardApi/node_modules /BoardApi/node_modules

WORKDIR /BoardApi

CMD [ "node","dist/main" ]