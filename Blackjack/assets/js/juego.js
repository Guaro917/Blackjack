
const miBlackjack = (() => {
    'use strict'
//inicializamos
    let deck    = [];    
    const palos = ['C','D','H','S'],
          monos = ['A','J','Q','K'];

    let puntosJugadores = [];

    const puntosHTML = document.querySelectorAll("small"),
          divCartasJugadores = document.querySelectorAll(".divCartas"),
          btnPedir = document.querySelector("#btnPedir"),//Creamos el deck, introducimos primero cartas del 2 al 10, luego  A,J,Q,K 
          btnDetener = document.querySelector("#btnDetener"),
          btnNuevoJuego = document.querySelector("#btnNuevo");

    //FUNCIONES
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];

        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        
        btnPedir.disabled = false;
        btnDetener.disabled = false;

    }



    const crearDeck = () => {

        deck = [];
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
        return _.shuffle( deck );
    }

    // inicializarJuego();

    //Funcion para tomar carta
    const pedirCarta = () => {

        return (deck.length === 0) ? alert("No hay mas cartas en el deck") : deck.pop();
    }

    //definimos el valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? 
              (valor === 'A') ? 11 : 10
              : valor * 1;  //multiplico por un 1 para pasarlo de string a number.

    }

    //turno : 0 = primer jugador y el ultimo es la computadora
    const acumularPuntos = (carta,turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    //creamos la imagen de la carta
    const crearCarta = (carta,turno) => {
 
        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;//uso de backticks para poder insertar el bloque de codigo de JS con ${}.
        imgCarta.classList.add("carta"); //para manipular el tamaño de la carta.
        divCartasJugadores[turno].append(imgCarta);
        
    }

    //determinar el ganador
    const determinarGanador = () => {
        
        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        
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

    //turno de la pc para jugar
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();

            puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1);
            crearCarta(carta, puntosJugadores.length-1)
            
            if(puntosMinimos > 21) {
                break;
            }

        } while((puntosComputadora<puntosMinimos) && (puntosMinimos <= 21));
    
        determinarGanador();       
        
    }



    //EVENTOS
    //pedir cartas
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        
        crearCarta(carta,0);

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
        turnoComputadora(puntosJugadores[0]);
    })

    //Reiniciar el juego
    btnNuevoJuego.addEventListener('click', () => {
 
        inicializarJuego();



    })
    //lo unico que quedara publico es esto, a traves del return permitimos que se inicialize el juego por ej desde la consola, o desde el mismo html si quisieramos
    return {
        nuevoJuego: inicializarJuego
    }


})();
