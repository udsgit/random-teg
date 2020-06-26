class Jugador {
    constructor(nombre, color, numMaxDado, totalDados) {
        this._nombre = nombre;
        this._color = color;
        this._objetivo;
        this._tarjetasPaises = new Array();
        this._cambios = 0;
        this._dados = new Array();
        this._divDados = document.createElement("div");
        this._incorporando = false;
        this._atacando = false;
        this._fichasDisponibles = 0;
        for (let i = 0; i < totalDados; i++) {
            this._dados.push(new Dado(numMaxDado));
        }
        this._fichasDisponibles = 0;
        this._maxDados = 0;
    }

    get maxDados() { return this._maxDados }
    get atacando() { return this._atacando; }
    get fichasDisponibles() { return this._fichasDisponibles; }
    get incorporando() { return this._incorporando; }
    get divDados() { return this._divDados; }
    get dados() { return this._dados; }
    get nombre() { return this._nombre; }
    get color() { return this._color; }
    get objetivo() { return this._objetivo; }
    get tarjetasPaises() { return this._tarjetasPaises; }
    get cambios() { return this._cambios; }
    get fichasDisponibles() { return this._fichasDisponibles; }

    set maxDados(num) { this._maxDados = num; }
    set atacando(bool) { this._atacando = bool; }
    set fichasDisponibles(num) {
        this._fichasDisponibles = num;
    }
    set incorporando(bool) { this._incorporando = bool; }
    set fichasDisponibles(num) { this._fichasDisponibles = num; }

    ordenarDados() {
        return this.dados.filter(e => e.activo == true).sort((a, b) => b.numeroActual - a.numeroActual);
    }

    mostrarDados(dados) {
        this.divDados.textContent = "";
        dados.forEach(e => {
            e.divDado.textContent = e.numeroActual;
            this.divDados.appendChild(e.divDado);
        });
    }

    reiniciarDados() {
        this.dados.forEach(e => {
            e.colorear();
            e.numeroActual = "?";
        })
    }

    tirarDados(numDados) {
        for (let i = 0; i < numDados; i++) {
            this.dados[i].activo = true;
            this.dados[i].tirar();
        }
        this.mostrarDados(this.ordenarDados());
        this.desactivarDados();
    }

    desactivarDados() {
        this.dados.forEach(e => {
            e.activo = false;
        });
    }






}