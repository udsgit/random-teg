# teg-game

Juego interactivo inspirado en el T.E.G. (similar al RISK)

## Información sobre el proyecto

**Motivo:** Practicar JS.

**Fecha:** Diciembre 2019.

**Duración:** 1 Semana.

Durante las vacaciones de invierno he querido practicar JS y me propuse un reto para practicar, desarrollar el juego de mesa TEG (similar al RISK) y que generase el mapa de forma aleatoria usando Vanilla JS sin ningún tipo de librería, ya que hasta el momento es lo único que conocía porque llevaba 2 meses aprendiendo JS. Lo que se me ocurrió fue crear un tablero con GRID(CSS) y que cada loseta estuviera formado por 10.000 DIVS (100x100) y cada una de ellas representase un pixel para poder pintarlo. Luego distribuí el código por clases para tenerlo más ordenado y diseñe un algoritmo para que se crease aleatoriamente cada país y posteriormente sus países limítrofes manteniendo la forma del continente como si de una isla se tratase.

### Ejemplo de formas de tableros creados aleatoriamente.

![Screenshot](imagenes/readme/random.png)

### Ejemplo de Loseta random con zoom (se aprecia los 10.000 divs)

![Screenshot](imagenes/readme/zoom.png)

 El juego es funcional hasta el apartado 6, usaba el console log para ir informando de lo que pasaba.

1. Crear Menú inicial.
2. Crear tablero aleatoriamente.
3. Comenzar reparto de países (En caso impar, se tiraba un dado aleatoriamente para repartirse el país faltante).
4. Turno de incorporación de ficha (Se incorporaban las fichas iniciales, pasando el turno por cada jugador).
5. Turno de ataque (Al finalizar la ronda de incorporación ya se podía seleccionar un país limítrofe y atacar).
6. Lucha de país (Se tiraban los dados para el ataque).

## Guía de uso

Como el juego no lo acabé, no lo tengo desplegado, pero se puede clonar o descargar el repositorio.

1. Clonar/Descargar el repositorio.
2. Abrir "Index.html" en el navegador.
3. Añadir los jugadores junto al color elegido y crear el tablero *Puede tardar más de 20 segundos en generarse el mapa.
4. En la primera ronda se incorpora las fichas por cada jugador (8 fichas) (con control + click) a su país y luego se pulsa en finalizar turno. 
5. Al finalizar la ronda completa, se vuelve a incorporar la segunda ronda (4 fichas) de la misma manera.
6. Ahora comienza la ronda de ataque, y al arrastrar una ficha sobre el país limítrofe enemigo, aparecerá una ventana para atacar con los dados.

*Es importante tener la consola del navegador abierta, ya que la información de los países (al hacer click) y de lo que está pasando en el juego se muestran de esta manera.

## Conclusión final

Como parte negativa del proyecto, es que al usar tanta cantidad de divs el tablero tarda en crearse como 20 segundos o más, pero me sorprendió la locura que llegue a crear y sobre todo el algoritmo que me invente para la generación de los países. Lamentablemente el proyecto lo abandoné, ya que la idea inicial era practicar JS los conceptos básicos que había aprendido hasta la fecha y este proyecto se me había ido de las manos de lo avanzado que lo tenía.
