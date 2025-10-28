import pool from "../src/db.js"
import bcrypt from "bcrypt"
import { Router } from "express"
const router = Router()

router.get("/", async (req, res) => {
  const sql = "SELECT * FROM users"
  const result = await pool.query(sql)
  res.json(result.rows)
})

router.post("/login", (req, res) => {
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

  router.post("/register", async (req, res) => {
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

  router.post("/forgot-password", async (req, res) => {
    const { newPassword, email } = req.body

    const hashed = await bcrypt.hash(newPassword, 10)

    const sql = 'UPDATE users SET password = $1 WHERE email = $2 RETURNING *'
    const result = await pool.query(sql, [hashed, email])
    if(result.rows.length === 0) {
      return res.status(404).json({ error: "erro: email não encontrado" })
    }

    res.status(201).json(result.rows[0])
  })

export default router