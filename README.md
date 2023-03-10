# ecommerce-app-legends-bn-   ![check-code-coverage](https://img.shields.io/badge/code--coverage-96.15%25-brightgreen) [![Node.js CI](https://github.com/atlp-rwanda/ecommerce-app-legends-bn/actions/workflows/node.js.yml/badge.svg)](https://github.com/atlp-rwanda/ecommerce-app-legends-bn/actions/workflows/node.js.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/92c706fad38b90146d03/maintainability)](https://codeclimate.com/github/atlp-rwanda/ecommerce-app-legends-bn/maintainability) [![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)
## Introduction

This is the initial setup for the project, `ecommerce-app-legends-bn-`

## Index

- [Usage](#usage)
  - [Installation](#installation)
- [Development](#development)
  - [Pre-Requisites](#pre-requisites)
  - [File Structure](#file-structure)

- [Community](#community)
  - [Contribution](#contribution)
  - [Branches](#branches)

- [License](#license)

### Usage

This is the Full Ecommerce App that should be used for the whole world for prodcts purchasing.

### Installation

- install [Docker](https://www.docker.com/) and docker-compose as well  // if you want to run app in docker
- clone the project `git clone `;
- go into cloded project's root directory
- run `npm install` for installing dependencies
- copy .env.example to .env and set PORT and other environment variables
- run `npm run dev` for development
- access the project on your local machine ```ie``` : => `127.0.0.1:$port` 

###  Run app in Docker

 Having Docker installed is a prerequisite

 - configure the environment variables in `env` according to `.env.example`

  ```bash
    PORT=Node_exposed_port => port the app will run from
    And the rest go postgresql database:
    DB_USER=postgres_username
    DB_PASSWORD=postgres_password
    DB_NAME=postgres_database
    DB_PORT=postgres_port
 ```

 ### Start app in Docker: 

- run `npm run docker:compose:up` : To build and start app in Docker
- run `npm run docker:compose:clean` : To stop containers and clean up
- Wait the images to build & pull and be ready, ...
- Then access the project on your on port `PORT` and
- routes *api/users/all* : `GET`
- routes *api/users/add* : `POST`

## Documentation 
 
`127.0.0.1:$port`/docs and boooom. The project setup is all well set up

### Development

- for development , push the project to the your own repository

### Pre-Requisites

- Nodejs version 18.x
- OS X 
- Docker installed on your machine

### File Structure

- `locales:` This folder contains all the translation files for the application to use multiple languages.
- `src:` This folder contains all the source code of the application.
--  `api:` This folder contains all the API routes.
--  `config:` This folder contains configuration files for the application.
--  `controllers:` This folder contains the business logic of the application.
--  `models:` This folder contains the data models of the application.
--  `middlewares:` This folder contains all the middleware functions for the application.
--  `migration:` This folder contains table schema for the database.
--  `seeders:` This folder contains  sample data for  tables exist in the database.
--  `.env.example:` This file contain sample data for .env file.
--  `.sequelizerc:` This file contains configuration of database components.
--  `utils:` This folder contains all the utility functions for the application.
-- `docs:` This folder contains all the documentation files for the application.
- `node_modules:` This folder contains all the installed dependencies for the application.
- `package.json:` This file contains the metadata of the application and its dependencies.
- `README.md:` This file contains the documentation of the application.

### Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

### Branches

- main 
- ch-project-initialization
- ch-setup-database
- develop

### License