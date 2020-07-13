export const CAMBIAR_MATRIZ_TABLERO_ACTUAL = "CAMBIAR_MATRIZ_TABLERO_ACTUAL";
export const QUITAR_PIEZA_TABLERO = "QUITAR_PIEZA_TABLERO";
export const AGREGAR_PIEZA_TABLERO = "AGREGAR_PIEZA_TABLERO";
export const QUITAR_PIEZA_DISPONIBLES = "QUITAR_PIEZA_DISPONIBLES";
export const AGREGAR_PIEZA_DISPONIBLES = "AGREGAR_PIEZA_DISPONIBLES";
export const CAMBIAR_NIVEL = "CAMBIAR_NIVEL";
export const COMPLETAR_NIVEL = "COMPLETAR_NIVEL";
export const REINICIAR_PIEZAS = "REINICIAR_PIEZAS";

export const cambiarMatrizTableroActual = (matrizNueva) => {
    return {
        type: CAMBIAR_MATRIZ_TABLERO_ACTUAL,
        nuevaMatriz: matrizNueva
    }
}

export const quitarPiezaTablero = (pieza) => {
    return {
        type: QUITAR_PIEZA_TABLERO,
        piezaRetirada: pieza
    }
}

export const quitarPiezaDisponibles = (pieza) => {
    return {
        type: QUITAR_PIEZA_DISPONIBLES,
        piezaRetirada: pieza
    }
}

export const agregarPiezaTablero = (pieza) => {
    return {
        type: AGREGAR_PIEZA_TABLERO,
        nuevaPieza: pieza
    }
}

export const agregarPiezaDisponibles = (pieza) => {
    return {
        type: AGREGAR_PIEZA_DISPONIBLES,
        nuevaPieza: pieza
    }
}

export const cambiarNivel = (nivel) => {
    return {
        type: CAMBIAR_NIVEL,
        nuevoNivel: nivel
    }
}

export const completarNivel = (numeroNivel, colocaciones, matrizFinal) => {
    return {
        type: COMPLETAR_NIVEL,
        numeroNivel: numeroNivel,
        colocaciones: colocaciones,
        matriz: matrizFinal
    }
}

export const reiniciarPiezas = (disponibles, talbero) => {
    return {
        type: REINICIAR_PIEZAS,
        disponibles: disponibles,
        tablero: talbero,
    }
}




