FROM node:20.11.1 AS builder 

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

RUN npx prisma generate


FROM node:20.11.1-alpine AS development

WORKDIR /usr/app

COPY --from=builder /usr/app /usr/app/

RUN chmod +x ./docker-entrypoint.sh

ENTRYPOINT ["/usr/app/docker-entrypoint.sh"]

EXPOSE $APP_PORT