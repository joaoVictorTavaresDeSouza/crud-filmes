async function buscarFilmes() {
    const resp = await fetch("http://localhost:3000/filmes")
    const filmes = await resp.json()

    const sectionFilmes = document.querySelector(".filmes")

    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
            <div>
                <h2>${filme.title}</h2>
                <p><strong>Gênero:</strong> ${filme.gender}</p>
                <p><strong>Duração:</strong> ${filme.duration} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${filme.classification}</p>
            </div>
        `
    })
}

buscarFilmes()
