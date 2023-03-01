import {join, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {Low} from 'lowdb'
import {JSONFile} from '@/node_modules/lowdb/lib/adapters/JSONFile'
import {Tables} from "@/pages/api/app/interfaces"

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')
const adapter = new JSONFile<Tables>(file)
const db = new Low(adapter)

export default db

// import { LowSync, MemorySync } from 'lowdb'
// import { JSONFileSync } from '@/node_modules/lowdb/lib/node'
// import {Tables} from "@/pages/api/app/interfaces"

// const adapter = process.env.NODE_ENV === 'test' ? new MemorySync<Tables>() : new JSONFileSync<Tables>('db.json')

// const db = new LowSync(adapter)
// export default  db