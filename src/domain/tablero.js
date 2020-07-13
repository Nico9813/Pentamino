import Matriz from "./matriz";

export default class Tablero{
    dimensiones;
    matriz;
    piezas = [];
    static cantidad_piezas_colocadas = 0;

    constructor(n,m){
        this.dimensiones = {
            n: n,
            m: m
        };
        this.matriz = new Matriz(n,m);
    }

    puedeCombinar(nuevaPieza, x_tablero, y_tablero, x_pieza, y_pieza){
        return this.matriz.puede_combinar(nuevaPieza.matriz, x_tablero, y_tablero, x_pieza, y_pieza)
    }

    agregarPieza(componente, nuevaPieza, x_tablero, y_tablero, x_pieza, y_pieza){
        Tablero.cantidad_piezas_colocadas++;
        let pieza_colocada = {
            id: Tablero.cantidad_piezas_colocadas,
            componente: componente,
            pieza: nuevaPieza,
            x_tablero: x_tablero,
            y_tablero: y_tablero,
            x: x_pieza,
            y: y_pieza
        }
        this.piezas = [...this.piezas, pieza_colocada];
        pieza_colocada.pieza.matriz.remplazar_valor(1, pieza_colocada.id);
        this.matriz.superponer(pieza_colocada.pieza.matriz, x_tablero, y_tablero, x_pieza, y_pieza);
        return pieza_colocada;
    }

    quitarPieza(x, y){
        let valor_actual = this.matriz.matriz[x][y];
        let pieza_removida = null;
        if(valor_actual > 0){
            pieza_removida = this.obtenerPiezaColocada(valor_actual)
            this.matriz.remplazar_valor(valor_actual, 0);
            pieza_removida.pieza.matriz.remplazar_valor(pieza_removida.id, 1);
            this.piezas.filter(cololacion => cololacion.id != valor_actual);
        }
        return pieza_removida;
    }

    obtenerColorPiezaColocada(id){
        let pieza = this.obtenerPiezaColocada(id)
        if(pieza != null){
            return pieza.color;
        }
        return null;
    }

    estaCompleto(){
        return this.matriz.estaCompleta()
    }

    obtenerPiezaColocada(id){
        let colocacion = this.piezas.find(_colocacion => _colocacion.id == id);
        if (colocacion != null){
            return colocacion;
        }
        return null;
    }
}