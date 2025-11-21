let logado = localStorage.getItem("logado");
if (logado !== "true") {
    alert("⚠️ Você precisa estar logado para acessar esta página.");
    window.location.href = "admin.html";
}
function desconectar() {
    localStorage.removeItem("logado");
    window.location.href = "admin.html";
}


function limparMensagensAntigas() {
    let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
    let controle = parseInt(localStorage.getItem("controle")) || 0;
    // Se você nunca enviou mensagens, não limpa nada
    if (controle <= 0) return;
    // Mantém apenas as últimas "controle" mensagens
    mensagens = mensagens.slice(-controle);
    // Salva de volta no localStorage
    localStorage.setItem("mensagens", JSON.stringify(mensagens));
}

function getOld() {
    return JSON.parse(localStorage.getItem("visualizadas")) || [];
}
function salvarOld(lista) {
    localStorage.setItem("visualizadas", JSON.stringify(lista));
}
function NewMens(id) {
    const visualizadas = getOld();
    return !visualizadas.includes(id);
}
function marcarOld(id) {
    const visualizadas = getOld();
    if (!visualizadas.includes(id)) {
        visualizadas.push(id);
        salvarOld(visualizadas);
    }
}

function renderizarMensagens() {
    const comentarios = document.getElementById("coms");
    //Pega as mensagens do localStorage
    const mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
    mensagens.forEach(element => {
        const novo = NewMens(element.id);
        comentarios.innerHTML += `
        <div class="comentario${novo ? "novo":"visto"}" id="comentario${element.id}">
            <p class ="nome">${element.nome}</p>
            <p class ="email"><b>Email:</b> ${element.email}</p>
            <p class ="coments">${element.mensagem}</p>
            <div onclick="" class="buttons"><buttons class="button" onclick="excluirMensagem(${element.id})">Excluir</buttons></div>
        </div>
        `;
        marcarOld(element.id);
    });
}

function excluirMensagem(id) {
    let mensagem = JSON.parse(localStorage.getItem("mensagens")) || [];
    mensagem = mensagem.filter(msg => msg.id !== id);
    localStorage.setItem("mensagens", JSON.stringify(mensagem)); 
    let contador = parseInt(localStorage.getItem("controle")) || 0;
    if (contador > 0) {
        contador--;
        localStorage.setItem("controle", contador.toString());
    }
    window.location.reload();
}



window.onload = function() {
    limparMensagensAntigas();
    renderizarMensagens();
}
