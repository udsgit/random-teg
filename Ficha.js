class Ficha {
    constructor(size, color,zIndex) {
        this._size = size;
        this._color = color;
        this._divFicha = document.createElement("div");
        this._divFicha.classList.add("ficha");
        this._divFicha.style.width = size + "px";
        this._divFicha.style.height = size + "px";
        this._divFicha.style.backgroundColor = color;
        this._divFicha.style.zIndex = zIndex;
        this._divFicha.value = this;
        this._divFicha.draggable = "true";
    }
    get size() { return this._size; }
    get color() { return this._color; }
    get divFicha() { return this._divFicha; }


}