let banners = [
  "img/banner1.jpg",
  "img/banner2.jpg",
  "img/banner3.jpg"
];

let bannerAtual = 0;

let produtos = [

  {
    nome: "Camisa Argentina",
    preco: 199,
    imagem: "img/camisa1.jpg",
    categoria: "copa",
    destaque: true,
    marca: "adidas",
    descricao: "Camisa da Argentina com tecido leve, confortável e ideal para torcer ou usar no dia a dia.",
    tamanhos: ["P", "M", "G", "GG"]
  },

  {
    nome: "Camisa Brasil",
    preco: 210,
    imagem: "img/brasil.png",
    categoria: "copa",
    destaque: true,
    marca: "nike",
    descricao: "Camisa do Brasil com visual esportivo, confortável e perfeita para jogos, treino ou passeio.",
    tamanhos: ["P", "M", "G", "GG"]
  },

  {
    nome: "Chuteira Nike",
    preco: 399,
    imagem: "img/chuteiras.jpg",
    categoria: "chuteiras",
    destaque: true,
    marca: "nike",
    descricao: "Chuteira Nike profissional com boa aderência, conforto e design moderno para campo.",
    tamanhos: ["38", "39", "40", "41", "42", "43"]
  },

  {
    nome: "Chuteira Puma",
    preco: 389,
    imagem: "img/chuteiras2.jpg",
    categoria: "chuteiras",
    destaque: true,
    marca: "puma",
    descricao: "Chuteira Puma esportiva, leve e confortável, indicada para partidas e treinos.",
    tamanhos: ["38", "39", "40", "41", "42", "43"]
  },

  {
    nome: "Boné Esportivo",
    preco: 89,
    imagem: "img/bones.jpg",
    categoria: "acessorios",
    destaque: true,
    marca: "nike",
    descricao: "Boné esportivo moderno, leve e confortável para usar no dia a dia ou em treinos.",
    tamanhos: ["Único"]
  },

  {
    nome: "Manete Gamer",
    preco: 180,
    imagem: "img/manete1.jpg",
    categoria: "gamer",
    destaque: true,
    marca: "gamer",
    descricao: "Controle gamer confortável, ideal para jogos no computador ou console.",
    tamanhos: ["Único"]
  }

];

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function atualizarBanner(){
  let bannerImg = document.getElementById("banner-img");

  if(bannerImg){
    bannerImg.src = banners[bannerAtual];
  }
}

function trocarBanner(direcao){
  bannerAtual += direcao;

  if(bannerAtual < 0){
    bannerAtual = banners.length - 1;
  }

  if(bannerAtual >= banners.length){
    bannerAtual = 0;
  }

  atualizarBanner();
}

setInterval(function(){
  bannerAtual++;

  if(bannerAtual >= banners.length){
    bannerAtual = 0;
  }

  atualizarBanner();
}, 4000);

function mostrarListaProdutos(listaProdutos){
  let areaProdutos = document.getElementById("produtos-destaque");

  if(!areaProdutos){
    return;
  }

  areaProdutos.innerHTML = "";

  if(listaProdutos.length === 0){
    areaProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  listaProdutos.forEach(function(produto){
    let indexOriginal = produtos.indexOf(produto);

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-conteudo" onclick="abrirProduto(${indexOriginal})">

        <span class="categoria-produto">
          ${produto.categoria}
        </span>

        <img src="${produto.imagem}" alt="${produto.nome}">

        <h3>${produto.nome}</h3>

        <p>R$ ${produto.preco.toFixed(2)}</p>

      </div>

      <button onclick="adicionarProduto(${indexOriginal})">
        Adicionar ao carrinho
      </button>

      <button onclick="comprarProduto(${indexOriginal})" class="btn-comprar">
        Comprar
      </button>
    `;

    areaProdutos.appendChild(card);
  });
}

function mostrarPorCategoria(categoria){
  let titulo = document.getElementById("titulo-produtos");
  let subtitulo = document.getElementById("subtitulo-produtos");

  if(!titulo || !subtitulo){
    return;
  }

  let listaProdutos = [];

  if(categoria === "destaques"){
    titulo.innerHTML = "Produtos em Destaque";
    subtitulo.innerHTML = "Escolha um produto em destaque.";

    listaProdutos = produtos.filter(function(produto){
      return produto.destaque === true;
    });

  }else{
    titulo.innerHTML = "Categoria: " + categoria;
    subtitulo.innerHTML = "Produtos da categoria " + categoria;

    listaProdutos = produtos.filter(function(produto){
      return produto.categoria === categoria;
    });
  }

  mostrarListaProdutos(listaProdutos);
}

function mostrarPorMarca(marcaEscolhida){
  let titulo = document.getElementById("titulo-produtos");
  let subtitulo = document.getElementById("subtitulo-produtos");

  if(!titulo || !subtitulo){
    return;
  }

  titulo.innerHTML = "Marca: " + marcaEscolhida;
  subtitulo.innerHTML = "Produtos da marca " + marcaEscolhida;

  let produtosFiltrados = produtos.filter(function(produto){
    return produto.marca === marcaEscolhida;
  });

  mostrarListaProdutos(produtosFiltrados);
}

function abrirProduto(index){
  window.location.href = "produto.html?id=" + index;
}

function adicionarProduto(index){
  carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.push(produtos[index]);

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  alert("Produto adicionado ao carrinho!");
}

function comprarProduto(index){
  adicionarProduto(index);
  window.location.href = "carrinho.html";
}

function atualizarCarrinho(){
  let lista = document.getElementById("lista-carrinho");
  let totalTela = document.getElementById("total");

  if(!lista || !totalTela){
    return;
  }

  carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  lista.innerHTML = "";

  if(carrinho.length === 0){
    lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
    totalTela.innerHTML = "0.00";
    mostrarBotaoPaypal();
    return;
  }

  carrinho.forEach(function(produto, index){
    lista.innerHTML += `
      <div class="item-carrinho">

        <img src="${produto.imagem}" alt="${produto.nome}">

        <div>
          <h3>${produto.nome}</h3>
          <p>R$ ${produto.preco.toFixed(2)}</p>
        </div>

        <button onclick="removerProduto(${index})">
          Remover
        </button>

      </div>
    `;
  });

  let total = carrinho.reduce(function(soma, produto){
    return soma + produto.preco;
  }, 0);

  totalTela.innerHTML = total.toFixed(2);

  mostrarBotaoPaypal();
}

function removerProduto(index){
  carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.splice(index, 1);

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  atualizarCarrinho();
}

function mostrarBotaoPaypal(){
  let container = document.getElementById("paypal-button-container");

  if(!container){
    return;
  }

  carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  let total = carrinho.reduce(function(soma, produto){
    return soma + produto.preco;
  }, 0);

  container.innerHTML = "";

  if(total <= 0){
    return;
  }

  if(typeof paypal === "undefined"){
    container.innerHTML = "<p>PayPal não carregou. Verifique seu Client ID.</p>";
    return;
  }

  paypal.Buttons({

    createOrder: function(data, actions){
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total.toFixed(2)
          }
        }]
      });
    },

    onApprove: function(data, actions){
      return actions.order.capture().then(function(){

        alert("Pagamento aprovado!");

        carrinho = [];

        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        atualizarCarrinho();

      });
    }

  }).render("#paypal-button-container");
}

atualizarBanner();
mostrarPorCategoria("destaques");

function mostrarResumoCheckout(){

  let areaResumo = document.getElementById("resumo-produtos");
  let totalTela = document.getElementById("checkout-total");

  if(!areaResumo || !totalTela){
    return;
  }

  carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  areaResumo.innerHTML = "";

  if(carrinho.length === 0){
    areaResumo.innerHTML = "<p>Seu carrinho está vazio.</p>";
    totalTela.innerHTML = "0.00";
    return;
  }

  carrinho.forEach(function(produto){

    areaResumo.innerHTML += `
      <div class="resumo-item">
        <img src="${produto.imagem}" alt="${produto.nome}">

        <div>
          <h3>${produto.nome}</h3>
          <p>R$ ${produto.preco.toFixed(2)}</p>
        </div>
      </div>
    `;

  });

  let total = carrinho.reduce(function(soma, produto){
    return soma + produto.preco;
  }, 0);

  totalTela.innerHTML = total.toFixed(2);

  mostrarBotaoPaypal();
}