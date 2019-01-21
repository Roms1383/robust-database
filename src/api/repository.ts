import * as boom from 'boom'
import { Document, Model } from 'mongoose'

export class Repository {
  private model : Model<Document>
  constructor(model : Model<Document>) {
    this.model = model
  }
  public find = async (req, reply) : Promise<Object[]|null|Error> => {
    try {
      const { id } = req.params
      return id
      ? this.model.findById(id).lean(true)
      : this.model.find({}).lean(true)
    } catch (e) {
      throw boom.boomify(e)
    }
  }
  public create = async (req, reply) : Promise<Object[]|Error> => {
    try {
      const { body: document } = req
      const inserted = await this.model.insertMany([document])
      return inserted.map(document => document.toObject())
    } catch (e) {
      throw boom.boomify(e)
    }
  }
  public update = async (req, reply) : Promise<Object|Error> => {
    try {
      const { id } = req.params
      const { body: document } = req
      const m = new this.model(document)
      const error = m.validateSync()
      if (error) { throw error }
      await this.model.findByIdAndUpdate(id, document)
      return this.model.findById(id).lean(true)
    } catch (e) {
      throw boom.boomify(e)
    }
  }
  public delete = async (req, reply) : Promise<Object|Error> => {
    try {
      const { id } = req.params
      return this.model.findByIdAndDelete(id).lean(true)
    } catch (e) {
      throw boom.boomify(e)
    }
  }
}
