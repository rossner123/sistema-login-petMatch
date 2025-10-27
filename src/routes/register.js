import pool from "../db.js"
import bcrypt from "bcrypt"
import { Router } from "express"
const router = Router()

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
