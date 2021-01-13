import React from 'react';
import { View, TouchableOpacity, Text} from 'react-native';

import { Styles } from '../styles/styles';
import PiezaComponent from './PiezaComponent';

export const TableroComponent = (props) => {
    const { tablero, piezasDisponibles, agregarPieza, quitarPieza, piezasIniciales, completado } = props

    return(
        <>
            <View style={Styles.contenedor_tablero}>
                {
                    tablero.matriz.matriz.map((rowData, index) => ( //fila
                        <View key={index} style={[Styles.parte_tablero, { flexDirection: 'row' }]}>
                            {
                                rowData.map((cellData, cellIndex) => ( //Columna
                                    <TouchableOpacity disabled={completado} activeOpacity={0.95} key={cellIndex} onPress={() => quitarPieza(index, cellIndex)}>
                                        <View
                                            key={cellIndex}
                                            style={[
                                                Styles.parte_tablero,
                                                {   
                                                    borderWidth: 0.5, 
                                                    borderRadius: 3,
                                                    borderColor: 'white',
                                                    backgroundColor: (cellData) ? (cellData > 0) ? tablero.obtenerColorPiezaColocada(cellData) : 'grey' : 'black'
                                                }
                                            ]}>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    ))
                }

            </View>
            <View pointerEvents='box-none' style={[Styles.footer, { overflow: 'visible'}]}>
                <View style={{ flex: 1, flexDirection: 'column', overflow: 'visible' }}>
                    {piezasIniciales.map((item, index) =>
                        <PiezaComponent 
                            style={{ overflow: 'visible' }} 
                            key={index} 
                            pieza={item}
                            libre={piezasDisponibles.find(pieza => pieza.id == item.id)}
                            puedeAgregar={
                                (pieza, cordenadasTablero, cordenadasPieza) => 
                                    tablero.puedeCombinar(pieza, cordenadasTablero.y, cordenadasTablero.x, cordenadasPieza.x, cordenadasPieza.y)} 
                            agregarPieza={agregarPieza}
                        />
                    )}
                </View>
            </View>
        </>
    )
}