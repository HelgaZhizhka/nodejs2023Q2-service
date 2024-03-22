FROM --platform=${BUILDPLATFORM} node:20.11.1 AS builder

WORKDIR /usr/app

COPY . .

RUN npm ci


FROM --platform=${BUILDPLATFORM} node:20.11.1-alpine AS development

WORKDIR /usr/app

COPY --from=builder /usr/app ./

COPY ./docker-entrypoint.sh ./docker-entrypoint.sh

RUN chmod +x ./docker-entrypoint.sh

ENTRYPOINT ["/usr/app/docker-entrypoint.sh"]

EXPOSE $APP_PORT