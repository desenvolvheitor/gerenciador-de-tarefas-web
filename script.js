// Definição da classe tarefa
class Tarefa {
    constructor(titulo, status, dataEstimativa, descricao) {
        this.titulo = titulo.trim();
        this.status = status;
        this.dataCriacao = new Date();
        this.dataAtualizacao = null;
        this.dataEstimativa = dataEstimativa;
        this.descricao = descricao.trim();
    }
}

// Criação da lista de tarefas
let listaTarefas = [];

// Definição de variável para a tarefa que será editada
let indiceEdicao = null;

// Definição de variável para o modal de nova tarefa 
const modalNovaTarefa = document.querySelector(".modal-nova-tarefa");

// Definição de variável para os botões de status
const botoesStatus = document.querySelectorAll(".botao-status");

// Definição de variável para os botões de filtro de status
const botoesFiltro = document.querySelectorAll(".botao-filtro");

// Definição do filtro de status como "Todas" por padrão ao carregar a página
botoesFiltro[0].classList.add("botao-filtro-ativo")

renderizarTarefas();

function botaoStatusAtivo(){
    return modalNovaTarefa.querySelector(".botao-status-ativo");
}

function botaoFiltroAtivo(){
    return document.querySelector(".botao-filtro-ativo");
}

function tarefasFiltradas(){
    return listaTarefas.filter(tarefa => tarefa.status == botaoFiltroAtivo().getAttribute("data-filtro") || botaoFiltroAtivo().getAttribute("data-filtro") == "Todas");
}

function exibirNotificacao(tipo, tituloTarefa = "", status = "") {
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container)
    }

    let tituloNotificacao = "";
    let textoNotificacao = "";
    let iconeNotificacao = "";

    switch(tipo) {
        case "exclusaoIndividual":
            iconeNotificacao = "❌";
            tituloNotificacao = "Tarefa excluída";
            textoNotificacao = `A tarefa "${tituloTarefa}" foi excluída com sucesso.`;
            break;

        case "exclusaoGlobal":
            iconeNotificacao = "❌";
            tituloNotificacao = "Tarefas excluídas";
            textoNotificacao = `Todas as tarefas foram excluídas com sucesso.`;
            break;

        case "exclusaoStatus":
            iconeNotificacao = "❌";
            tituloNotificacao = "Tarefas excluídas";
            textoNotificacao = `Todas as tarefas com o status "${status}" foram excluídas com sucesso.`;
            break;

        case "criacaoTarefa":
            iconeNotificacao = "✅";
            tituloNotificacao = "Tarefa criada";
            textoNotificacao = `A tarefa "${tituloTarefa}" foi criada com sucesso.`;
            break;

        case "edicaoTarefa":
            iconeNotificacao = "✏️"   
            tituloNotificacao = "Tarefa editada";
            textoNotificacao = `A tarefa "${tituloTarefa}" foi atualizada com sucesso.`;
            break;

        default:
            console.log("Erro: o tipo informado na função de notificação é inválido!");
            break;
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
    <span style="font-size: 24px;">${iconeNotificacao}</span>
    <div>
        <h4>${tituloNotificacao}</h4>
        <p style="font-size: 14px; color: #666;">${textoNotificacao}</p>
    </div>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(20px)";
        toast.style.transition = "0.5s";
        setTimeout(() => toast.remove(), 500);
    }, 4000)
}

// Abrir, fechar e salvar modal de nova tarefa
const botaoNovaTarefa = document.querySelector(".botao-nova-tarefa");
function abrirModalNovaTarefa() {
    if (indiceEdicao == null) {
        modalNovaTarefa.querySelector(".botao-status").classList.add("botao-status-ativo");
    }
    modalNovaTarefa.showModal();
}
botaoNovaTarefa.addEventListener("click", abrirModalNovaTarefa);

const botaoCancelarTarefa = document.querySelector(".botao-cancelar-tarefa");
function fecharModalNovaTarefa() {
//Definição de variável para o status selecionado no filtro de status
    if (botaoStatusAtivo() != null) {
        botaoStatusAtivo().classList.remove("botao-status-ativo");
    }
    document.querySelector(".form-tarefa").reset();
    modalNovaTarefa.close();

    modalNovaTarefa.querySelector(".titulo-modal").innerText = "Nova Tarefa";
    modalNovaTarefa.querySelector(".botao-salvar-tarefa").innerText = "Criar Tarefa";
    indiceEdicao = null;
}
botaoCancelarTarefa.addEventListener("click", fecharModalNovaTarefa);

function salvarTarefa(e) {
    e.preventDefault();

    const campoData = document.querySelector("#estimativa");
    campoData.setCustomValidity("");

    let titulo = document.querySelector("#titulo").value;
    let estimativa = document.querySelector("#estimativa").value;
    let descricao = document.querySelector("#descricao").value;
    
    if (estimativa !== "") {
        const partes = estimativa.split("-");
        let dataSelecionada = new Date(partes[0], partes[1] - 1, partes[2]);

        let hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
                
        if (dataSelecionada < hoje){
            campoData.setCustomValidity("A data de conclusão não pode ser anterior a hoje!")
            campoData.reportValidity();
            return;
        }
    }

    let status = botaoStatusAtivo().innerText;

    if (estimativa != "") {
    const partes = estimativa.split("-");
    estimativa = new Date(partes[0], partes[1] - 1, partes[2]);
    } else {
        estimativa = null
    }

    let tipoSalvamento = "criacaoTarefa";
    let tituloTarefa;
    
    if (indiceEdicao == null) {
        let t = new Tarefa(titulo, status, estimativa, descricao);
        listaTarefas.push(t);
        tituloTarefa = listaTarefas[listaTarefas.length - 1].titulo;
    } else {
        listaTarefas[indiceEdicao].titulo = titulo;
        listaTarefas[indiceEdicao].status = status;
        listaTarefas[indiceEdicao].dataEstimativa = estimativa;
        listaTarefas[indiceEdicao].descricao = descricao;
        tipoSalvamento = "edicaoTarefa";
        tituloTarefa = listaTarefas[indiceEdicao].titulo;
    }
    
    renderizarTarefas();
    fecharModalNovaTarefa();
    exibirNotificacao(tipoSalvamento, tituloTarefa)
    indiceEdicao = null;
}
document.querySelector(".form-tarefa").addEventListener("submit", salvarTarefa)

function atualizarTarefa(indice) {
    indiceEdicao = indice;
    modalNovaTarefa.querySelector(".titulo-modal").innerText = "Editar Tarefa";
    modalNovaTarefa.querySelector(".botao-salvar-tarefa").innerText = "Atualizar Tarefa";

    modalNovaTarefa.querySelector("#titulo").value = listaTarefas[indice].titulo;
    if (listaTarefas[indice].dataEstimativa != null) {
        modalNovaTarefa.querySelector("#estimativa").value = listaTarefas[indice].dataEstimativa.toISOString().split('T')[0];
    }
    listaTarefas[indice].dataAtualizacao = new Date();
    botoesStatus.forEach(botao => {
        if (botao.innerText == listaTarefas[indice].status){
            botao.classList.add("botao-status-ativo")
        }
    })
        
    modalNovaTarefa.querySelector("#descricao").value = listaTarefas[indice].descricao;

    abrirModalNovaTarefa();
}

//Renderizar tarefas
function renderizarTarefas() {
    botoesFiltro.forEach(botao => {
        const statusOriginal = botao.getAttribute("data-filtro");

        let quantidade = 0;
        if (statusOriginal == "Todas") {
            quantidade = listaTarefas.length;
        } else {
            quantidade = listaTarefas.filter(tarefa => tarefa.status == statusOriginal).length;
        }

        let novoTexto  = `${statusOriginal} (${quantidade})`;
        botao.innerText = novoTexto;
        botao.setAttribute("data-text", novoTexto)
    })

    document.querySelector(".lista-tarefas").innerHTML = "";
    if (tarefasFiltradas().length < 1) {
        document.querySelector(".lista-tarefas").innerHTML = `<div class="nenhuma-tarefa">
                    <img src="/images/tarefa.png">
                    <h2>Nenhuma tarefa por aqui!</h2>
                    <p>Comece adicionando sua primeira tarefa usando o botão acima.</p>
                </div>`;
    } else {
        document.querySelector(".lista-tarefas").innerHTML = `<button class="excluir-todas" onclick="removerTodasAsTarefas()">🗑️ Excluir todas</button>`
        let htmlFinal = "";
        listaTarefas.forEach((tarefa, indice) => {
            let cardHTML = "";
            if (tarefa.status == botaoFiltroAtivo().getAttribute("data-filtro") || botaoFiltroAtivo().getAttribute("data-filtro") == "Todas") {
                cardHTML = `<div class="tarefa-lista" style="animation-delay: ${indice * 0.1}s; border-left: 6px solid ${corDoStatus(indice)};">
                        <div class="conteudo-tarefa-lista">
                        <div class="infos-tarefa-lista">
                        <h4>${tarefa.titulo}</h4>`
                                    
                if (tarefa.descricao != "") {
                    cardHTML += `<p>☰ ${tarefa.descricao}</p>`
                }

                cardHTML += `<p>Criada em: ${tarefa.dataCriacao.toLocaleDateString("pt-BR")}</p>`

                if (tarefa.dataAtualizacao != null) {
                    cardHTML += `<p>Atualizada em: ${tarefa.dataAtualizacao.toLocaleDateString("pt-BR")}</p>`
                }
                
                if (tarefa.dataEstimativa instanceof Date && !isNaN(tarefa.dataEstimativa)) {
                    let estimativaFormatada = tarefa.dataEstimativa.toLocaleDateString("pt-BR");
                    cardHTML += `<p>Previsão: ${estimativaFormatada}</p>`
                }

                cardHTML += `</div>
                <p class="status-tarefa" style="background-color:${corDoStatus(indice)}">${tarefa.status}</p>
                </div>
                <div class="botoes-tarefa">
                <button id="botao-editar" onclick="atualizarTarefa(${indice})">✏️ Editar</button>
                <button id="botao-excluir" onclick="removerTarefa(${indice})">🗑️ Excluir</button>
                </div>
                </div>`
            }
            htmlFinal += cardHTML;
        })
        document.querySelector(".lista-tarefas").innerHTML += htmlFinal
    }   
}

// Remover uma tarefa
function removerTarefa(indice) {
    const tituloTarefa = listaTarefas[indice].titulo;
    let confirmacaoExclusao = confirm(`Atenção! Deseja realmente excluir a tarefa "${listaTarefas[indice].titulo}"?`);
    if (confirmacaoExclusao) {
        listaTarefas.splice(indice, 1);
        renderizarTarefas();
        exibirNotificacao("exclusaoIndividual", tituloTarefa)
    }
}

function removerTodasAsTarefas() {
    let confirmacaoExclusao = false;
    let tipoExclusao;

    if (botaoFiltroAtivo().getAttribute("data-filtro") == "Todas"){
        confirmacaoExclusao = confirm("Atenção! Deseja realmente excluir todas as tarefas?");
        tipoExclusao = "exclusaoGlobal";
    } else {
        confirmacaoExclusao = confirm(`Atenção! Deseja realmente excluir todas as tarefas que possuem o status "${botaoFiltroAtivo().getAttribute("data-filtro")}"?`)
        tipoExclusao = "exclusaoStatus";
    }

    if (confirmacaoExclusao) {
        tarefasFiltradas().forEach((tarefa, indice) => {
            listaTarefas.splice(listaTarefas.indexOf(tarefa), 1)
        })
    }
    renderizarTarefas();
    exibirNotificacao(tipoExclusao, "", botaoFiltroAtivo().getAttribute("data-filtro"));
}

function corDoStatus(indice) {
    switch (listaTarefas[indice].status) {
        case "A fazer":
            return "var(--status-a-fazer)";

        case "Fazendo":
            return "var(--status-fazendo)";

        case "Feita":
            return "var(--status-feita)";

        default:
            console.log(`Status da tarefa '${listaTarefas[indice].titulo}'(${indice})inválido`);
    }
}

// Manipulação da estilização dos botões de filtrar status
botoesFiltro.forEach(botao => {
    botao.addEventListener("click", () => {
        if (botaoFiltroAtivo() != null) {
            botaoFiltroAtivo().classList.remove("botao-filtro-ativo");
        }
        botao.classList.add("botao-filtro-ativo");
        renderizarTarefas();
    })
})

// Manipulação da estilização dos botões de selecionar status no modal
botoesStatus.forEach(botao => {
    botao.addEventListener("click", () => {
        if (botaoStatusAtivo() != null) {
            botaoStatusAtivo().classList.remove("botao-status-ativo");
        }
        botao.classList.add("botao-status-ativo");
    })
})

// Remover validação anterior na data
const campoData = document.querySelector("#estimativa");

campoData.addEventListener("input", () => {
    campoData.setCustomValidity("");
})