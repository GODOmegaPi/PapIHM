# Devpot - Backend

> or main-service

## Description

A NodeJS RESTful API with mongoDB for the devpot project.
It handle the management of the `Projects`,  `devlogs`, `Accounts` and `Comments` 

## Requirements

- [NodeJS](https://nodejs.org/en/) >= v13.0.1
   Usage of the `fs.mkdir()`
- [MongoDB](https://docs.mongodb.com/manual/installation/) >= v3.6.3

## Installation

1. Clone the repo `git clone https://gitlab.com/digitalpatate/devpot-main-service`
2. Go in the folder `cd devpot-main-service` run an `npm install`
3. create a `.env` file with the environment variables see the section below
4. Run it with `npm start`

### Or with docker

1. Update if needed the environment variables set in `Dockerfile`
2. `docker build -t <tag> .`
3. `docker run -d <tag> `

You'll need to bind your local port to the port specified in the `Dockerfile` file 

## Environment variables

- DB_URL: The url of the mongoDB instance
- DB_PORT: The port of the mongoDB instance
- DB_NAME: The database name
- PORT: The port where the app will listen
- NODE_ENV: The mode of the application if not specified it will run with `dev` default  value. The possible value can be `dev`, `test`, or whatever for production mode.
- UPLOAD_PATH: A writable path where to store uploaded files
- JWT_SECRET: The secret jwt key to verify signature, should be shared with the app who create this token 
- SWAGGER_BASEPATH: The api base path configuration for Swagger, It's used when the base path is different then the actual url. In our case when we run it with traefik. With the url rewriting the base path is different.


## Documentation

Once running, you can access to detailed documentation created with Swagger and openApi, on `/api-docs`

```
/!\ Warning /!\ With the deadline approching the Swagger configuration has not been updated with the latest features and bug fixes, some routes has changed.
```

## Database schema

### Devlog

| Name               | Type     | Unique | Required |
| ------------------ | -------- | ------ | -------- |
| identifier         | ObjectId | X      | X        |
| slug               | String   | X      | X        |
| title              | String   |        | X        |
| content            | String   |        | X        |
| creation date      | Date     |        | X        |
| project identifier | ObjectId |        | X        |

### Project

| Name        | Type     | Unique | Required |
| ----------- | -------- | ------ | -------- |
| identifier  | ObjectId | X      | X        |
| slug        | String   | X      | X        |
| title       | String   |        | X        |
| description | String   |        | X        |
| image       | Date     |        |          |
| owner       | ObjectId |        | x        |

### Account

| Name       | Type           | Unique | Required |
| ---------- | -------------- | ------ | -------- |
| identifier | ObjectId       | X      | X        |
| user       | ObjectId       | X      | X        |
| email      | String         | X      | x        |
| firstname  | String         |        | X        |
| lastname   | String         |        |          |
| biography  | String         |        |          |
| favorites  | ObjectId Array |        |          |

### Comment


| Name          | Type                                                 | Unique | Required |
| ------------- | ---------------------------------------------------- | ------ | -------- |
| identifier    | ObjectId                                             | X      | X        |
| author        | ObjectId                                             | X      | X        |
| creation date | Date                                                 | X      | x        |
| content       | String                                               |        | X        |
| parent        | ObjectId (Project or Comment with dynamic reference) |        |          |
| responses []  | ObjectId                                             |        |          |