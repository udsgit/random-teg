class TarjetaSituacion {
    constructor(nombre, texto) {
        this._nombre = nombre;
        this._texto = texto;
    }
    get nombre() { return this._nombre; }
    get texto() { return this._texto; }
}