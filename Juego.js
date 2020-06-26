const AMERICA_DEL_SUR =
    new Continente("América Del Sur",
        [
            new Pais("Argentina"),
            new Pais("Uruguay"),
            new Pais("Bolivia"),
            new Pais("Chile"),
            new Pais("Paraguay"),
            new Pais("Brazil"),
            new Pais("Colombia"),
            new Pais("Venezuela")
        ]
    );

const OBJETIVOS = [
    new Objetivo("Matar", "Matar al Jugador de la Derecha"),
    new Objetivo("Matar", "Matar al Jugador de la Izquierda"),
    new Objetivo("Conquistar", "Conquistar Europa y América del Sur"),
    new Objetivo("Conquistar", "Conquistar América del Norte, África y 6 islas"),
    new Objetivo("Conquistar", "Conquistar 35 países")
];

const TARJETAS_DE_SITUACION = [
    new TarjetaSituacion("Descanso Ázul", "El jugador Ázul descansad esta ronda, puede incorporar, mover pero no atacar"),
    new TarjetaSituacion("Refuerzos Extra", "Cada jugador incorporará refuerzos 'extra' según el número de paises"),
    new TarjetaSituacion("Nieve", "Cada jugador que se defienda, utilizará un dado extra"),
    new TarjetaSituacion("Viento A Favor", "Cada jugador que ataque, utilizará un dado extra"),
    new TarjetaSituacion("Fronteras Cerradas", "Soló se puede atacar dentro de continentes")
];

const BODY = document.querySelector("body");
const BUTTON_JUGAR = document.querySelector("#jugar");

BUTTON_JUGAR.addEventListener("click", crearMenu);
let coloresDisponibles = [
    { nombre: "Rojo", codigo: "#f44336" },
    { nombre: "Ázul", codigo: "#2196f3" },
    { nombre: "Verde", codigo: "#4caf50" },
    { nombre: "Amarillo", codigo: "#ffeb3b" },
    { nombre: "Blanco", codigo: "#fafafa" },
    { nombre: "Negro", codigo: "#212121" }
];



let coloresNoDisponibles = [];

let num = 1;

var tablero;

function crearMenu() {
    BODY.textContent = "";
    let divMenu = document.createElement("div");
    let divCrearTablero = document.createElement("div");
    let br = document.createElement("br");
    let buttonMasJugadores = document.createElement("button");
    let buttonCrearTablero = document.createElement("button");
    let divJugador = crearJugador(coloresDisponibles);
    buttonMasJugadores.textContent = "+ Jugadores";
    buttonMasJugadores.addEventListener("click", function () { masJugadores(divMenu) });
    buttonCrearTablero.textContent = "Crear Tablero";
    buttonCrearTablero.addEventListener("click", crearTablero);
    divMenu.appendChild(divJugador);
    divCrearTablero.appendChild(br);
    divCrearTablero.appendChild(buttonMasJugadores);
    divCrearTablero.appendChild(buttonCrearTablero);
    BODY.appendChild(divMenu);
    BODY.appendChild(divCrearTablero);
}

function crearJugador(colores) {
    let div = document.createElement("div");
    let inputName = document.createElement("input");

    inputName.setAttribute("type", "text");
    inputName.name = "nombre";
    inputName.placeholder = "Nombre Jugador";
    div.appendChild(inputName);
    colores.forEach(color => {

        let inputRadioColor = document.createElement("input");
        let label = document.createElement("label");
        label.textContent = color.nombre;
        inputRadioColor.setAttribute("type", "radio");
        inputRadioColor.name = "color" + num;
        inputRadioColor.value = color.codigo;
        div.appendChild(label);
        div.appendChild(inputRadioColor);
        if (color == colores[0]) {
            inputRadioColor.checked = true;
        }
    })
    num++;
    return div;
}

function masJugadores(divMenu) {
    let div = crearJugador(coloresDisponibles);
    let buttonBorrar = document.createElement("button");
    buttonBorrar.textContent = "×"
    buttonBorrar.addEventListener("click", borrarJugador);
    div.appendChild(buttonBorrar);
    divMenu.appendChild(div);
}

function borrarJugador() {
    this.parentNode.remove();
}

function crearTablero() {
    let nombres = BODY.querySelectorAll("input[name='nombre']");
    let color = BODY.querySelectorAll("input[type='radio']:checked");



    //crear jugadores
    let jugadores = [];
    nombres.forEach((e, i, nombres) => {
        jugadores.push(new Jugador(nombres[i].value, color[i].value, 6, 4));
    });

    //crear tablero
    tablero = new Tablero(jugadores, TARJETAS_DE_SITUACION, OBJETIVOS, AMERICA_DEL_SUR);
    tablero.crearCasillasTablero();
    
    tablero.posicionarContinente(0);
    tablero.agregarPaisesLimitrofes();
    tablero.generarPixelesDelPais();


    let i = 1;
    tablero.jugadores.forEach(e => {
        console.log("Jugador " + i++ + ": " + e.nombre + " color: " + e.color);
    });
    console.log("Paises en total: " + tablero.totalPaises);
    console.log("Jugadores en total: " + tablero.jugadores.length)


    console.log("Como hay " + tablero.totalPaises + " paises, cada jugador tendra " + Math.trunc(tablero.totalPaises / tablero.jugadores.length) + " tarjetas de país");


    tablero.crearTarjetasPaises();
    console.log(tablero.tarjetasPaises);

    tablero.repartirTarjetasPaises();

    tablero.colocarFichaEnCadaPais();

    console.log("Listo, ya todos tienen fichas y paises, ahora vamos a lanzar dados para ver quién empieza");

    tablero.lanzar1DadoYComprobar(1);

    console.log("Vale ya tenemos quién sera el primer jugador, los siguientes serán según las agujas del reloj");
    console.log("Comenzaremos incorporando 8 fichas cada uno y luego 4");

    tablero.crearBotonAcabarTurnoInterface();
    tablero.ordenJuego();







   



}






















