import * as boom from 'boom'
import { Connection, Schema } from "mongoose";
import { connect } from './connect'

export class Repository {
  private connection : Connection
  private name : string
  private schema : Schema
  constructor(name : string, schema : Schema) {
    this.name = name
    this.schema = schema
  }
  private async connect () {
    if (!this.connection) this.connection = await connect()
    return this.connection
  }
  public find = async (req, reply) => {
    try {
      const { id = undefined } = req.params
      const connection = await this.connect()
      const model = connection.model(this.name, this.schema)
      return id
      ? model.findById(id).lean(true)
      : model.find({}).lean(true)
    } catch (e) {
      throw boom.boomify(e)
    }
  }
  public create = async (req, reply) => {
    try {
      const { body: document } = req
      const connection = await this.connect()
      const model = connection.model(this.name, this.schema)
      return model.insertMany(document)
    } catch (e) {
      throw boom.boomify(e)
    }
  }
  public update = async (req, reply) => {
    try {
      const { id } = req.params
      const { body: document } = req
      const connection = await this.connect()
      const model = connection.model(this.name, this.schema)
      await model.findByIdAndUpdate(id, document)
      return model.findById(id)
    } catch (e) {
      throw boom.boomify(e)
    }
  }
  public delete = async (req, reply) => {
    try {
      const { id } = req.params
      const connection = await this.connect()
      const model = connection.model(this.name, this.schema)
      return model.findByIdAndDelete(id)
    } catch (e) {
      throw boom.boomify(e)
    }
  }
}