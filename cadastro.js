const urlBase = "http://159.65.228.63/"
const endpoint = "produtos"

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("form-tarefa")
    const btnCancelar = document.getElementById("cancelar")

    form.addEventListener("submit", async function (ev) {
        ev.preventDefault()

        let prioridade = document.getElementById("prioridade").value
        let descricao = document.getElementById("descricao").value.trim()
        let local = document.getElementById("local").value.trim()
        let recursosTxt = document.getElementById("recursos").value
        let dataLimite = document.getElementById("dataLimite").value
        let matricula = document.getElementById("matricula").value.trim()

        if (prioridade === "" || descricao === "" || local === "" || dataLimite === "" || matricula === "") {
            alert("Preencha todos os campos obrigatórios.")
            return
        }

        let listaRecursos = recursosTxt.split(",").map(r => r.trim())

        let tarefa = {
            prioridade: prioridade,
            descricao: descricao,
            local: local,
            recursosNecessarios: listaRecursos,
            dataLimite: dataLimite,
            matricula: matricula
        }

        try {
            let resp = await fetch(urlBase + endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tarefa)
            })

            if (resp.ok) {
                alert("Tarefa salva!")
                window.location.href = "index.html"
            } else {
                alert("Erro ao salvar no servidor.")
            }

        } catch (e) {
            alert("Erro ao enviar.")
        }
    })

    btnCancelar.addEventListener("click", () => {
        window.location.href = "index.html"
    })

})
