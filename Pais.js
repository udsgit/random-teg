class Pais {
    constructor(nombre, tablero) {
        this._nombre = nombre;
        this._continente;
        this._pertenece;
        this._fichas = new Array();
        this._numFichas = this._fichas.length;
        this._divPais = document.createElement("div");
        this._divTarjeta = document.createElement("div");
        this._width = 100;
        this._height = 100;
        this._colorBorde = "green"
        this._borde = 0;
        this._pixeles = new Array();
        this._disponible;
        this._paisesLimitrofes = new Array();
        this._N = false;
        this._O = false;
        this._E = false;
        this._S = false;
        this._NO = false;
        this._NE = false;
        this._SO = false;
        this._SE = false;
        this._zIndex = 0;
    }

    get zIndex() { return this._zIndex; }
    get N() { return this._N; }
    get O() { return this._O; }
    get E() { return this._E; }
    get S() { return this._S; }
    get NO() { return this._NO; }
    get NE() { return this._NE; }
    get SO() { return this._SO; }
    get SE() { return this._SE; }
    get paisesLimitrofes() { return this._paisesLimitrofes; }
    get disponible() { return this._disponible; }
    get pixeles() { return this._pixeles; }
    get nombre() { return this._nombre; }
    get continente() { return this._continente; }
    get pertenece() { return this._pertenece; }
    get fichas() { return this._fichas; }
    get numFichas() { return this._numFichas; }
    get divPais() { return this._divPais; }
    get divTarjeta() { return this._divTarjeta; }
    get width() { return this._width; }
    get height() { return this._height; }
    get borde() { return this._borde; }


    set zIndex(num) { this._zIndex = num; }
    set N(bool) { this._N = bool; }
    set O(bool) { this._O = bool; }
    set E(bool) { this._E = bool; }
    set S(bool) { this._S = bool; }
    set NO(bool) { this._NO = bool; }
    set NE(bool) { this._NE = bool; }
    set SO(bool) { this._SO = bool; }
    set SE(bool) { this._SE = bool; }
    set divPais(div) { this._divPais = div; }
    set disponible(bool) { this._disponible = bool; }
    set fichas(array) { this._fichas = array; }
    set numFichas(num) {
        this._numFichas = num;
        if (this.divPais.querySelector(".numFichas")) {
            this.divPais.querySelector(".numFichas").textContent = this._numFichas;
        }

    }
    set pertenece(Jugador) { this._pertenece = Jugador }
    set continente(nombre) { this._continente = nombre; }
    set divPais(div) { this._divPais = div; }
    set width(width) { this._width = width };
    set height(height) { this._height = height };

    generarAleatoriamentePixelPais(divCasilla, size, cantidad, arrayXY) {
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                divCasilla.appendChild(new Pixel(x, y).divPixel);
            }
        }
        let divPixeles = divCasilla.querySelectorAll("div");
        for (let divPixel of divPixeles) {
            this.pixeles.push(divPixel.value);
        }
        let disponibles = new Array();
        arrayXY.forEach(a => {
            this.pixeles.forEach(p => {
                if (p.x == a.x && p.y == a.y) {
                    p.disponible = true;
                    disponibles.push(p);
                }
            })
        })
        let aleatorio = Math.floor(Math.random() * disponibles.length);
        let x = disponibles[aleatorio].x;
        let y = disponibles[aleatorio].y;
        console.log(disponibles);
        for (let i = 0; i < cantidad; i++) {
            disponibles[aleatorio].color = ["#708090"][Math.floor(Math.random() * 1)];
            disponibles[aleatorio].disponible = false;
            this.pixeles.filter(e => ((e.x == x && e.y == y - 1) || (e.x == x && e.y == y + 1) || (e.x == x - 1 && e.y == y) || (e.x == x + 1 && e.y == y)) && e.disponible != false).forEach(pixel => {
                pixel.disponible = true;
            });
            disponibles = this.pixeles.filter(e => e.disponible == true);
            aleatorio = Math.floor(Math.random() * disponibles.length);
            if (disponibles[aleatorio] instanceof Pixel) {
                x = disponibles[aleatorio].x;
                y = disponibles[aleatorio].y;
            }
        }
        this.pixeles.forEach(p => {
            this.pixeles.filter(e => (e.disponible == false) && (p.disponible != false) && ((e.x == 0) || (e.x == 99) || (e.y == 0) || (e.y == 99) || (e.x == p.x && e.y == p.y - 1) || (e.x == p.x && e.y == p.y + 1) || (e.x == p.x - 1 && e.y == p.y) || (e.x == p.x + 1 && e.y == p.y))).forEach(pixel => {
                pixel.borde = true;
                pixel.divPixel.style.boxShadow = "0.5px 0.5px 5px black, -0.5px -0.5px 5px black";
                //pixel.color = "black";
            })
        })
    }

    atacar(paisEnemigo) {
        if (paisEnemigo.paisesLimitrofes.some(pL => pL == paisEnemigo.divPais.parentNode.value.arrastrando)) {
            console.log(this.nombre + " está atacando a " + paisEnemigo.nombre);
            this.divPais.parentNode.value.modoCombate(this,paisEnemigo);
        }
    }





   

    agregarFichas(num) {
        if (this.pertenece.fichasDisponibles > 0) {
            let filtro = this.pixeles.filter(e => e.disponible == false && e.x <= 50 && e.y <= 50);
            //this.colorearPais(pertenece.color);
            for (let i = 0; i < num; i++) {
                if (this.pertenece.fichasDisponibles > 0) {
                    let ficha = new Ficha(25, this.pertenece.color, 0);//this.zIndex++
                    this.fichas.push(ficha);
                    filtro[Math.floor(Math.random() * filtro.length)].divPixel.appendChild(ficha.divFicha);
                    console.log("Incorporando 1 ficha en " + "'" + this.nombre + "'");
                    this.pertenece.fichasDisponibles--;
                }
            }
            this.numFichas = this.fichas.length;

        }
    }

    limpiarFichas() {
        this.fichas = [];
        this.numFichas = this.fichas.length;
    }

    colorearPais(color) {
        Array.from(this.divPais.querySelectorAll(".pixel")).filter(divPixel => divPixel.value.disponible == false && divPixel.value.borde == false).forEach(e => {
            e.value.color = color;
        })
    }
}