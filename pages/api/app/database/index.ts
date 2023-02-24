import {join, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {Low} from 'lowdb'
import {JSONFile} from 'lowdb/node'
import {Tables} from '../interfaces';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')
const adapter = new JSONFile<Tables>(file)
const db = new Low(adapter)

export default db
