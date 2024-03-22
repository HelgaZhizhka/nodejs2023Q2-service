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

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Docker Hub

[Docker Hub Repository Application image](https://hub.docker.com/layers/helgazhyzhka/homelibrary-api/latest/images/sha256-de83ce36bcd8b051f1fc0327912c22243105a80655a850dd61c4afcac82cc1b0?context=repo)

[Docker Hub Repository Database image](https://hub.docker.com/layers/helgazhyzhka/homelibrary-db/latest/images/sha256-ab2aee137b0dad9c54fab53ad5ee3f143ccccb516f08405431b8de574b89410c?context=repo)