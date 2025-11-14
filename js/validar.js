let logado = localStorage.getItem("logado");
if (logado !== "true") {
    alert("⚠️ Você precisa estar logado para acessar esta página.");
    window.location.href = "admin.html";
}else {
    localStorage.removeItem("logado");
}

localStorage.setItem("mensagens", JSON.stringify(obterMensagens()))