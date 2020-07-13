import { combineReducers } from "redux";
import * as Acciones from './acciones';

const tableroReducer = (tablero = [], accion) => {
    switch(accion.type){
        case Acciones.CAMBIAR_MATRIZ_TABLERO_ACTUAL:
            return accion.nuevaMatriz;
        default:
            return tablero;
    }
}

const piezasTableroReducer = (piezas_tablero = [], accion) => {
    let retorno;
    switch(accion.type){
        case Acciones.REINICIAR_PIEZAS:
            retorno = accion.tablero;
            break;
        case Acciones.AGREGAR_PIEZA_TABLERO:
            retorno = piezas_tablero.concat(accion.nuevaPieza);
            break;
        case Acciones.QUITAR_PIEZA_TABLERO:
            retorno = piezas_tablero.filter(colocacion => colocacion.id != accion.piezaRetirada.id)
            break;
        default:
            retorno = piezas_tablero;
            break;
    }
    return retorno;
}

const piezasReducer = (piezas = [], accion) => {
    let retorno;
    switch(accion.type){
        case Acciones.REINICIAR_PIEZAS:
            retorno = accion.disponibles;
            break;
        case Acciones.AGREGAR_PIEZA_DISPONIBLES:
            retorno = piezas.concat(accion.nuevaPieza);
            break;
        case Acciones.QUITAR_PIEZA_DISPONIBLES:
            retorno = piezas.filter(pieza => pieza.id != accion.piezaRetirada.id)
            break;
        default:
            retorno = piezas;
            break;
    }
    return retorno;
}

const completarNivel = (nivel, resolucion) => {
    if(nivel.numero == resolucion.numeroNivel){
        return {
            ...nivel,
            completado: true, 
            resolucion: 
            { 
                colocaciones: resolucion.colocaciones,
                matriz: resolucion.matriz
            }
        }
    }
    return nivel;
}

const nivelesReducer = (niveles = [], accion) => {
    switch(accion.type){
        case Acciones.COMPLETAR_NIVEL:
            return niveles.map(nivel => completarNivel(nivel,accion))
        default: 
            return niveles;
    }
}

let rootReducer = combineReducers({
    matriz_tablero_actual: tableroReducer,
    piezas_tablero_actual: piezasTableroReducer,
    piezas_actuales: piezasReducer,
    niveles: nivelesReducer
})

export {rootReducer};