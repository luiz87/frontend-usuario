// console.log("Teste de log");
lsUsuario = [];
function gravarUsuario() {
    // console.log("dentro da funcao-gravar");
    id = document.getElementById("id").value;
    nome = document.getElementById("nome").value;
    email = document.getElementById("email").value;
    url = `nome=${nome}&email=${email}`;

    if(nome.trim() == ''){
        alert('Erro no preenchimendo do nome.');
        return ;
    }

    if(email.trim() == ''){
        alert('Erro no preenchimendo do email.');
        return ;
    }

    const xhttp = new XMLHttpRequest();
    if (id == '') {
        xhttp.open("POST", "http://localhost:8080/demo/add?" + url);
    } else {
        xhttp.open("PUT", `http://localhost:8080/demo/update/${id}?${url}`);
    }
    xhttp.send();
    xhttp.onload = function () {
        msg = this.responseText;
        alert(msg);
        atualizarTabela();
        if(msg.substring(0,2) == 'Ok'){
            limparCampos();
        }
        
    }
}

function limparCampos() {
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
}

function atualizarTabela() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/demo/all");
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
    xhttp.open("DELETE", "http://localhost:8080/demo/delete/" + id);
    xhttp.send();
    xhttp.onload = function () {
        alert(this.responseText);
        atualizarTabela();
        limparCampos();
    }
}