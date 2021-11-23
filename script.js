// console.log("Teste de log");
lsUsuario = [];
function gravarUsuario() {
    console.log("dentro da funcao-gravar");
    id = document.getElementById("id").value;
    nome = document.getElementById("nome").value;
    email = document.getElementById("email").value;
    url = `nome=${nome}&email=${email}`;

    const xhttp = new XMLHttpRequest();
    if (id == '') {
        xhttp.open("POST", "https://qua-209030.herokuapp.com/demo/add?" + url);
    } else {
        xhttp.open("PUT", `https://qua-209030.herokuapp.com/demo/update/${id}?${url}`);
    }
    xhttp.send();
    xhttp.onload = function () {
        alert(this.responseText);
        atualizarTabela();
        limparCampos();
    }
}

function limparCampos() {
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
}

function atualizarTabela() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://qua-209030.herokuapp.com/demo/all");
    xhttp.send();
    xhttp.onload = function () {
        lsUsuario = JSON.parse(this.responseText);
        texto = "";
        for (i in lsUsuario) {
            u = lsUsuario[i];
            // console.log(u);
            texto += `<tr onclick='carregarUsuario(${i})'><td>${u.id}</td><td>${u.nome}</td><td>${u.email}</td></tr>`;
        }
        document.getElementById("tbCorpo").innerHTML = texto;
    }
}

function carregarUsuario(i) {
    // console.log(lsUsuario[i]);
    u = lsUsuario[i];
    document.getElementById("id").value = u.id;
    document.getElementById("nome").value = u.nome;
    document.getElementById("email").value = u.email;
}

function apagarUsuario() {
    id = document.getElementById("id").value;
    if (id == '') {
        alert("Necessário selecionar algum registro!");
        return;
    }
    if (!confirm("Realmente deseja apagar esse registro?")) {
        return;
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "https://qua-209030.herokuapp.com/demo/delete/" + id);
    xhttp.send();
    xhttp.onload = function () {
        alert(this.responseText);
        atualizarTabela();
        limparCampos();
    }
}