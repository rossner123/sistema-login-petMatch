    import express from "express"
    import dotenv from "dotenv"
    import cors from "cors"

    import users from "../routes/users.js"

    dotenv.config()

    const app = express()
    app.use(express.json())
    app.use(cors())

    app.use("/users", users)

    app.listen(3000, () => {
        console.log("Rodando...")
    })