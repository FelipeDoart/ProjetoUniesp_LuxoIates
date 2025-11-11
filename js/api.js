
function obterMensagens() {

    var retorno = [];

    var consulta = $.ajax({
        url: 'https://app-p2-js-c88e9128234a.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function(){
        return retorno;
    });

    consulta.done(function(data) {
        retorno = data;
    });

    return retorno;
}

function inserirMensagem() {

    var nome = document.getElementById("name").value;
    var email = document.getElementById("emailCt").value;
    var msg = document.getElementById("msg").value;

    var mensagem = {
            nome: nome, 
            email: email, 
            msg: msg} 

    var inserir = $.ajax({

        url: 'https://app-p2-js-c88e9128234a.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(mensagem),
        dataType: 'json',
        async: false,
        contentType: 'application/json',
        success: function(resposta){
            alert("Mensagem enviada com sucesso!");
        },
        fail: function(error){
            alert("Erro ao enviar mensagem.");
            console.log(error);
        }
    });
}

// Tentativa 1:
// Com jQuery AJAX (Corrigido)
// function validarUsuario() {
//     var email = $("#emailAd").val().trim();
//     var senha = $("#senha").val().trim();

//     if (!email || !senha) {alert("⚠️ Por favor, preencha todos os campos.");
//         return;}
        
//     var objLoginSenha = {
//         email: email,
//         senha: senha};

//     $.ajax({
//         url: 'https://app-p2-js-c88e9128234a.herokuapp.com/usuarios/validar',
//         method: 'POST',
//         dataType: 'json',
//         contentType: 'application/json',
//         data: JSON.stringify(objLoginSenha)
//     })
//     .done(function (data) {
//         // Se o servidor retorna um booleano ou objeto
//         if (data === true || data.valido === true || data.sucesso === true) {
//             alert("✅ Login realizado com sucesso!");
//             window.location.href = "mensagem.html";
//         } else {alert("❌ Email ou senha incorretos!");}
//     })
//     .fail(function (xhr, status, error) {
//         console.error("Erro na requisição:", error);
//         alert("⚠️ Erro ao tentar validar o login. Tente novamente mais tarde.");
//     });
// }
// Tentativa 2:
// Com async/await e fetch API corrigido

async function validarUsuario() {
    // Exemplo de login válido (para teste):
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

        // Se o servidor não retornar 200 OK
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const data = await resposta.json();

        // Aqui depende do formato do retorno da API:
        // Pode ser true, { valido: true }, ou { sucesso: true }
        if (data === true) {
            alert("✅ Login realizado com sucesso!");
            window.location.href = "mensagem.html";
        } else {alert("❌ Email ou senha incorretos!");}

    } catch (erro) {console.error("Erro ao validar usuário:", erro);
        alert("⚠️ Erro ao tentar validar o login. Tente novamente mais tarde.");}
}
