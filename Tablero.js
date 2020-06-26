class Tablero {
    constructor(jugadores, tarjetasSituacion, objetivos, ...continentes) {
        this._jugadores = jugadores;
        this._continentes = continentes;
        this._tarjetasPaises = new Array();
        this._tarjetasSituacion = tarjetasSituacion;
        this._objetivos = objetivos;
        this._BODY = document.querySelector("BODY");
        this._divTablero = document.createElement("div");
        this._divTablero.classList.add("tableroNuevo");
        this._divTablero.value = this;
        this._divBandejaDados = document.createElement("div");
        this._divBandejaDados.classList.add("bandejaDados");
        this._divInterface = document.createElement("div");
        this._divInterface.classList.add("interface");
        this._divCombate = document.createElement("div");
        this._divCombate.classList.add("combate");
        this._zIndex = 100;
        this._top = 500;
        this._left = 500;
        this._divOcupados = new Array();
        this._divLibres = new Array({ top: this._top, left: this._left });
        this._BODY.textContent = "";
        this._BODY.appendChild(this._divTablero);
        this._BODY.appendChild(this._divInterface);
        if (this._continentes.length > 1) {
            this._totalPaises = this._continentes.reduce((p, e) => p.numPaises + e.numPaises);
        } else {
            this._totalPaises = this._continentes[0].numPaises;
        }
        this._x = 5;
        this._y = 5;
        this._casillas = new Array();
        this._disponibles = new Array();
        this._aleatorio = 0;
        this._xPais = 49;
        this._yPais = 49;
        this._pixelesPais = 9000;
        this._jugadorActual = 0;
        this._modoJuego = "incorporacionInicial_1";
        this._arrastrando;
    }

    get divCombate() { return this._divCombate; }
    get arrastrando() { return this._arrastrando; }
    get modoJuego() { return this._modoJuego; }
    get divInterface() { return this._divInterface; }
    get jugadorActual() { return this._jugadorActual; }
    get pixelesPais() { return this._pixelesPais; }
    get xPais() { return this._xPais; }
    get yPais() { return this._yPais; }
    get aleatorio() { return this._aleatorio; }
    get disponibles() { return this._disponibles; }
    get casillas() { return this._casillas; }
    get BODY() { return this._BODY; }
    get divBandejaDados() { return this._divBandejaDados; }
    get x() { return this._x; }
    get y() { return this._y; }
    get tarjetasPaises() { return this._tarjetasPaises; }
    get totalPaises() { return this._totalPaises; }
    get jugadores() { return this._jugadores; }
    get continentes() { return this._continentes; }
    get tarjetasSituacion() { return this._tarjetasSituacion; }
    get objetivos() { return this._objetivos; }
    get divTablero() { return this._divTablero; }
    get zIndex() { return this._zIndex; }
    get top() { return this._top; }
    get left() { return this._left; }
    get divOcupados() { return this._divOcupados; }
    get divLibres() { return this._divLibres; }

    set arrastrando(objeto) { this._arrastrando = objeto; }
    set modoJuego(modo) { this._modoJuego = modo; }
    set jugadorActual(num) { this._jugadorActual = num; }
    set pixelesPais(num) { this._pixelesPais = num; }
    set xPais(num) { this._xPais = num; }
    set yPais(num) { this._yPais = num; }
    set aleatorio(num) { this._aleatorio = num; }
    set disponibles(array) { this._disponibles = array; }
    set x(num) { this._x = num; }
    set y(num) { this._y = num; }
    set zIndex(n) { this._zIndex = n; }
    set top(n) { this._top = n; }
    set left(n) { this._left = n; }
    set divLibres(n) { this._divLibres = n; }
    set divOcupados(n) { this._divOcupados = n; }

    crearCasillasTablero() {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                this.divTablero.appendChild(new Casilla(x, y).divCasilla);
            }
        }
        let divCasillas = this.divTablero.querySelectorAll(".tableroNuevo div");
        for (let divCasilla of divCasillas) {
            this.casillas.push(divCasilla.value);
        }
    }

    agregarPaisesLimitrofes() {
        let casillasOcupadas = this.casillas.filter(e => e.disponible == false);
        this.casillas.forEach(c => {
            casillasOcupadas.forEach(o => {
                if (c.pais != undefined) {
                    if (o.x == c.x && o.y - 1 == c.y) {
                        c.pais.E = true;
                        o.pais.paisesLimitrofes.push(c.pais);
                    } else if (o.x == c.x && o.y + 1 == c.y) {
                        c.pais.O = true;
                        o.pais.paisesLimitrofes.push(c.pais);
                    } else if (o.x - 1 == c.x && o.y == c.y) {
                        c.pais.S = true;
                        o.pais.paisesLimitrofes.push(c.pais);
                    } else if (o.x + 1 == c.x && o.y == c.y) {
                        c.pais.N = true;
                        o.pais.paisesLimitrofes.push(c.pais);
                    }
                    if (o.x + 1 == c.x && o.y + 1 == c.y) {
                        c.pais.NO = true;
                    }
                    if (o.x + 1 == c.x && o.y - 1 == c.y) {
                        c.pais.NE = true;
                    }
                    if (o.x - 1 == c.x && o.y + 1 == c.y) {
                        c.pais.SO = true;
                    }
                    if (o.x - 1 == c.x && o.y - 1 == c.y) {
                        c.pais.SE = true;
                    }
                }
            });
        });
    }

    posiciones(o, posiciones) {
        if (o.pais.NO && o.pais.N && o.pais.O) {
            posiciones.push({ x: 0, y: 0 });
        }
        if (o.pais.NE && o.pais.N && o.pais.E) {
            posiciones.push({ x: 0, y: 99 });
        }
        if (o.pais.SO && o.pais.S && o.pais.O) {
            posiciones.push({ x: 99, y: 0 });
        }
        if (o.pais.SE && o.pais.S && o.pais.E) {
            posiciones.push({ x: 99, y: 99 });
        }
        return posiciones;
    }

    generarPixelesDelPais() {
        this.casillas.filter(e => e.disponible == false).forEach(o => {
            let posiciones = new Array();
            if (o.pais.N && o.pais.O && o.pais.S && o.pais.E) {    //NOSE
                posiciones.push({ x: 0, y: 49 }, { x: 99, y: 49 }, { x: 49, y: 0 }, { x: 49, y: 99 })
                o.pais.generarAleatoriamentePixelPais(o.divCasilla, 100, 8500, this.posiciones(o, posiciones));
            } else if (o.pais.N && o.pais.O && o.pais.S && o.pais.E == false) {    //NOS
                posiciones.push({ x: 0, y: 49 }, { x: 49, y: 0 }, { x: 99, y: 49 }, { x: 49, y: 49 });
                o.pais.generarAleatoriamentePixelPais(o.divCasilla, 100, 7500, this.posiciones(o, posiciones));
            } else if (o.pais.N && o.pais.O && o.pais.S == false && o.pais.E == false) {   //NO
                posiciones.push({ x: 0, y: 49 }, { x: 49, y: 0 }, { x: 49, y: 49 }, { x: 33, y: 33 });
                o.pais.generarAleatoriamentePixelPais(o.divCasilla, 100, 5000, this.posiciones(o, posiciones));
            } else if (o.pais.N && o.pais.O == false && o.pais.S == false && o.pais.E == false) {  //N
                posiciones.push({ x: 0, y: 49 }, { x: 33, y: 49 });
                o.pais.generarAleatoriamentePixelPais(o.divCasilla, 100, 2500, this.posiciones(o, posiciones));
            } else if (o.pais.E && o.pais.N && o.pais.O && o.pais.S == false) {  //ENO
                posiciones.push({ x: 0, y: 49 }, { x: 49, y: 0 }, { x: 49, y: 99 }, { x: 49, y: 49 });
                o.pais.generarAleatoriamentePixelPais(o.divCasilla, 100, 7500, this.posiciones(o, posiciones));
            } else if (o.pais.E && o.pais.N && o.pais.O == false && o.pais.S == false) {  //EN
                posiciones.push({ x: 0, y: 49 }, { x: 49, y: 99 }, { x: 49, y: 49 }, { x: 33, y: 66 });
                o.pais.generarAleatoriamentePixelPais(o.divCasilla, 100, 5000, this.posiciones(o, posiciones));
            } else if (o.pais.E && o.pais.N == false && o.pais.O == false && o.pais.S == false) {  //E
                posiciones.push({ x: 49, y: 99 }, { x: 49, y: 66 });
                o.pais.generarAleatoriamentePixelPais(o.divCasilla, 100, 2500, this.posiciones(o, posiciones));
            } else if (o.pais.O && o.pais.S && o.pais.E && o.pais.N == false) {  //OSE
                posiciones.push({ x: 49, y: 0 }, { x: 99, y: 49 }, { x: 49, y: 99 }, { x: 49, y: 49 });
                o.pais.generarAleatoriamentePixelPais(o.divCasilla, 100, 7500, this.posiciones(o, posiciones));
            } else if (o.pais.O && o.pais.S && o.pais.E == false && o.pais.N == false) {  //OS
                posiciones.push({ x: 49, y: 0 }, { x: 99, y: 49 }, { x: 66, y: 33 }, { x: 49, y: 49 });
                o.pais.generarAleatoriamentePixelPais(o.divCasilla, 100, 5000, this.posiciones(o, posiciones));
            } else if (o.pais.O && o.pais.S == false && o.pais.E == false && o.pais.N == false) {  //O
                posiciones.push({ x: 49, y: 0 }, { x: 49, y: 33 });
                o.pais.generarAleatoriamentePixelPais(o.divCasilla, 100, 2500, this.posiciones(o, posiciones));
            } else if (o.pais.S && o.pais.E && o.pais.N && o.pais.O == false) {  //SEN
                posiciones.push({ x: 0, y: 49 }, { x: 49, y: 99 }, { x: 99, y: 49 }, { x: 49, y: 49 });
                o.pais.generarAleatoriamentePixelPais(o.divCasilla, 100, 7500, this.posiciones(o, posiciones));
            } else if (o.pais.S && o.pais.E && o.pais.N == false && o.pais.O == false) {  //SE
                posiciones.push({ x: 99, y: 49 }, { x: 49, y: 99 }, { x: 66, y: 66 }, { x: 49, y: 49 });
                o.pais.generarAleatoriamentePixelPais(o.divCasilla, 100, 5000, this.posiciones(o, posiciones));
            } else if (o.pais.S && o.pais.E == false && o.pais.N == false && o.pais.O == false) {  //S
                posiciones.push({ x: 99, y: 49 }, { x: 66, y: 49 });
                o.pais.generarAleatoriamentePixelPais(o.divCasilla, 100, 2500, this.posiciones(o, posiciones));
            } else if (o.pais.N && o.pais.S && o.pais.E == false && o.pais.O == false) {  //NS
                posiciones.push({ x: 0, y: 49 }, { x: 33, y: 49 }, { x: 66, y: 49 }, { x: 99, y: 49 });
                o.pais.generarAleatoriamentePixelPais(o.divCasilla, 100, 5000, this.posiciones(o, posiciones));
            } else if (o.pais.O && o.pais.E && o.pais.N == false && o.pais.S == false) {  //OE
                posiciones.push({ x: 49, y: 0 }, { x: 49, y: 33 }, { x: 49, y: 66 }, { x: 49, y: 99 });
                o.pais.generarAleatoriamentePixelPais(o.divCasilla, 100, 5000, this.posiciones(o, posiciones));
            } else if (o.pais.N == false && o.pais.O == false && o.pais.S == false && o.pais.E == false) { //
                posiciones.push({ x: 49, y: 49 }, { x: 49, y: 33 }, { x: 49, y: 66 }, { x: 66, y: 49 });
                o.pais.generarAleatoriamentePixelPais(o.divCasilla, 100, 5000, this.posiciones(o, posiciones));
            }
        });
    }

    posicionarPaisAleatoriamente(pais) {
        /*let nombre = document.createElement("label");
        let numFichas = document.createElement("label");
        nombre.classList.add("nombrePais");
        numFichas.classList.add("numFichas");
        nombre.textContent = pais.nombre;
        numFichas.textContent = pais.numFichas;
        this.disponibles[this.aleatorio].divCasilla.appendChild(nombre);
        this.disponibles[this.aleatorio].divCasilla.appendChild(numFichas);*/
        this.disponibles[this.aleatorio].pais = pais;
        this.disponibles[this.aleatorio].divCasilla.addEventListener("click", this.pulsar);
        pais.divPais = this.disponibles[this.aleatorio].divCasilla;
        this.disponibles[this.aleatorio].disponible = false;
        this.casillas.filter(e => ((e.x == this.x && e.y == this.y - 1) || (e.x == this.x && e.y == this.y + 1) || (e.x == this.x - 1 && e.y == this.y) || (e.x == this.x + 1 && e.y == this.y)) && e.disponible != false).forEach(casilla => {
            casilla.disponible = true;
        });
        this.disponibles = this.casillas.filter(e => e.disponible == true);
        this.aleatorio = Math.floor(Math.random() * this.disponibles.length);
        if (this.disponibles[this.aleatorio] instanceof Casilla) {
            this.x = this.disponibles[this.aleatorio].x;
            this.y = this.disponibles[this.aleatorio].y;
            this.pixelesPais = 5000;
        }
    }

    posicionarContinente(num) {
        this.disponibles = new Array(this.casillas.find(e => e.x == this.x && e.y == this.y));
        this.continentes[num].paises.forEach(e => {
            this.posicionarPaisAleatoriamente(e);
        });
    }

    crearTarjetasPaises() {
        this.continentes.forEach(continente => {
            continente.paises.forEach(pais => {
                let tarjeta = new TarjetaPais(pais.nombre);
                tarjeta.crearTipoTarjeta();
                tarjeta.crearDivTarjeta();
                this.tarjetasPaises.push(tarjeta);
            });
        });
    }

    lanzarDadosPorTarjeta(jugadores) {
        jugadores.forEach(jugador => {
            jugador.tirarDados(1);
        });
        jugadores.forEach(jugador => {
            let h1 = document.createElement("h1");
            h1.textContent = jugador.nombre + ":";
            h1.style.display = "inline-block";
            h1.style.margin = "0px 10px 0px 5px";
            jugador.divDados.style.display = "inline-block";
            this.divBandejaDados.appendChild(h1);
            this.divBandejaDados.appendChild(jugador.divDados);
        });
        this.BODY.appendChild(this.divBandejaDados);
    }

    lanzar1DadoYComprobar(totalGanadores) {
        this.divBandejaDados.textContent = "";
        this.lanzarDadosPorTarjeta(this.jugadores);
        let ganadores = this.comprobarGanador(this.jugadores.slice(), totalGanadores);
        ganadores.forEach((e, i) => {
            console.log("Ganador " + (i + 1) + ": " + e.nombre + " porque sacó un " + e.dados[0].numeroActual);
        });
        return ganadores;
    }

    repartirTarjetasPaises() {
        this.repartirTarjetasAleatoriamente(this.jugadores, this.tarjetasPaises);
        if (this.tarjetasPaises.length > 0) {
            console.log("Ya se han repartido las tarjetas, pero ha(n) sobrado " + this.tarjetasPaises.length + ", habrá que tirar dados...");
            this.repartirTarjetasAleatoriamente(this.lanzar1DadoYComprobar(this.tarjetasPaises.length), this.tarjetasPaises);
        }
    }

    ordenarGanadores() {
        this.jugadores.sort((a, b) => b.dados[0].numeroActual - a.dados[0].numeroActual);
    }

    comprobarNumeroMayor(jugadores, mayor) {
        jugadores.forEach(e => {
            if (e.dados[0].numeroActual > mayor) {
                mayor = e.dados[0].numeroActual;
            }
        });
        return mayor;
    }

    comprobarGanador(jugadores, totalGanadores) {
        let ganadores = new Array();
        let seguir;
        do {
            let mayor = this.comprobarNumeroMayor(jugadores, 0);
            let posiblesGanadores = jugadores.filter(e => e.dados[0].numeroActual == mayor);
            if (posiblesGanadores.length + ganadores.length <= totalGanadores) {
                posiblesGanadores.forEach((e) => {
                    ganadores.push(e);
                });
                ganadores.forEach(ganador => {
                    jugadores.forEach(jugador => {
                        if (jugador == ganador) {
                            jugadores.splice(jugadores.indexOf(jugador), 1);
                        }
                    });
                });
                posiblesGanadores = [];
            }

            if (ganadores.length == totalGanadores) {
                seguir = false;
            }
            else if (posiblesGanadores.length + ganadores.length < totalGanadores) {
                seguir = true;
            } else if (posiblesGanadores.length + ganadores.length > totalGanadores) {
                jugadores = posiblesGanadores;
                this.lanzarDadosPorTarjeta(jugadores);
                seguir = true;
            }
        } while (seguir);
        return ganadores;
    }

    repartirTarjetasAleatoriamente(jugadores, tarjetas) {
        let totalTarjetasJugador = Math.trunc(tarjetas.length / jugadores.length);
        for (let i = 0; i < totalTarjetasJugador; i++) {
            jugadores.forEach(jugador => {
                let aleatorio = Math.floor(Math.random() * tarjetas.length);
                console.log(jugador.nombre + " recibe aleatoriamente la tarjeta del país de '" + tarjetas[aleatorio].nombre + "'");
                jugador.tarjetasPaises.push(tarjetas.splice(aleatorio, 1)[0]);
            });
        }
    }

    pulsar(e) {
        if (e.shiftKey) {
            //incorporando
            if ((this.parentNode.value.jugadores[this.parentNode.value.jugadorActual].incorporando) && (this.value.pais.pertenece == this.parentNode.value.jugadores[this.parentNode.value.jugadorActual])) {
                if (this.parentNode.value.jugadores[this.parentNode.value.jugadorActual].fichasDisponibles > 0) {
                    this.value.pais.agregarFichas(1);
                } else {
                    this.incorporando = false;
                    this.parentNode.value.divInterface.querySelector("#acabarTurno").disabled = false;
                }
                //atacando
            }
        } else {
            console.log(this.value.pais);
        }
    }

    atacar() {
        this.jugadores[this.jugadorActual].incorporando = false;
        this.jugadores[this.jugadorActual].atacando = true;
        if (this.jugadores[this.jugadorActual].atacando) {
            let misPaises = new Array();
            this.continentes.forEach(c => c.paises.forEach(p => {
                if (p.pertenece == this.jugadores[this.jugadorActual]) {
                    misPaises.push(p);
                }
            }));
            console.log(misPaises);
            misPaises.forEach(pais => {
                pais.fichas.forEach(ficha => {
                    ficha.divFicha.addEventListener("dragstart", this.arrastrarFicha);
                })
                pais.paisesLimitrofes.filter(pLimi => pLimi.pertenece != this.jugadores[this.jugadorActual]).forEach(e => {
                    e.divPais.addEventListener("dragover", this.arrastrarSobrePais);
                    e.divPais.addEventListener("drop", this.soltar);
                })
            });
            misPaises.filter(e => e.p)
        }
    }

    arrastrarFicha() {
        this.parentNode.parentNode.parentNode.value.arrastrando = this.parentNode.parentNode.value.pais;
    }

    arrastrarSobrePais(e) {
        e.preventDefault();
    }

    soltar() {
        console.log(this.parentNode.value.arrastrando);
        this.parentNode.value.arrastrando.atacar(this.value.pais);
    }




    ordenJuego() {
        switch (this.modoJuego) {
            case "incorporacionInicial_1":
                this.incorporacion(8);
                break;
            case "incorporacionInicial_2":
                this.incorporacion(4);
                break;
            case "rondaInicial":
                this.atacar();
                break;
            case "rondaNormal":
                break;
        }
    }

    siguienteModo() {
        if (this.modoJuego == "incorporacionInicial_1") {
            this.modoJuego = "incorporacionInicial_2";
            console.log("Ha comenzado el modo: 2º Incorporación inicial");
        } else if (this.modoJuego == "incorporacionInicial_2") {
            this.modoJuego = "rondaInicial";
            console.log("Ha comenzado el modo: Ronda inicial con combate clásico");
        } else if (this.modoJuego == "rondaInicial") {
            this.modoJuego = "rondaNormal";
            console.log("Ha comenzado el modo: Ronda normal");
        }
    }

    incorporacion(numFichas) {
        this.jugadores[this.jugadorActual].incorporando = true;
        this.jugadores[this.jugadorActual].fichasDisponibles += numFichas;
    }

    acabarTurno() {
        console.log(this);
        this.disabled = true;
        if (this.parentNode.previousElementSibling.value.jugadorActual < this.parentNode.previousElementSibling.value.jugadores.length - 1) {
            this.parentNode.previousElementSibling.value.jugadorActual++;
        } else {
            this.parentNode.previousElementSibling.value.jugadorActual = 0;
            this.parentNode.previousElementSibling.value.siguienteModo();
        }
        this.parentNode.previousElementSibling.value.ordenJuego();
        console.log("Es el turno del jugador Nº: " + (parseInt(this.parentNode.previousElementSibling.value.jugadorActual) + 1) + " que se llama " + this.parentNode.previousElementSibling.value.jugadores[this.parentNode.previousElementSibling.value.jugadorActual].nombre);
    }

    crearBotonAcabarTurnoInterface() {
        let boton = document.createElement("button");
        boton.textContent = "Acabar turno";
        boton.id = "acabarTurno";
        boton.addEventListener("click", this.acabarTurno);
        boton.disabled = true;
        this.divInterface.appendChild(boton);
    }

    modoCombate(atacante, defensor) {
        let nombreAtacante = document.createElement("h1");
        nombreAtacante.textContent = "Atacante: " + atacante.pertenece.nombre;
        let nombreDefensor = document.createElement("h1");
        nombreDefensor.textContent = "Defensor: " + defensor.pertenece.nombre;
        let botonCerrar = document.createElement("button");
        botonCerrar.classList.add("botonCerrar");
        botonCerrar.value = "×";
        botonCerrar.addEventListener("click", function () { this.parentNode.remove(); this.parentNode.textContent = ""; });
        let divBandejaDadoAtacante = document.createElement("div");
        divBandejaDadoAtacante.classList.add("bandejaDados");
        let divBandejaDadoDefensor = divBandejaDadoAtacante.cloneNode(true);
        atacante.pertenece.divDados.textContent = "";
        defensor.pertenece.divDados.textContent = "";
        divBandejaDadoAtacante.appendChild(atacante.pertenece.divDados);
        divBandejaDadoDefensor.appendChild(defensor.pertenece.divDados);
        let botonTirarAtacante = document.createElement("button");
        botonTirarAtacante.textContent = "Lanzar dados";
        botonTirarAtacante.classList.add("botonTirarDado")
        let botonTirarDadoDefensor = botonTirarAtacante.cloneNode(true);
        botonTirarDadoDefensor.disabled = true;
        atacante.pertenece.maxDados = atacante.divPais.parentNode.value.calculoCantidadDados(atacante);
        defensor.pertenece.maxDados = defensor.divPais.parentNode.value.calculoCantidadDados(defensor);
        let minDados;
        if (atacante.pertenece.maxDados > defensor.pertenece.maxDados) {
            minDados = defensor.pertenece.maxDados;
        } else {
            minDados = atacante.pertenece.maxDados;
        }
        atacante.pertenece.tirarDados(atacante.pertenece.maxDados);
        defensor.pertenece.tirarDados(defensor.pertenece.maxDados);
        atacante.pertenece.reiniciarDados();
        defensor.pertenece.reiniciarDados();
        botonTirarAtacante.addEventListener("click", function () {
            atacante.pertenece.tirarDados(atacante.pertenece.maxDados);
            botonTirarDadoDefensor.disabled = false;
            this.disabled = true;
        });
        botonTirarDadoDefensor.addEventListener("click", function () {
            defensor.pertenece.tirarDados(defensor.pertenece.maxDados);
            botonTirarAtacante.disabled = false;
            this.disabled = true;
            defensor.divPais.parentNode.value.comprobarResultado(atacante.pertenece, defensor.pertenece, minDados);
        });

        this.divCombate.appendChild(nombreAtacante);
        this.divCombate.appendChild(nombreDefensor);
        this.divCombate.appendChild(botonCerrar);
        this.divCombate.appendChild(atacante.divPais.cloneNode(true));
        this.divCombate.appendChild(defensor.divPais.cloneNode(true));
        this.divCombate.appendChild(document.createElement("label"));
        this.divCombate.appendChild(divBandejaDadoAtacante);
        this.divCombate.appendChild(divBandejaDadoDefensor);
        this.divCombate.appendChild(document.createElement("label"));
        this.divCombate.appendChild(botonTirarAtacante);
        this.divCombate.appendChild(botonTirarDadoDefensor);
        this.BODY.appendChild(this.divCombate);
    }

    comprobarResultado(atacante, defensor, minDados) {
        for (let i = 0; i < minDados; i++) {
            if (atacante.dados[i].numeroActual > defensor.dados[i].numeroActual) {
                atacante.dados[i].colorear("victoria");
                defensor.dados[i].colorear("derrota");
            } else {
                atacante.dados[i].colorear("derrota");
                defensor.dados[i].colorear("victoria");
            }
        }
    }

    calculoCantidadDados(pais) {
        if (pais.pertenece.atacando) {
            if (pais.numFichas >= 4) {
                return 3;
            } else if (pais.numFichas == 3) {
                return 2;
            } else if (pais.numFichas == 2) {
                return 1;
            }
        } else {
            if (pais.numFichas >= 3) {
                return 3;
            } else if (pais.numFichas == 2) {
                return 2;
            } else if (pais.numFichas == 1) {
                return 1;
            }
        }
    }



    colocarFichaEnCadaPais() {
        this.jugadores.forEach(jugador => {
            jugador.fichasDisponibles += jugador.tarjetasPaises.length;
            jugador.tarjetasPaises.forEach(tarjeta => {
                this.continentes.forEach(continente => {
                    continente.paises.forEach(pais => {
                        if (tarjeta.nombre == pais.nombre) {
                            pais.pertenece = jugador;
                            pais.agregarFichas(1);
                        }
                    })
                })

            });
        });
    }

    informacion() {
        console.log(this.value.pais);
    }
}