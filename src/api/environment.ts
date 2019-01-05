import yn from 'yn'
require('dotenv').config()
export const environment = {
  DATABASE_HOST: process.env.HOST || '127.0.0.1',
  DATABASE_PORT: +process.env.DATABASE_PORT || 27017,
  DATABASE_NAME: process.env.DATABASE_NAME || 'testing',
  SERVER_HOST: process.env.SERVER_HOST || '127.0.0.1',
  SERVER_PORT: +process.env.SERVER_PORT || 3000,
  SERVER_LOGGER: yn(process.env.SERVER_LOGGER) || false
}