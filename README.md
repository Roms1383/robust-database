# purpose

This repository was created as a proof of concept for good practices when creating a http API to manage an underlying Mongo database.

# seeding

Will automatically generate a database with documents created from the files `seeds.ts` defined in each collection folder under `src/db`.
This saves you the tedious task to have to manually create documents every time you want to run tests.
It also allows you to quickly add, modify or remove documents and re-populate in no time.

# api

The Rest API routes are automatically generated from the collections in the `src/db` folder.
Each collection will automatically have the following routes :
*  `GET`    - `/api/collection`       find all the documents
*  `GET`    - `/api/collection/:id`   find a specific document by its `id`
*  `POST`   - `/api/collection`       insert a new document
*  `PUT`    - `/api/collection/:id`   update a specific document by its `id`
*  `DELETE` - `/api/collection/:id`   delete a specific document by its `id`

# tools of the trade

This project uses, among others :
*  `mongoose` ORM to manage Mongo DB
*  `fastify`  server
*  `jest`     unit-tests

# installation

```shell
git clone https://github.com/Roms1383/robust-database.git
```

# environment

You can add a `.env` file at the root of the project, in order to configure :
*  `DATABASE_HOST`: the host of the Mongo database (in this example localhost)
*  `DATABASE_PORT`: the port of the Mongo database (in this example default Mongo port)
*  `DATABASE_NAME`: the name of the Mongo database
*  `SERVER_HOST`:   the host of the fastify server (in this example localhost)
*  `SERVER_PORT`:   the port of the fastify server (in this example default fastify port)
*  `SERVER_LOGGER`: whether or not to display fastify server's logs

If not provided, the project will automatically be setup with the following defaults :
```env
DATABASE_HOST="127.0.0.1"
DATABASE_PORT=27017
DATABASE_NAME="testing"
SERVER_HOST="127.0.0.1"
SERVER_PORT=3000
SERVER_LOGGER=false
```

# available commands

*  `build`
   *  build the TypeScript files into a `built` folder
*  `seed`
   *  execute `build` command
   *  seed the Mongo DB with the seeds located in the collections folders
   *  option : `-d` / `--drop` will automatically drop any former existing database without asking confirmation first
*  `use`
   *  execute `seed` command
   *  execute a set of `mongoose` commands as an example
*  `server`
   *  deploy the API dynamically from the collections folders
*  `serve`
   *  execute `seed` command
   *  execute `server` command
*  `test`
   *  execute `seed` command
   *  run `jest` integration tests

