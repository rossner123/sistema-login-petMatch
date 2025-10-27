    import express from "express"
    import dotenv from "dotenv"
    import pool from "./db.js"
    import bcrypt from "bcrypt"
    import cors from "cors"

    dotenv.config()

    const app = express()
    app.use(express.json())
    app.use(cors())

    app.post("/register", async (req, res) => {
        const { name, email, password } = req.body
      
        try {
          const hash = await bcrypt.hash(password, 10)
          const result = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hash]
          )
          console.log("Usuário cadastro com sucesso!")
          res.status(201).json(result.rows[0])
        } catch (err) {
          console.error(err)
          res.status(500).json({ error: "Erro ao criptografar senha." })
        }
      })     
      
    app.post("/login", (req, res) => {
      const { email, password } = req.body

      const sql = 'SELECT * FROM users WHERE email = $1'
      pool.query(sql, [email], (err, results) => {
        if(err){
          return res.status(500).json({ error: "Usuário não encontrado."})
        }

        const user = results.rows[0]

        bcrypt.compare(password, user.password, (err, match) => {
          if (err) return res.status(500).json({ error: 'Erro ao verificar senha' })
          if (!match) return res.status(401).json({ error: 'Senha incorreta' })

          res.json({ message: 'Login realizado com sucesso' })
        })
      })

    })

    app.listen(3000, () => {
        console.log("Rodando...")
    })