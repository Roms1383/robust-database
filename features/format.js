const { ObjectID } = require('bson')
module.exports = document => Object.keys(document)
.reduce((object, key) => document[key] instanceof ObjectID
? { ...object, [key]: document[key].toString() }
: { ...object, [key]: document[key] }
, {})
