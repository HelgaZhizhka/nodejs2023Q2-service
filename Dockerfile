FROM --platform=$BUILDPLATFORM node:18 AS builder

WORKDIR /usr/app

COPY . .

RUN npm ci


FROM --platform=$BUILDPLATFORM node:18-alpine AS development

ARG TARGETPLATFORM
ARG BUILDPLATFORM
RUN echo "Running on $BUILDPLATFORM, building for $TARGETPLATFORM" > /log

WORKDIR /usr/app

COPY --from=builder /usr/app /usr/app

COPY ./docker-entrypoint.sh ./docker-entrypoint.sh

RUN chmod +x ./docker-entrypoint.sh

ENTRYPOINT ["/usr/app/docker-entrypoint.sh"]

EXPOSE $APP_PORT