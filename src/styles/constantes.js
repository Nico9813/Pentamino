import { Dimensions } from 'react-native';

const FACTOR_ALTO = Dimensions.get('window').height / 816;
const FACTOR_ANCHO = Dimensions.get('window').width / 432;

export const INICIO_TABLERO = {
    x: 140 * FACTOR_ANCHO,
    y: 100 * FACTOR_ALTO
}

export const TAM_PARTE_TABLERO = 50 * FACTOR_ALTO;
export const TAM_TABLERO_ANCHO = 5;
export const TAM_TABLERO_ALTO = 12;

export const TAM_PARTE_PIEZA = 25 * FACTOR_ALTO;
export const DIMENSIONES_PIEZA = 5;