# 🚀 Logs API Microservice
Recruitment task solution implementing secure Logs API microservice with authentication, MongoDB integration, and full endpoint coverage (logs listing, UUID lookup, date filtering, admin user creation). Features TypeScript + Express architecture with permission middleware, automatic seeding from users.json and events.log parsing, deployed on Render with Docker dev/test environments. Includes Jest tests, structured logging, and error handling meeting all task requirements.

## Deployed on Render
https://imoli-logs-api.onrender.com/

## Available endpoints
- **logs**: `GET /public/logs - All logs`
- **single_log**: `GET /public/logs/:uuid - Single log with UUID`
- **timestamp_log**: `GET /public/logs?from=timestamp&to=timestamp - Logs with date`
- **user-create**: `POST /internal/users - Create user (admin only)`

## Features
- MongoDB + TypeScript + Express
- Auth middleware (admin access, read/create permissions)
- Seeding database with users.json
- Parsing events.log and seeding
- Docker + docker-compose (dev & test)
- Jest tests
- Internal logging all auth requests

## Local
`yarn install`

### Development
`docker-compose up app`

### Tests
`yarn test`

## Docker

### Development
`docker-compose up app`

### Tests
`docker-compose -f docker-compose.test.yml up test`

### Postman Collection
Postman collection available in project files
