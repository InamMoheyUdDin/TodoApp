import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const db = new pg.Client({
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
}) 

db.connect();

export default db