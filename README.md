# Home Library Service

## Prerequisites

- Node.js - Make sure you have Node.js version 18.0.0 or higher installed.

## Downloading
clone the repository form branch sprint_2

```
git clone https://github.com/HelgaZhizhka/nodejs2024Q1-service.git
cd nodejs2024Q1-service
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

## Stopping Docker Containers

To stop and remove containers:
  
```
npm run docker:down
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization. Run tests with starting the database and application:

```
npm run test
```
or
```
npm run docker:test
```

## Scanning for Vulnerabilities

To scan for vulnerabilities in the project dependencies:

```
npm run scout
```

## Docker build 

To build the application and database images:

```
npm run docker:build
```

## Docker deploy

To deploy the application and database images:

```
npm run docker:deploy
```

## Docker pull

To pull the application and database images:

```
npm run docker:pull
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Docker Hub

[Docker Hub Repository Application image](https://hub.docker.com/layers/helgazhyzhka/homelibrary-api/latest/images/sha256-12cc40a45207e39d60bb8a767de90151419055c5d2b11519649470f787d3c53b?context=repo)

[Docker Hub Repository Database image](https://hub.docker.com/layers/helgazhyzhka/homelibrary-db/latest/images/sha256-c2af410a344bbc748f9bc23492af2d9288628a2c00d7e59329cfee5d482a61e3?context=repo)