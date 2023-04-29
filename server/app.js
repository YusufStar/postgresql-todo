import express from "express";
import  postgresClient from "./db.js"
import userRouter from "./routers/userRouter.js"
import todoRouter from "./routers/todoRouter.js"

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3333

app.use("/users", userRouter)
app.use("/todos", todoRouter)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    postgresClient.connect(err => {
        if(err) {
            console.log("connection err : " + err)
        } else {
            console.log("db connection successfull")
        }
    })
})