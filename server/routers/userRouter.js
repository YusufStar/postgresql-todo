import expres from "express"
import postgresClient from "../db.js"

const router = expres.Router()

router.post("", async (req, res) => {
    try {
        const text = `INSERT INTO users (email, password, fullname) VALUES ($1, crypt($2, gen_salt('bf')), $3)`
        
        const values = [req.body.email, req.body.password, req.body.fullname]

        const { rows } = await postgresClient.query(text, values)

        return res.status(201).json({createdUser: rows[0]})
    } catch (error) {
        console.log("Error occures", error.message)
        return res.status(400).json({message: error.message})
    }
})

router.post("/login", async (req, res) => {
    try {
        const text = "SELECT * FROM users WHERE email = $1 AND password = crypt($2, password)"

        const values = [req.body.email, req.body.password]

        const { rows } = await postgresClient.query(text, values)

        if(!rows.length)
            return res.status(404).json({message: "User not found"})
        
        return res.status(200).json({user: rows[0]})
    } catch (error) {
        
    }
})

export default router