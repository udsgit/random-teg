class Continente {
    constructor(nombre, arrayPaises = new Array()) {
        this._nombre = nombre;
        this._paises = arrayPaises;
        this._numPaises = arrayPaises.length;
        this._incorporacion = this._numPaises / 2;
        this._conquistado = false;

        this._paises.forEach(e => {
            e.continente = this._nombre;
        });

    }

    get nombre() { return this._nombre; }
    get paises() { return this._paises; }
    get numPaises() { return this._numPaises; }
    get incorporacion() { return this._incorporacion; }
    get conquistado() { return this._conquistado; }

    set numPaises(numPaises) {
        this._numPaises = numPaises;
        this.incorporacion = numPaises / 2;
    }
    set conquistado(conquistado) { this._conquistado = conquistado; }

    crearPaises(numPaises) {
        for (let i = 0; i < numPaises; i++) {
            this.paises.push(new Pais("i"));
        }
        this.numPaises = numPaises;
    }
}