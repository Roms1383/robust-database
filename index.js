const { schema } = require('./built/definitions/at')
module.exports = async connection => ({
  At: connection.model('at', schema)
})
