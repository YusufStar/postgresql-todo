import expres from "express"
import postgresClient from "../db.js"

const router = expres.Router()

router.post("", async (req, res) => {
    try {
        const text = `INSERT INTO todos (userid, title, description, complate) VALUES ($1, $2, $3, $4)`
        
        const values = [req.body.userid, req.body.title, req.body.description, req.body.complate]

        const data = await postgresClient.query(text, values)

        return res.status(201).json({message: "success"})
    } catch (error) {
        console.log("Error occures", error.message)
        return res.status(400).json({message: error.message})
    }
})

router.get("", async (req, res) => {
    try {
        const text = `SELECT * FROM todos WHERE userid = $1`
        
        const values = [req.body.userid]

        const {rows} = await postgresClient.query(text, values)

        return res.status(201).json(rows[0])
    } catch (error) {
        console.log("Error occures", error.message)
        return res.status(400).json({message: error.message})
    }
})

export default router