# Unit4.Block34.Workshop.Reservations.Prisma

This activity guides you through building a simple CRUD API using Prisma and Express. It requires a basic understanding of relational database schemas, how to translate them into the equivalent [Prisma schemas](https://www.prisma.io/docs/concepts/components/prisma-schema), and how to [perform CRUD operations with Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client/crud).

## Overview

1. Define Prisma schema according to the provided database schema.
1. Write a seed script to initialize the database with Prisma Migrate.
1. Write Express routes that perform CRUD operations via Prisma Client.

## Database Schema

<img src="database_schema.svg" alt="schema" width="400"/>

## Instructions

### Initialize the Database

1. Fork and clone this repo. Work in your local repository!
1. Create a new Postgres database `reservations_db`
1. Install the Prisma CLI.\
   `npm install prisma --save-dev`
1. Initialize Prisma to use postgresql.\
   `npx prisma init --datasource-provider postgresql`
1. In the generated `.env` file, set `DATABASE_URL` to `"postgresql://USER:@localhost:5432/reservations_db"`\
   For Windows, use this connection:
   `"postgresql://USER:PASSWORD:@localhost:5432/reservations_db"`

   - USER is the name of your database user, e.g. janedoe
   - PASSWORD is the password for your database user

1. Add models to your `schema.prisma` file according to the database schema above.
1. Create and run the initial migration.\
   `npx prisma migrate dev --name init`
1. Explore the created database. You should see three empty models: `Customer`, `Restaurant` and `Reservation`.\
   `npx prisma studio`
1. If you made a mistake in your `schema.prisma`, instead of running another migration, you can instead use [`db push`](https://www.prisma.io/docs/guides/migrate/prototyping-schema-db-push) to sync your database with the schema. This is useful while _prototyping_.\
   `npx prisma db push`

### Seed the Database

1. Install Prisma Client, which we will use to interact with the database.\
   `npm install @prisma/client`
1. Create and export a new `PrismaClient` in `prisma/index.js`.
   ```js
   const { PrismaClient } = require("@prisma/client");
   const prisma = new PrismaClient();
   module.exports = prisma;
   ```
1. In `prisma/seed.js`, seed at least 4 customers and 3 restaurants into the database. Also seed at least 3 reservations.
   Refer to [the docs on how to create related records](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record).
   - a reservation belongs to a customer
   - a reservation belongs to a restaurant
   - a customer can have many reservations
   - a restaurant can have many reservations
   ```js
   const prisma = require("../prisma");
   const seed = async () => {
     // TODO: Create Customers, Restaurants and Reservations
   };
   seed()
     .then(async () => await prisma.$disconnect())
     .catch(async (e) => {
       console.error(e);
       await prisma.$disconnect();
       process.exit(1);
     });
   ```
1. Update `package.json` to configure Prisma's integrated seeding functionality.
   ```json
   "prisma": {
     "seed": "node prisma/seed.js"
   }
   ```
1. Use Prisma Migrate to completely reset and seed the database.\
   `npx prisma migrate reset`
   - Note: this is designed to be used in _development_ only! Another option is `npx prisma db seed`, but that will not clear existing data. `reset` is simpler to use (for now).
1. Confirm that the database is correctly seeded with authors and books.\
   `npx prisma studio`

### Serve the Data with Express

1. Install Express and create a server.
   - `npm install express morgan`
   - `npm install -D nodemon`
   - Add a script to your `package.json` file that starts your application:
   ```json
   "scripts": {
      "start:dev": "nodemon server.js"
   }
   ```
1. Create the following routes. These routes should use the [Prisma Client CRUD operations](https://www.prisma.io/docs/concepts/components/prisma-client/crud) to read and write from the database.
   - `GET /api/customers` - returns an array of customers
   - `GET /api/restaurants` - returns an array of restaurants
   - `GET /api/reservations` - returns an array of reservations
   - `POST /api/customers/:customerId/reservations` - has an object containing a valid restaurantId, date, and partyCount as the payload, and returns the created reservation with a status code of 201.
   - `DELETE /api/customers/:customerId/reservations/:id` - in the URL, gets passed the id of the reservation to delete and the customerId, and returns nothing with a status code of 204.
