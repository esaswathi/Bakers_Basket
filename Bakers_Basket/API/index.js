import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'


const app = express()
dotenv.config()

app.get('*' ,(req,res) => {
    res.send("App started")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App started at port ${port}`)
})