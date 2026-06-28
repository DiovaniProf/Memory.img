const pares = [
  {
    id: 1,
    cartaA: "img/unidade1.png",
    cartaB: "img/unidade2.png",
    altA: "Unidade 1",
    altB: "Unidade 2"
  },
  {
    id: 2,
    cartaA: "img/unidade3.png",
    cartaB: "img/unidade4.png",
    altA: "Unidade 3",
    altB: "Unidade 4"
  }
];

const telaInicial = document.getElementById("telaInicial");
const telaJogo = document.getElementById("telaJogo");
const btnComecar = document.getElementById("btnComecar");
const btnVoltarInicio = document.getElementById("voltarInicio");

const tabuleiro = document.getElementById("tabuleiro");
const tentativasTexto = document.getElementById("tentativas");
const mensagem = document.getElementById("mensagem");
const botaoReiniciar = document.getElementById("reiniciar");

let cartas = [];
let primeiraCarta = null;
let segundaCarta = null;
let bloqueio = false;
let tentativas = 0;
let paresEncontrados = 0;

function mostrarTelaInicial() {
  telaJogo.classList.remove("ativa");
  telaInicial.classList.add("ativa");
}

function mostrarTelaJogo() {
  telaInicial.classList.remove("ativa");
  telaJogo.classList.add("ativa");
  iniciarJogo();
}

function criarCartas() {
  cartas = [];

  pares.forEach(par => {
    cartas.push({
      id: par.id,
      imagem: par.cartaA,
      alt: par.altA
    });

    cartas.push({
      id: par.id,
      imagem: par.cartaB,
      alt: par.altB
    });
  });
}

function embaralharCartas() {
  cartas.sort(() => Math.random() - 0.5);
}

function montarTabuleiro() {
  tabuleiro.innerHTML = "";

  cartas.forEach(carta => {
    const elementoCarta = document.createElement("div");

    elementoCarta.classList.add("carta");
    elementoCarta.dataset.id = carta.id;

    elementoCarta.innerHTML = `
      <div class="face verso">
        <div class="simbolo-carta"></div>
      </div>

      <div class="face frente">
        <img src="${carta.imagem}" alt="${carta.alt}">
      </div>
    `;

    elementoCarta.addEventListener("click", virarCarta);

    tabuleiro.appendChild(elementoCarta);
  });
}

function virarCarta() {
  if (bloqueio) return;
  if (this.classList.contains("virada")) return;
  if (this.classList.contains("encontrada")) return;

  this.classList.add("virada");

  if (!primeiraCarta) {
    primeiraCarta = this;
    return;
  }

  segundaCarta = this;
  tentativas++;
  tentativasTexto.textContent = tentativas;

  verificarPar();
}

function verificarPar() {
  const idPrimeiraCarta = primeiraCarta.dataset.id;
  const idSegundaCarta = segundaCarta.dataset.id;

  if (idPrimeiraCarta === idSegundaCarta) {
    primeiraCarta.classList.add("encontrada");
    segundaCarta.classList.add("encontrada");

    paresEncontrados++;

    limparSelecao();

    if (paresEncontrados === pares.length) {
      mensagem.textContent = `Parabéns! Você concluiu o jogo em ${tentativas} tentativas.`;
    }

  } else {
    bloqueio = true;

    setTimeout(() => {
      primeiraCarta.classList.remove("virada");
      segundaCarta.classList.remove("virada");

      limparSelecao();
    }, 1000);
  }
}

function limparSelecao() {
  primeiraCarta = null;
  segundaCarta = null;
  bloqueio = false;
}

function iniciarJogo() {
  tentativas = 0;
  paresEncontrados = 0;
  primeiraCarta = null;
  segundaCarta = null;
  bloqueio = false;

  tentativasTexto.textContent = tentativas;
  mensagem.textContent = "";

  criarCartas();
  embaralharCartas();
  montarTabuleiro();
}

btnComecar.addEventListener("click", mostrarTelaJogo);
btnVoltarInicio.addEventListener("click", mostrarTelaInicial);
botaoReiniciar.addEventListener("click", iniciarJogo);