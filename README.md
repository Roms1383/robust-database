# purpose

This repository was created as a proof of concept for good practices when creating a Rest API to manage an underlying Mongo database in a Node.js environment.

## :sparkles: goals
*  _use strongly-typed data_
*  _quickly generate database with existing customizable data sets_
*  _assert Rest API and database operations_

### :pushpin: types

This project both defines data's [mongoose](https://github.com/Automattic/mongoose) schema definitions and [typescript](https://github.com/Microsoft/TypeScript) types to allow manipulating strongly-typed data (and also because, let's admit it, it's trendy :sweat_smile:). 

Another solution would have been to use the excellent library [typegoose](https://github.com/szokodiakos/typegoose).
> :cactus: _Please note that, at the time this documentation is written, typegoose yet doesn't support mongoose discriminators feature._

### :seedling: seeding

Database seeding automatically generate a database with documents created from the files `seeds.ts` defined in each collection folder under `src/db`, using [mongo-seeding](https://github.com/pkosiec/mongo-seeding).

This saves you the tedious task to have to manually create documents every time you want to run tests.
It also allows you to quickly add, modify or remove documents to the data sets and re-populate in no time.

### :repeat: api

Rest API routes are automatically generated by `routes.ts` from the collections in the `db` folder, using [fastify](https://github.com/fastify/fastify).

Each collection will automatically have the following routes :

| Method    | URI                   | Action                                  |
| ---       | ---                   | ---                                     |
| `GET`     | `/api/collection`     | find all the documents                  |
| `GET`     | `/api/collection/:id` | find a specific document by its `id`    |
| `POST`    | `/api/collection`     | create a new document                   |
| `PUT`     | `/api/collection/:id` | update a specific document by its `id`  |
| `DELETE`  | `/api/collection/:id` | delete a specific document by its `id`  |

As a side note, the API always returns plain objects (no fancy mongoose Documents).

### :white_check_mark: tests

Integration tests are defined in `index.test.ts` and run using [jest](https://github.com/facebook/jest).

At the time this documentation is written, only `at` collection is tested.

# project

## prerequisites

*  [Git](https://git-scm.com) installed
*  [Mongo DB](https://www.mongodb.com) installed & running
*  [Node.js](https://www.mongodb.com) installed

## installation

```shell
git clone https://github.com/Roms1383/robust-database.git
```
```shell
yarn install
```

## environment

You can add a `.env` file at the root of the project, in order to configure :
*  `DATABASE_HOST`: the host of the database
*  `DATABASE_PORT`: the port of the database
*  `DATABASE_NAME`: the name of the database
*  `SERVER_HOST`:   the host of the server
*  `SERVER_PORT`:   the port of the server
*  `SERVER_LOGGER`: whether or not to display server's logs

If not provided, the project will automatically be setup with the following defaults :
```env
DATABASE_HOST="127.0.0.1"
DATABASE_PORT=27017
DATABASE_NAME="testing"
SERVER_HOST="127.0.0.1"
SERVER_PORT=3000
SERVER_LOGGER=false
```

## available commands

*  `build` : build the TypeScript files into a `built` folder
   *  execute **tsc** command
*  `seed` : seed the Mongo DB from the `seeds.ts` located in the collections folders
   *  execute `build` command
   *  execute **seeding.js** file
   option : `-d` / `--drop` will automatically drop any former existing database without asking confirmation first
*  `use` : execute a set of database commands as an example
   *  execute `seed` command
   *  execute **using.js** file
*  `server` : dynamically deploy the server
   *  execute **server.js** file
*  `serve`
   *  execute `seed` command
   *  execute `server` command
*  `test` : run  integration tests
   *  execute `seed` command
   *  execute **jest** command

