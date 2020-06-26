class Pixel {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._color = ["#ADD8E6", "#87CEEB"][Math.floor(Math.random() * 2)];
        this._disponible;
        this._borde = false;
        this._divPixel = document.createElement('div');
        this._divPixel.style.backgroundColor = this._color;
        this._divPixel.classList.add("pixel");
        this._divPixel.value = this;
    }

    get borde() { return this._borde }
    get disponible() { return this._disponible; }
    get x() { return this._x; }
    get y() { return this._y; }
    get color() { return this._color; }
    get divPixel() { return this._divPixel; }

    set borde(bool) { this._borde = bool; }
    set disponible(bool) { this._disponible = bool; }
    set x(num) { this._x = num; }
    set y(num) { this._y = num; }
    set color(color) {
        this._color = color;
        this.divPixel.style.backgroundColor = color;
    }
}