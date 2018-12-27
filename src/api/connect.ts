import * as mongoose from 'mongoose'
require('dotenv').config()
const uri = `mongodb://${process.env.HOST}:${process.env.PORT}/${process.env.NAME}`
export const connect = async () : Promise<mongoose.Connection> => mongoose.createConnection(uri, { useNewUrlParser: true })