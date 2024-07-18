import {join, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {Low} from 'lowdb'
import {JSONFile} from '@/node_modules/lowdb/lib/adapters/JSONFile'
import {Tables} from "@/pages/api/app/interfaces"

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = process.env.NODE_ENV === "production"
    ? join("/tmp/db.json")
    : join(__dirname, "db.json")
const adapter = new JSONFile<Tables>(file)
const db = new Low(adapter)

export default db
