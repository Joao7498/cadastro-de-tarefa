const urlBase = "http://159.65.228.63/"
const endpoint = "produtos"

function formatarData(data) {
    if (!data) return ""
    let d = new Date(data)
    return d.toLocaleDateString("pt-BR")
}

async function montarLista() {
    let lista = document.getElementById("lista-tarefas")

    let tarefas = []

    try {
        let resp = await fetch(urlBase + endpoint)
        tarefas = await resp.json()
    } catch (e) {
        lista.innerHTML = "<p>Erro ao carregar</p>"
        return
    }

    if (!tarefas || tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada</p>"
        return
    }

    let tabela = document.createElement("table")

    tabela.innerHTML = `
        <tr>
            <th>Prioridade</th>
            <th>Descrição</th>
            <th>Local</th>
            <th>Recursos</th>
            <th>Data Limite</th>
            <th>Matrícula</th>
        </tr>
    `

    tarefas.forEach(t => {
        let tr = document.createElement("tr")

        if (t.prioridade === "Urgente") {
            tr.classList.add("prioridade-urgente")
        }

        tr.innerHTML = `
            <td>${t.prioridade}</td>
            <td>${t.descricao}</td>
            <td>${t.local}</td>
            <td>${Array.isArray(t.recursosNecessarios) ? t.recursosNecessarios.join(", ") : ""}</td>
            <td>${formatarData(t.dataLimite)}</td>
            <td>${t.matricula}</td>
        `

        tabela.appendChild(tr)
    })

    lista.innerHTML = ""
    lista.appendChild(tabela)
}

montarLista()

