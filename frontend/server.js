async function buscarFilmes() {
    const resp = await fetch("http://localhost:3000/todosfilmes")
    const filmes = await resp.json()

    const sectionFilmes = document.querySelector(".filmes")

    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
            <div>
                <h2>${filme.titulo}</h2>
                <p><strong>Gênero:</strong> ${filme.genero}</p>
                <p><strong>Duração:</strong> ${filme.duracao} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${filme.classificacaoEtaria}</p>
            </div>
        `
    })
}

buscarFilmes()
