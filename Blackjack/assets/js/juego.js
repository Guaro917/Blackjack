
// 2C= Two of clubs (2 de Treboles)
// 2D= Two of diamonds (2 de diamantes)
// 2H= Two of hearts (2 de corazones)
// 2S= Two of spades (2 de espadas)

//inicializamos
let deck = [];
const palos = ['C','D','H','S'];
const monos = ['A','J','Q','K'];

let puntosJugador = 0;
let puntosComputadora = 0;
const puntosHTML = document.querySelectorAll("small");
const divCartasJug = document.querySelector("#jugador-cartas");
const divCartasCompu = document.querySelector("#computadora-cartas");

//referencias del HTML
const btnPedir = document.querySelector("#btnPedir");//Creamos el deck, introducimos primero cartas del 2 al 10, luego  A,J,Q,K 
const btnDetener = document.querySelector("#btnDetener");
const btnNuevoJuego = document.querySelector("#btnNuevo");

//FUNCIONES
const crearDeck = () => {
    for(let i = 2; i <=10; i++) {
        for(let palo of palos){ 
            deck.push(i + palo);
        }
    }
    for(let mono of monos) {
        for(let palo of palos){
            deck.push(mono + palo);
        }
    }
//usamos shuffle de underscore para mezclar el deck
    deck = _.shuffle( deck );
    console.log(deck);
    return deck;
}

crearDeck();

//Funcion para tomar carta
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay mas cartas en el deck';
    }
    const carta = deck.pop();

    return carta;
}

//definimos el valor de la carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length-1);
    //funcion reducida con ternario, muy similar a lo que figura comentado dentro de la misma llave.
    return (isNaN(valor)) ? 
          (valor === 'A') ? 11 : 10
          : valor * 1;  //multiplico por un 1 para pasarlo de string a number.
      
    // if(isNaN(valor)) {
    //         puntos = (valor === 'A') ? 11 : 10;
    // } else {    
    //         puntos =valor * 1; 
    // }
}

//turno de la pc para jugar
const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
    
        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;//uso de backticks para poder insertar el bloque de codigo de JS con ${}.
        imgCarta.classList.add("carta"); //para manipular el tamaño de la carta.
        divCartasCompu.append(imgCarta);
        
        if(puntosMinimos > 21) {
            break;
        }

    } while((puntosComputadora<puntosMinimos) && (puntosMinimos <= 21));

//el setTimeout() lo utilizamos unicamente para generar una pequeña demora de milisegundos y que las cartas se vean antes de los alerts.
    setTimeout(() => {
        if(puntosComputadora === puntosMinimos) {
            alert("Empate, no hay ganadores");
        } else if(puntosMinimos > 21) {
            alert("Computadora Gana");
        } else if(puntosComputadora > 21) {
            alert("Jugador Gana")
        } else {
            alert("Computadora Gana");
        }

        }, 100);
    
}



//EVENTOS
//pedir cartas
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;//uso de backticks para poder insertar el bloque de codigo de JS con ${}.
    imgCarta.classList.add("carta"); //para manipular el tamaño de la carta.
    divCartasJug.append(imgCarta);

    if (puntosJugador > 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }

    
}) 

//Evitar que se pidan mas cartas y ceder el turno a la computadora
btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})

//Reiniciar el juego
btnNuevoJuego.addEventListener('click', () => {
    deck = [];
    crearDeck();

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    
    puntosJugador = 0;
    puntosComputadora = 0;
    
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    
    divCartasJug.innerHTML = '';
    divCartasCompu.innerHTML = '';
    // while (divCartasJug.firstChild) {
    //     divCartasJug.removeChild(divCartasJug.firstChild);
    // }
    // while (divCartasCompu.firstChild) {
    //     divCartasCompu.removeChild(divCartasCompu.firstChild);
    // }
})