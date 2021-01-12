import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { AppLoading } from 'expo';
import { Container, H2, Right } from 'native-base';

import {TableroComponent} from '../components/TableroComponent';

import Tablero from '../domain/tablero';
import { TAM_TABLERO_ALTO, TAM_TABLERO_ANCHO } from '../styles/constantes';

import { Styles } from '../styles/styles';

export const PantallaJuego = (props) => {
    const { nivel, completarLevel } = props.navigation.state.params
    
    const { altura, piezasIniciales, completado } = nivel

    const [tablero, setTablero] = useState(new Tablero(TAM_TABLERO_ALTO, TAM_TABLERO_ANCHO, altura))
    const [ piezasDisponibles, setPiezasDisponibles ] = useState([])

    useEffect( () => {
        let tableroInicial = new Tablero(TAM_TABLERO_ALTO, TAM_TABLERO_ANCHO, altura)
        if (completado){
            const {matrizFinal, colocaciones} = nivel.resolucion
            tableroInicial.matriz = matrizFinal
            tableroInicial.piezas = colocaciones
        }else{
            setPiezasDisponibles(piezasIniciales)
        }
        setTablero(tableroInicial)
    }, [])

    const quitarPiezaTablero = (x, y) => {
        let pieza_removida = tablero.quitarPieza(x, y)
        if(pieza_removida){
            setPiezasDisponibles(prevState => [...prevState, pieza_removida.pieza])
            pieza_removida.componente.reiniciarPieza()
        }
    }

    const ganarNivel = () => {
        props.navigation.navigate('Home');
        completarLevel(nivel, tablero.matriz, tablero.piezas)
    }

    const agregarPiezaTablero = (componente, pieza, cordenadas_tablero, cordenadas_pieza) => {
        tablero.agregarPieza(componente, pieza, cordenadas_tablero.y, cordenadas_tablero.x, cordenadas_pieza.x, cordenadas_pieza.y)
        setTablero(tablero)
        setPiezasDisponibles(prevState => [...prevState.filter(pieza_actual => pieza_actual.id != pieza.id)])
        if(tablero.estaCompleto()) ganarNivel()
    }

    return (
        <Container style={{ overflow: 'visible', backgroundColor:"black" }}>
            <TableroComponent tablero={tablero} completado={completado} piezasDisponibles={piezasDisponibles} piezasIniciales={piezasIniciales} agregarPieza={agregarPiezaTablero} quitarPieza={quitarPiezaTablero} ganarNivel={ganarNivel}/>
            <View style={Styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'}></StatusBar>
                <Right>
                    <H2 style={Styles.titulo}>Nivel {nivel.numero}</H2>
                </Right>
            </View>
        </Container>
    )
}