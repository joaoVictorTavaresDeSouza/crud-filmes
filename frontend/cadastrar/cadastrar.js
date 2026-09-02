async function cadastrarFilme() {
    const title = document.getElementById("title")
    const gender = document.getElementById("gender")
    const classification = document.getElementById("classification")
    const duration = document.getElementById("duration")

    if (title.value === "" || gender.value === "" || classification.value === "" || duration.value === "") {
        alert("Preencha todos os campos!")
        return  
    }

    const filme = {
        title: title.value,
        gender: gender.value,
        classification: classification.valueAsNumber,
        duration: duration.valueAsNumber
    }

    try {
        const resposta = await fetch("http://localhost:3000/criarfilme", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(filme)
        })

        const mensagem = await resposta.json()

        if (!resposta.ok) {
            alert(mensagem.message || "Não foi possível cadastrar o filme.")
            return
        }

        alert(mensagem.message)
        window.location.href = "../index.html"
    } catch (error) {
        console.error(error)
        alert("Não foi possível conectar ao servidor.")
    }
}