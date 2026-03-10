const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3') 
const startPouseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const audioTempoFinalizado = new Audio ('/sons/beep.mp3')
const tempoNaTela = document.querySelector('#timer')
const audioPlay = new Audio ('/sons/play.wav')
const audioPausa = new Audio ('/sons/pause.mp3')
const imgBtnPauseIniciar = document.querySelector('.app__card-primary-butto-icon')
let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play()
    }else(
        musica.pause()
    )
    
})
/*1. getAttribute: Usado para obter o valor de um atributo específico de um elemento. Por exemplo, elemento.getAttribute('data-info') retorna o valor do atributo data-info.
  2. setAttribute: Utilizado para definir ou modificar o valor de um atributo. Aceita dois argumentos: o nome do atributo e o valor a ser atribuído. Se o atributo já existir, ele será sobrescrito; caso contrário, será criado um novo.
  3. hasAttribute: Verifica se um elemento possui um atributo específico, retornando true se o atributo existir e false se não existir.
  4. removeAttribute: Remove um atributo específico de um elemento HTML, tornando-o indisponível.
*/

focoBt.addEventListener('click', () => {
   tempoDecorridoEmSegundos = 1500
   alterarContexto('foco')
   focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
       tempoDecorridoEmSegundos = 300
      alterarContexto('descanso-curto')
      curtoBt.classList.add('active')
})
longoBt.addEventListener('click', () => {
       tempoDecorridoEmSegundos = 900
       alterarContexto('descanso-longo')
       longoBt.classList.add('active')
})


/*add(): Adiciona uma classe ao elemento.
remove(): Remove uma classe do elemento.
toggle(): Alterna a presença de uma classe (adiciona se não estiver presente, remove se estiver).
contains(): Verifica se uma classe está presente no elemento.
É possível manipular várias classes simultaneamente passando múltiplos argumentos para os métodos add() e remove().*/

function alterarContexto(contexto){
    mostrarTempo()
     //O método setAttribute é usado para definir ou modificar o valor de um atributo em um elemento 
     botoes.forEach(function (contexto){
        contexto.classList.remove('active')
     })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade, <br>
                <strong class="app__title-strong"> mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML =`
            Que tal dar uma respirada? <br>
                <strong class="app__title-strong"> Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar a superfície. <br>
                <strong class="app__title-strong"> Faça uma pausa longa!</strong>
            `
        default:
            break;
    }

}

/*
parentNode: Permite acessar o nó pai de um elemento. Por exemplo, ao selecionar um parágrafo, podemos usar parentNode para obter o elemento que o contém.

childNodes: Utilizada para acessar todos os nós filhos de um elemento, incluindo nós de texto e elementos HTML. Por exemplo, ao acessar um contêiner, podemos obter todos os seus filhos.

nextElementSibling: Acessa o próximo irmão (nó adjacente) de um elemento. Por exemplo, ao selecionar um item de lista, podemos usar essa propriedade para obter o próximo item.

previousElementSibling: Semelhante ao nextElementSibling, mas permite acessar o irmão anterior de um elemento.
*/
const contagemRegressiva = () =>{
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()  
        alert('Tempo Finalizado!'); 
        zerar()
    return
    }
    
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}


startPouseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    imgBtnPauseIniciar.setAttribute ('src', `/imagens/pause.png`)
}
    
function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar" 
    intervaloId = null
    imgBtnPauseIniciar.setAttribute ('src', `/imagens/play_arrow.png`)
}
function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

/*Construtor sem argumentos: Cria uma data com a data e hora atuais.
javascript

const dataAtual = new Date();

Construtor com argumentos: Permite especificar ano, mês, dia, hora, minuto, segundo e milissegundo.
javascript

const dataEspecifica = new Date(2023, 7, 3, 12, 30, 0, 0);

Construtor com uma string: Aceita uma string que representa a data no formato padrão "yyyy-mm-dd".
javascript

const dateString = "2023-08-03";
const formatoDeData = new Date(dateString);
*/


mostrarTempo()
