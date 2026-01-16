const apiUrl = "http://localhost:8080/produtos";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form-produto");
    const tabela = document.getElementById("tabela-produtos");

    if (!form || !tabela) {
        console.error("Form ou tabela não encontrados no HTML");
        return;
    }

    //  CADASTRAR PRODUTO
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const produto = {
            nome: document.getElementById("nome").value,
            quantidade: Number(document.getElementById("quantidade").value),
            preco: Number(document.getElementById("preco").value)
        };

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        })
            .then(() => {
                form.reset();
                carregarProdutos();
            })
            .catch(error => console.error("Erro ao salvar produto:", error));
    });

    //  LISTAR PRODUTOS
    function carregarProdutos() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(produtos => {
                tabela.innerHTML = "";

                produtos.forEach(p => {
                    const tr = document.createElement("tr");

                    tr.innerHTML = `
    <td>${p.nome}</td>
    <td>${p.quantidade}</td>
    <td>R$ ${Number(p.preco).toFixed(2)}</td>
    <td>
        <button onclick="aumentarEstoque(${p.id})">➕</button>
        <button onclick="diminuirEstoque(${p.id})" ${p.quantidade === 0 ? "disabled" : ""}>➖</button>
        <button onclick="excluirProduto(${p.id})">🗑</button>
    </td>
`;
                    tabela.appendChild(tr);
                });
            })
            .catch(error => console.error("Erro ao carregar produtos:", error));
    }

    // AUMENTAR ESTOQUE
    window.aumentarEstoque = function(id) {
        fetch(`${apiUrl}/${id}/aumentar?quantidade=1`, {
            method: "PUT"
        })
            .then(() => carregarProdutos())
            .catch(() => alert("Erro ao aumentar estoque"));
    };

    // ➖ DIMINUIR ESTOQUE
    window.diminuirEstoque = function(id) {
        fetch(`${apiUrl}/${id}/diminuir?quantidade=1`, {
            method: "PUT"
        })
            .then(() => carregarProdutos())
            .catch(() => alert("Erro ao diminuir estoque"));
    };
    // EXCLUIR PRODUTO
    window.excluirProduto = function(id) {
        if (!confirm("Tem certeza que deseja excluir este produto?")) {
            return;
        }

        fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        })
            .then(() => carregarProdutos())
            .catch(() => alert("Erro ao excluir produto"));
    };

    carregarProdutos();
});