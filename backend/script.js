import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()

app.use(express.json())

app.use(cors())

app.get("/", (req,res) =>{
    res.json({
        message:"Servidor ta on, vai corinthians"
    })
})

app.post("/criarfilme", (req,res) =>{
    const {id, title, gender, duration, classification} = req.body

    const insertCommand = "INSERT INTO filmes_EmillyNonatoJoaoVictorTavares ( title, gender, duration, classification) VALUES (?,?,?,?)"

    sql.query(insertCommand,[title, gender, duration, classification],(error)=>{
        if (error) {
            console.log(error)
            return
        }
        res.status(201).json({
            message: "Filme criado com sucesso!"
        })
    })
})

app.get("/filmes", (req, res) => {
    const selectCommand = "SELECT * FROM filmes_EmillyNonatoJoaoVictorTavares"

    sql.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
            return
        }

        res.json(data)
    })
})

app.delete("/deletarfilme/:id", (req, res) => {
    const { id } = req.params

    const deleteCommand = "DELETE FROM filmes_EmillyNonatoJoaoVictorTavares WHERE id=?"

    sql.query(deleteCommand, [id], (error) => {
        if(error){
            console.log(error)
            return
        }

        res.status(201).json({
            message: "Filme apagado com sucesso"
        })
    })
})

app.put ("/editarfilme/:id", (req, res) => {
    const { id } = req.params
    const { title, gender, duration, classification } = req.body

    const updateCommand = "UPDATE filmes_EmillyNonatoJoaoVictorTavares SET title = ?, gender = ?, duration = ?, classification = ? WHERE id = ?"

    sql.query(updateCommand, [title, gender, duration, classification, id], (error) => {
        if (error) {
            console.log(error)
            return
        }

        res.json({
            message: "Filme alterado com sucesso!"
        })
    })
})

app.listen (3000, ()=>{
    console.log("Servidor Rodando na porta 3000")
})

const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MB"
})