const winston = require('winston')
const format = winston.format.combine(winston.format.colorize(), winston.format.simple())
const CONSOLE = new winston.transports.Console()
const logger = winston.createLogger({ transports: [ CONSOLE ], format })
module.exports = logger
