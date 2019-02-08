import * as boom from 'boom'
import { Document, Model, Connection, Schema } from 'mongoose'

export class Repository {
  private model : Model<Document>
  private connection : Connection
  private virtuals : any[]
  constructor(connection : Connection, schema : Schema, name : string, virtuals : any[]) {
    this.connection = connection
    this.model = connection.model(name, schema)
    this.virtuals = virtuals
  }
  public find = async (req, reply) : Promise<Object[]|null|Error> => {
    const { id } = req.params
    return id
    ? this.model.findById(id).lean(true)
    : this.model.find({}).lean(true)
  }
  public create = async (req, reply) : Promise<Object[]|Error> => {
    try {
      const { body: document } = req
      const [found = undefined] = await this.model.find(document).lean(true)
      if (found) throw boom.conflict(`document already exists: ${JSON.stringify(found)}`)
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
      if (error) throw error
      if (this.virtuals) {
        for (const { ref, localField, foreignField } of this.virtuals) {
          const related = this.connection.model(ref)
          const found = await related.find({ [foreignField]: document[localField] })
          if (found.length === 0) throw boom.badData(`${localField} doesn't exists in ${ref}`)
        }
      }
      await this.model.findByIdAndUpdate(id, document)
      return this.model.findById(id).lean(true)
    } catch (e) {
      throw boom.boomify(e)
    }
  }
  public delete = async (req, reply) : Promise<Object|Error> => {
    try {
      const { id } = req.params
      const deleted = await this.model.findByIdAndDelete(id).lean(true)
      if (!deleted) throw boom.notFound(`document doesn't exist`)
      return deleted
    } catch (e) {
      throw boom.boomify(e)
    }
  }
}
