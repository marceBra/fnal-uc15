let parametros = new URLSearchParams(window.location.search);

let id = parametros.get("id");

let produto = produtos[id];

if(produto){

  document.getElementById("produto-imagem").src = produto.imagem;

  document.getElementById("produto-categoria").innerHTML = produto.categoria;

  document.getElementById("produto-nome").innerHTML = produto.nome;

  document.getElementById("produto-preco").innerHTML =
    "R$ " + produto.preco.toFixed(2);

  document.getElementById("produto-descricao").innerHTML =
    produto.descricao;

  let areaTamanhos = document.getElementById("produto-tamanhos");

  areaTamanhos.innerHTML = "";

  produto.tamanhos.forEach(function(tamanho){

    areaTamanhos.innerHTML += `
      <button class="btn-tamanho">
        ${tamanho}
      </button>
    `;

  });

  document.getElementById("btn-adicionar").onclick = function(){
    adicionarProduto(id);
  };

}else{

  document.body.innerHTML = "<h1>Produto não encontrado</h1>";

}