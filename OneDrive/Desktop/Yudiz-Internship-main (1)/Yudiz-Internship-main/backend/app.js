const express = require('express')
const cors = require('cors')
const { db } = require('./db/db')
const app = express()
const Form = require('./models/Form.js')


require('dotenv').config()

const PORT = process.env.PORT

// middleware
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

// routes 

app.get('/hello', (req,res)=>{
    res.json("Hello")
})

app.post('/create-form', async (req, res) => {
    const { id,title, form, link } = req.body
    const formDoc = await Form.create({
        id,
        title,
        content: form,
        link
    })
    res.json(formDoc)
})

app.get('/form/:id', async (req, res) => {
    const { id } = req.params
    const data = await Form.find({id: id})
    res.json(data)
})

const server = ()=>{
    db()
    app.listen(PORT, ()=>{
        console.log("Listening to port:",PORT);
    })
}

server()