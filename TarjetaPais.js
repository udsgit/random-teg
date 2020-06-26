class TarjetaPais {
    constructor(nombre) {
        this._nombre = nombre;
        this._tipo = "sin asignar";
        this._continente = "sin asignar";
        this._divTarjeta = document.createElement("div");
    }
    get nombre() { return this._nombre; }
    get tipo() { return this._tipo; }
    get divTarjeta() { return this._divTarjeta; }
    get continente() { return this._continente; }

    set tipo(tipo) { this._tipo = tipo; }
    set continente(nombre) { this._continente = nombre; }

    crearTipoTarjeta() {
        let num = Math.floor(Math.random() * 100);
        if (num >= 0 && num < 29) {             //29%
            this.tipo = "barco";
        } else if (num >= 29 && num < 58) {     //29%
            this.tipo = "avion";
        } else if (num >= 58 && num < 87) {     //29%
            this.tipo = "tanque";
        } else if (num >= 87 && num < 93) {     //6%
            this.tipo = "comodin";
        } else if (num >= 93 && num < 100) {    //7%
            this.tipo = "superTarjeta";
        }
    }

    crearDivTarjeta() {
        this.divTarjeta.classList.add("tarjetaPais");
        let h1 = document.createElement("h1");
        let imagen = document.createElement("img");
        h1.textContent = this.nombre;
        imagen.src = "imagenes/tarjetas/" + this.tipo + ".png";
        imagen.style.objectFit = "cover";
        imagen.width = "100%";
        imagen.height = "100%";
        this.divTarjeta.appendChild(imagen);
        this.divTarjeta.appendChild(h1);
    }

}