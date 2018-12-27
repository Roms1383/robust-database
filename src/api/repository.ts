import { schema } from "../at"
import * as boom from 'boom'
import { connect } from "./connect";

export class Repository {
  public async find (req, reply) {
    try {
      const { id = undefined } = req.params
      const connection = await connect()
      const model = connection.model('at', schema)
      return id
      ? model.findById(id).lean(true)
      : model.find({}).lean(true)
    } catch (e) {
      throw boom.boomify(e)
    }
  }
  public async create (req, reply) {
    try {
      const { body: document } = req
      const connection = await connect()
      const model = connection.model('at', schema)
      return model.insertMany(document)
    } catch (e) {
      throw boom.boomify(e)
    }
  }
  public async update (req, reply) {
    try {
      const { id } = req.params
      const { body: document } = req
      const connection = await connect()
      const model = connection.model('at', schema)
      await model.findByIdAndUpdate(id, document)
      return model.findById(id)
    } catch (e) {
      throw boom.boomify(e)
    }
  }
  public async delete (req, reply) {
    try {
      const { id } = req.params
      const connection = await connect()
      const model = connection.model('at', schema)
      return model.findByIdAndDelete(id)
    } catch (e) {
      throw boom.boomify(e)
    }
  }
}
