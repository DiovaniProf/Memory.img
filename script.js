const telaInicial = document.getElementById("telaInicial");
const telaJogo = document.getElementById("telaJogo");

const btnComecar = document.getElementById("btnComecar");
const btnVoltarInicio = document.getElementById("voltarInicio");
const botaoReiniciar = document.getElementById("reiniciar");

const tabuleiro = document.getElementById("tabuleiro");
const tentativasTexto = document.getElementById("tentativas");
const mensagem = document.getElementById("mensagem");

let primeiraCarta = null;
let segundaCarta = null;
let bloqueio = false;
let tentativas = 0;
let paresEncontrados = 0;

const totalDePares = 2;

function mostrarTelaInicial() {
  telaJogo.classList.remove("ativa");
  telaInicial.classList.add("ativa");
}

function mostrarTelaJogo() {
  telaInicial.classList.remove("ativa");
  telaJogo.classList.add("ativa");

  iniciarJogo();
}

function iniciarJogo() {
  primeiraCarta = null;
  segundaCarta = null;
  bloqueio = false;
  tentativas = 0;
  paresEncontrados = 0;

  tentativasTexto.textContent = tentativas;
  mensagem.textContent = "";

  prepararCartas();
  embaralharCartas();
}

function prepararCartas() {
  const cartas = document.querySelectorAll(".carta");

  cartas.forEach(carta => {
    carta.classList.remove("virada");
    carta.classList.remove("encontrada");

    carta.removeEventListener("click", virarCarta);
    carta.addEventListener("click", virarCarta);
  });
}

function embaralharCartas() {
  const cartas = Array.from(tabuleiro.children);

  cartas.sort(() => Math.random() - 0.5);

  cartas.forEach(carta => {
    tabuleiro.appendChild(carta);
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
  const parPrimeiraCarta = primeiraCarta.dataset.par;
  const parSegundaCarta = segundaCarta.dataset.par;

  if (parPrimeiraCarta === parSegundaCarta) {
    primeiraCarta.classList.add("encontrada");
    segundaCarta.classList.add("encontrada");

    paresEncontrados++;

    limparSelecao();

    if (paresEncontrados === totalDePares) {
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

btnComecar.addEventListener("click", mostrarTelaJogo);
btnVoltarInicio.addEventListener("click", mostrarTelaInicial);
botaoReiniciar.addEventListener("click", iniciarJogo);