import express from "express"
import mysql2 from "mysql2"
import cors from "cors"


const app = express()

app.use(express.json())

app.use(cors())

app.get("/", (req,res) =>{
    res.json({
        message:"Servidor ta on,chama bb"
    })
})

app.post("/criarfilme", (req,res) =>{
    const {id, titulo, genero, duracao, classificacaoEtaria} = req.body

    const insertCommand = "INSERT INTO filmes_GiovanaGouveaCinthiaKarolina ( titulo, genero, duracao, classificacaoEtaria) VALUES (?,?,?,?)"

    sql.query(insertCommand,[titulo, genero, duracao, classificacaoEtaria],(error)=>{
        if (error) {
            console.log(error)
            return
        }
        res.status(201).json({
            message: "Filme criado com sucesso!"
        })
    })
})

app.get("/todosfilmes", (req, res) => {
    const selectCommand = "SELECT * FROM filmes_GiovanaGouveaCinthiaKarolina"

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

    const deleteCommand = "DELETE FROM filmes_GiovanaGouveaCinthiaKarolina WHERE id=?"

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
    const { titulo, genero, duracao, classificacaoEtaria } = req.body

    const updateCommand = "UPDATE filmes_GiovanaGouveaCinthiaKarolina SET titulo = ?, genero = ?, duracao = ?, classificacaoEtaria = ? WHERE id = ?"

    sql.query(updateCommand, [titulo, genero, duracao, classificacaoEtaria, id], (error) => {
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
    console.log("Servidor On")
})


const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MB"
})