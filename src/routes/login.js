import pool from "../db.js"
import bcrypt from "bcrypt"
import { Router } from "express"
const router = Router()

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