window.onload = function (e) {

    var btnRecuperar = document.getElementById("btnRecuperar");

    var txtEmail = document.getElementById("txtEmail");

    txtEmail.focus();

    btnRecuperar.onclick = function (e) {

        e.preventDefault();

        var email = txtEmail.value;

        var mensagem = "Campo E-mail obrigatório.";

        if (email == "") {

            exibirMensagemErro(mensagem);

        }
        else {
            recuperarSenha(email);
        }
    };

    function exibirMensagemErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);

    }

    function recuperarSenha(email) {
        var data = JSON.stringify({
            "email": email
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.sucesso) {
                    alert("E-mail enviado !");
                }
                else {
                    exibirMensagemErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44344/api/usuario/EsqueceuSenha");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
}