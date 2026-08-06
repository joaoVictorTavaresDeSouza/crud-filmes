const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());

const banco = mysql.createConnection({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MB"
});

banco.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar:");
        console.log(erro);
        return;
    }

    console.log("Banco conectado!");
});

app.post("/filmes", (req, res) => {

    const { title, gender, duration, classification } = req.body;

    const sql = `
        INSERT INTO filmes_EmillyNonatoJoaoVictorTavares
        (title, gender, duration, classification)
        VALUES (?, ?, ?, ?)
    `;

    banco.query(
        sql,
        [title, gender, duration, classification],
        (erro, resultado) => {

            if (erro) {
                res.status(500).json(erro);
                return;
            }

            res.json({
                mensagem: "Filme cadastrado!",
                id: resultado.insertId
            });

        }
    );

});

app.get("/filmes", (req, res) => {

    const sql = `
        SELECT * FROM filmes_EmillyNonatoJoaoVictorTavares
    `;

    banco.query(sql, (erro, resultado) => {

        if (erro) {
            res.status(500).json(erro);
            return;
        }

        res.json(resultado);

    });

});

app.put("/filmes/:id", (req, res) => {

    const id = req.params.id;

    const {
        title,
        gender,
        duration,
        classification
    } = req.body;

    const sql = `
        UPDATE filmes_EmillyNonatoJoaoVictorTavares
        SET
            title=?,
            gender=?,
            duration=?,
            classification=?
        WHERE id=?
    `;

    banco.query(
        sql,
        [title, gender, duration, classification, id],
        (erro, resultado) => {

            if (erro) {
                res.status(500).json(erro);
                return;
            }

            res.json({
                mensagem: "Filme atualizado!"
            });

        }
    );

});

app.delete("/filmes/:id", (req, res) => {

    const id = req.params.id;

    const sql = `
        DELETE FROM filmes_EmillyNonatoJoaoVictorTavares
        WHERE id=?
    `;

    banco.query(sql, [id], (erro) => {

        if (erro) {
            res.status(500).json(erro);
            return;
        }

        res.json({
            mensagem: "Filme removido!"
        });

    });

});


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});