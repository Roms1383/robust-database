const { environment } = require('./built/api/environment')
const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = environment
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const program = require('commander')
const { Seeder } = require('mongo-seeding')
const logger = require('./logger')
const config = {
  database: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    name: DATABASE_NAME
  },
  dropDatabase: true,
}
const message = `will ${chalk.red('DROP')} then seed database ${chalk.red(config.database.name)} at ${chalk.green(config.database.host)}:${chalk.green(config.database.port)}`
const seeder = new Seeder(config)
// location of the collections folders
const location = [ __dirname, 'built', 'db' ]
// will automatically load all the seeds from the collections folders
const collections = fs
.readdirSync(path.resolve(...location))
.filter(file => fs.lstatSync(path.resolve(...location.concat(file))).isDirectory())
.map(folder => ({
  name: folder, documents: require(`./built/db/${folder}`).seeds
}))
const seed = async () => {
  try {
    logger.info('seeding database...')
    await seeder.import(collections)
    logger.info('seeded database successfully !')
  } catch (e) { logger.error(`error while seeding database :\n${e.toString()}`) }
}
const inquire = async () => inquirer
.prompt([
  {
    name: 'confirm',
    message,
    type: 'confirm',
    default: false
  }
])
const run = async () => {
  try {
    program
    .version('0.0.1')
    .option('-d, --drop', 'Automatically drop database without asking')
    .parse(process.argv)
  
    if (program.drop) {
      logger.info(message)
      await seed()
    }
    else {
      const answer = await inquire()
      if (answer.confirm) await seed()
    }
  } catch (e) {
    logger.error(`error while running script :\n${e.toString()}`)
  }
}
run()