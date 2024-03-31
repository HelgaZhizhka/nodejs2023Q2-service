# Home Library Service

## Prerequisites

- Node.js - Make sure you have Node.js version 18.0.0 or higher installed.

## Downloading

clone the repository

```
git clone https://github.com/HelgaZhizhka/nodejs2024Q1-service.git
cd nodejs2024Q1-service
```
Checkout on branch sprint_3

```
git checkout sprint_3
```

## Installing NPM modules

```
npm install
```

## Environment variables

Create `.env` file in the root of the project and copy everything from `.env.example` into it.

## Running application with Docker

To start the application and related services using Docker:

```
npm run docker:up
```

This command will create and start containers for the API and database using Docker Compose.

After running the command, the API will be available at `http://localhost:4000`.
  - **4000** - default port for API service
  - **5432** - default port for database service

Docker container is build on platform: linux/amd64

## Stopping Docker Containers

To stop and remove containers:

```
npm run docker:down
```
## Running application without Docker

To start the application without Docker you need to have PostgreSQL installed on your machine or use the Docker container for the database.

```
docker-compose up -d db
```
- change  POSTGRES_HOST=db to POSTGRES_HOST=localhost in .env file

- start prisma migrations local
  
```
npx prisma migrate deploy
```
Run the application:

```
npm run start:dev
```

After running the command, the API will be available at `http://localhost:4000`.

## Testing

After application running open new terminal and enter:

To run all tests without authorization. Run tests with starting the database and application:

```
npm run test
```

To run all tests with authorization. Run tests with starting the database and application:

```
npm run test:auth
```

To run only specific test suite with authorization_

```
npm run test:auth -- <path to suite>
```
To run refresh token test suite:

```
npm run test:refresh
```

For testing HTTPExceptions filter use get request on the following endpoint:

```
http://localhost:4000/test-error
```


## Scanning for Vulnerabilities

To scan for vulnerabilities in the project dependencies:

```
npm run scout
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Docker Hub

[Docker Hub Repository Application image](https://hub.docker.com/layers/helgazhyzhka/homelibrary-api/1.0.0-alpha.1/images/sha256-089435d62df12f69ca39554b0e963da8cf5b195a400570fbb0c6aec2a9623ff3?context=repo)

[Docker Hub Repository Database image](https://hub.docker.com/layers/helgazhyzhka/homelibrary-db/1.0.0-alpha.1/images/sha256-76bf5baf1ce75ec03ddd219ad3eb545d5a14c153d118c64e08da832b7752b8cd?context=repo)
