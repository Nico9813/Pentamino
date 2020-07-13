import { createStore } from 'redux';
import { rootReducer } from './reducers';
import Matriz from '../domain/matriz';
import { TAM_TABLERO_ALTO, TAM_TABLERO_ANCHO} from '../styles/constantes'
import { NivelesActuales } from '../NivelesActuales'

let matriz_inicial = new Matriz(TAM_TABLERO_ALTO, TAM_TABLERO_ANCHO);

const estado = {
    matriz_tablero_actual: matriz_inicial.matriz,
    piezas_tablero_actual: [],
    piezas_actuales: [],
    niveles: NivelesActuales
}

var configureStore = () => createStore(rootReducer, estado);

export default configureStore;