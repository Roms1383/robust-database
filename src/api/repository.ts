import * as boom from 'boom'
import { Model, Document } from "mongoose";

export class Repository {
  private model : Model<Document>
  constructor(model : Model<Document>) {
    this.model = model
  }
  public find = async (req, reply) => {
    try {
      const { id = undefined } = req.params
      return id
      ? this.model.findById(id).lean(true)
      : this.model.find({}).lean(true)
    } catch (e) {
      throw boom.boomify(e)
    }
  }
  public create = async (req, reply) => {
    try {
      const { body: document } = req
      return this.model.insertMany(document)
    } catch (e) {
      throw boom.boomify(e)
    }
  }
  public update = async (req, reply) => {
    try {
      const { id } = req.params
      const { body: document } = req
      await this.model.findByIdAndUpdate(id, document)
      return this.model.findById(id)
    } catch (e) {
      throw boom.boomify(e)
    }
  }
  public delete = async (req, reply) => {
    try {
      const { id } = req.params
      return this.model.findByIdAndDelete(id)
    } catch (e) {
      throw boom.boomify(e)
    }
  }
}