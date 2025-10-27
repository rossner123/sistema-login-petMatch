    import express from "express"
    import dotenv from "dotenv"
    import cors from "cors"

    import login from "./routes/login.js"

    dotenv.config()

    const app = express()
    app.use(express.json())
    app.use(cors())

    app.use("/login", login)

    app.listen(3000, () => {
        console.log("Rodando...")
    })