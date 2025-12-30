# 🚀 Logs API Microservice

##Deployed on Render
https://imoli-logs-api.onrender.com/

## Features
- MongoDB + TypeScript + Express
- Auth middleware (admin access, reac/create permissions)
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

[Uploading Imoli.postman_collection.json…]()


