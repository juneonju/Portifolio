const projetos = document.querySelectorAll(".projeto");
const modal = document.querySelector("#modal-projeto");
const fecharModal = document.querySelector("#fechar-modal");
const modalTitulo = document.querySelector("#modal-titulo");
const modalDescricao = document.querySelector("#modal-descricao");
const modalVideo = document.querySelector("#modal-video");
const videoSource = document.querySelector("#video-source");

let projetoAnterior = null;

function abrirModal(projeto) {
    projetoAnterior = projeto;

    modalTitulo.textContent = projeto.dataset.titulo;
    modalDescricao.textContent = projeto.dataset.descricao;

    videoSource.src = projeto.dataset.video;

    modalVideo.load();

    modal.hidden = false;
    document.body.classList.add("modal-aberto");

    fecharModal.focus();
}

function fecharJanela() {
    modalVideo.pause();
    modalVideo.currentTime = 0;

    modal.hidden = true;
    document.body.classList.remove("modal-aberto");

    if (projetoAnterior) {
        projetoAnterior.focus();
    }
}

projetos.forEach((projeto) => {
    projeto.addEventListener("click", () => {
        abrirModal(projeto);
    });
});

fecharModal.addEventListener("click", fecharJanela);

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        fecharJanela();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
        fecharJanela();
    }
});

const botaoIluminacao = document.querySelector("#changeColor");
const elementoRaiz = document.documentElement;

let temaAtual = localStorage.getItem("tema") || "escuro";

function aplicarTema(tema) {
    elementoRaiz.dataset.tema = tema;

    if (tema === "claro") {
        botaoIluminacao.textContent = "Tema escuro";
    } else {
        botaoIluminacao.textContent = "Tema claro";
    }

    localStorage.setItem("tema", tema);
}

aplicarTema(temaAtual);

botaoIluminacao.addEventListener("click", () => {
    temaAtual = temaAtual === "escuro" ? "claro" : "escuro";

    aplicarTema(temaAtual);
});

const habilidades = document.querySelectorAll("#grid li");

const elementosParaRevelar = [
    ...habilidades,
    ...projetos
];

const observador = new IntersectionObserver((entradas, observer) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("visivel");

            // Para de observar depois que o elemento aparece
            observer.unobserve(entrada.target);
        }

    });

}, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

elementosParaRevelar.forEach((elemento, indice) => {

    elemento.classList.add("revelar");

    elemento.style.transitionDelay = `${(indice % 7) * 100}ms`;

    observador.observe(elemento);

});
