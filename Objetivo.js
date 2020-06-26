class Objetivo {
    constructor(tipo,objetivo) {
        this._tipo = tipo;
        this._objetivo = objetivo;
    }
    get tipo() { return this._tipo; }
    get objetivo() { return this._objetivo; }
}