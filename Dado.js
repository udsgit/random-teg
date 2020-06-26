class Dado {
    constructor(numeroMaxDado) {
        this._numeroActual = "?";
        this._numeros = new Array();
        this._numeroMaxDado = numeroMaxDado;
        this._activo = false;
        this._divDado = document.createElement("div");
        this._divDado.classList.add("dado");
        this._divDado.textContent = this.numeroActual;


        for (let i = 0; i < numeroMaxDado; i++) {
            this._numeros.push(i + 1);
        }
    }

    get activo() { return this._activo; }
    get numeroMaxDado() { return this._numeroMaxDado; }
    get numeroActual() { return this._numeroActual; }
    get numeros() { return this._numeros; }
    get divDado() { return this._divDado; }



    set numeroActual(numero) {
        this._numeroActual = numero;
        this.divDado.textContent = numero
    }
    set activo(bool) { this._activo = bool; }

    tirar() {
        this.numeroActual = this.numeros[Math.floor(Math.random() * this.numeroMaxDado)];
    }

    colorear(resultado) {
        switch (resultado) {
            case "victoria":
                this.divDado.style.backgroundColor = "#4caf50";
                break;
            case "derrota":
                this.divDado.style.backgroundColor = "#f44336";
                break;
            default:
                this.divDado.style.backgroundColor = "#fafafa";
                break;
        }

    }


}











