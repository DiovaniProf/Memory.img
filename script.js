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

const totalDePares = 5;

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

  cartas.forEach((carta) => {
    carta.classList.remove("virada");
    carta.classList.remove("encontrada");

    carta.removeEventListener("click", virarCarta);
    carta.addEventListener("click", virarCarta);
  });
}

function embaralharCartas() {
  const cartas = Array.from(tabuleiro.children);

  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }

  cartas.forEach((carta) => tabuleiro.appendChild(carta));
}

function virarCarta() {
  if (bloqueio) return;
  if (this === primeiraCarta) return;
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
  const parPrimeira = primeiraCarta.dataset.par;
  const parSegunda = segundaCarta.dataset.par;

  if (parPrimeira === parSegunda) {
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