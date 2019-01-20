import * as fs from 'fs'
import * as path from 'path'
// location of the collections folders
const location = [ __dirname, 'db' ]
// will automatically load all the seeds from the collections folders
export const collections = fs
.readdirSync(path.resolve(...location))
.filter(file => fs.lstatSync(path.resolve(...location.concat(file))).isDirectory())
export const seeds = collections.map(folder => ({
  name: folder, documents: require(path.resolve(...location, folder)).seeds
}))