import { Pool } from "pg"

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "root",
    port: 5432
})

pool.connect((err, client, release) => {
    if(err) {
        console.error("error: " + err)
    }

    console.log("Database conectado com sucesso!")
    release();
})

export default pool
