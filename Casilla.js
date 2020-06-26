class Casilla {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._disponible;
        this._divCasilla = document.createElement("div");
        this._divCasilla.classList.add("casilla");
        this._divCasilla.value = this;
        this._pais;
    }

    get pais() { return this._pais; }
    get x() { return this._x; }
    get y() { return this._y; }
    get disponible() { return this._disponible; }
    get divCasilla() { return this._divCasilla; }

    set pais(pais) { this._pais = pais; }
    set x(num) { this._x = num; }
    set y(num) { this._y = num; }
    set disponible(bool) { this._disponible = bool; }
    set divCasilla(div) {
        this._divCasilla = div;
    }
}