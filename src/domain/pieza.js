import Matriz from "./matriz";

const DIMENSIONES_PIEZA = 5;


export default class Pieza{
    color;
    matriz;
    static cantidad_piezas = 0;
    id;

    constructor(color){
        this.color = color;
        Pieza.cantidad_piezas++;
        this.id = Pieza.cantidad_piezas;
        this.matriz = new Matriz(DIMENSIONES_PIEZA, DIMENSIONES_PIEZA);
    }

    instanciar(matriz_nueva){
        this.matriz.instanciar(matriz_nueva);
    }

    rotar_90_derecha(cantidadRotaciones){
        this.matriz.rotar_90_derecha(cantidadRotaciones);
    }

    getMatriz(){
        return this.matriz.matriz;
    }
}