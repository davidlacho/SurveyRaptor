if (process.env.NODE_ENV !== 'production') require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: {
      // LOGGED OUT THE DEV DB SO THAT WE CAN USE LIVE TOKENS
      // host: process.env.DB_DEV_HOST,
      // user: process.env.DB_DEV_USER,
      // password: process.env.DB_DEV_PASS,
      // database: process.env.DB_DEV_NAME,
      // port: process.env.DB_DEV_PORT,
      // ssl: process.env.DB_DEV_SSL,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      ssl: process.env.DB_SSL,
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      ssl: process.env.DB_SSL,
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

};
