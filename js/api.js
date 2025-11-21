
// ##Função mensagem novo##
async function obterMensagens() {
    try {
        const resposta = await fetch('https://app-p2-js-c88e9128234a.herokuapp.com/mensagens');
        const mensagens = await resposta.json();
        // salva TODAS no localStorage
        localStorage.setItem("mensagens", JSON.stringify(mensagens));
        return mensagens;

    } catch (erro) {console.error("Erro ao obter mensagens:", erro);return [];}}


function inserirMensagem() {
    let controle = parseInt(localStorage.getItem("controle")) || 0;
    controle++;
    localStorage.setItem("controle", controle);
    //Informações do formulário a serem levadas
    var nome = document.getElementById("name").value;
    var email = document.getElementById("emailCt").value;
    var msg = document.getElementById("msg").value;
    //Falhará caso falte uma das informações
    if (!nome || !email || !msg) {
        alert("⚠️ Por favor, preencha todos os campos.");
        return;
    }
    //Estrutura da mensagem
    var mensagem = {
            nome: nome, 
            email: email, 
            mensagem: msg} 
    // Envia a mensagem para o servidor
    $.ajax({
        url: 'https://app-p2-js-c88e9128234a.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(mensagem),
        contentType: 'application/json',
        // Se der certo
        success: async function() {
            alert("✅ Mensagem enviada com sucesso!");
            // Atualiza as mensagens no localStorage
            await obterMensagens();
        }, error: function(xhr, status, error) {
            console.log("STATUS:", status);
            console.log("ERRO:", error);
            console.log("SERVIDOR:", xhr.responseText);
            alert("❌ Erro ao enviar a mensagem.\nVeja o console (F12) para mais detalhes.");
        }
    });
}

// Tentativa 2:
// Com async/await e fetch API corrigido

async function validarUsuario() {
    // email: admin@admin.com
    // senha: 1234
    const email = document.getElementById("emailAd").value.trim();
    const senha = document.getElementById("password").value.trim();
    //O método "trim()" remove espaços em branco do início e do fim da string.
    if (!email || !senha) {
        alert("⚠️ Por favor, preencha todos os campos.");return;}

    const objLoginSenha = { email, senha };

    try {
        const resposta = await fetch('https://app-p2-js-c88e9128234a.herokuapp.com/usuarios/validar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objLoginSenha)
        });
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        const data = await resposta.json();
        if (data === true) {
            alert("✅ Login realizado com sucesso!");
            localStorage.setItem("logado", "true");
            window.location.href = "mensagem.html";
        } else {alert("❌ Email ou senha incorretos!");}
    } catch (erro) {console.error("Erro ao validar usuário:", erro);
        alert("⚠️ Erro ao tentar validar o login. Tente novamente mais tarde.");}
}
function checarLogin() {
    const logado = localStorage.getItem("logado");
    if (logado === "true") {
        const acesso = document.getElementById("menu")
        acesso.innerHTML += `<ul><li id="mens"><a href="mensagem.html">Área Administrativa</a></li></ul>`;
        const exitBtn = document.getElementsByClassName("div1");
        exitBtn[0].innerHTML += `<div id="exitbutton"><button class="button" onclick="desconectar()">Sair</button></div>`;
    }}
window.onload = function() {
    checarLogin();
}