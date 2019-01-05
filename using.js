const { connect, uri } = require('./built/api/connect')
const chalk = require('chalk')
const logger = require('./logger')
const schema = {
  at: require('./built/db/at').schema,
  company: require('./built/db/company').schema,
}
const run = async () => {
  logger.info(`connect to ${uri}...`)
  const connection = await connect()
  logger.info('connected')
  const AT = connection.model('at', schema.at)
  const COMPANY = connection.model('company', schema.company)
  const ats = await AT.find({})
  logger.info(`documents in ${chalk.blue('at')}:\n${JSON.stringify(ats, null, 2)}`)
  const companies = {}
  companies.without = await COMPANY.find({})
  logger.info(`${chalk.bold('mere')} documents in ${chalk.blue('company')}:\n${JSON.stringify(companies.without, null, 2)}`)
  companies.with = await COMPANY.find({}).populate('at')
  logger.info(`${chalk.bold('populated')} documents in ${chalk.blue('company')}:\n${JSON.stringify(companies.with, null, 2)}`)
  process.exit(0)
}
run()