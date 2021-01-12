import { StyleSheet} from 'react-native';
import { INICIO_TABLERO, TAM_PARTE_PIEZA, TAM_PARTE_TABLERO, DIMENSIONES_PIEZA, TAM_TABLERO_ANCHO, TAM_TABLERO_ALTO } from './constantes'

export const Styles = StyleSheet.create({
    container: {
        backgroundColor:'black',
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center'
    },
    titulo:{
        color: 'white'
    },
    parte_pieza:{
        height: TAM_PARTE_PIEZA,
        width: TAM_PARTE_PIEZA
    },
    contenedor_tablero:{
        position: 'absolute',
        left: INICIO_TABLERO.x,
        top: INICIO_TABLERO.y,
    },
    contenedor_pieza:{
        height: TAM_PARTE_PIEZA * DIMENSIONES_PIEZA,
        width: TAM_PARTE_PIEZA * DIMENSIONES_PIEZA
    },
    parte_tablero:{
        height: TAM_PARTE_TABLERO,
        width: TAM_PARTE_TABLERO
    },
    parte_pieza_activa: {
        backgroundColor: 'red',
    },
    footer:{
        position: "absolute",
        top: 0
    }
});