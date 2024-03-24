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

To run only one of all test suites

```
npm run test -- -t 'suite name'
```

To run all test with authorization. Run tests with starting the database and application:

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- -t 'suite name'
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

Debugging in VSCode

To debug the application in VSCode, you can use the provided launch configuration. Open the Debug panel in VSCode and select the "Debug Application" configuration.
Press F5 to start the application in debug mode.

## Docker Hub

[Docker Hub Repository Application image]()

[Docker Hub Repository Database image]()
