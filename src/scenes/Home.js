import React, { useState } from 'react';
import { Button, Text, FlatList, ImageBackground, StatusBar } from 'react-native';
import { Card, CardItem,H2, Container } from 'native-base';

import { Styles } from '../styles/styles';

import { connect } from 'react-redux';
import { cambiarMatrizTableroActual, agregarPiezaDisponibles } from '../data/acciones';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { NivelesActuales } from '../NivelesActuales'
const COLORES_LISTA = ['#6600cc', '#0099cc', '#4d9900','#cc0000']

export const Home = (props) => {

    const [niveles, setNiveles] = useState(NivelesActuales)

    const goToLevel = (nivel) => {
        props.navigation.navigate('PantallaJuego', { nivel: nivel, completarLevel: completarLevel })
    }

    const completarLevel = (nivel, matrizFinal, colocaciones) => {
        setNiveles(niveles.map(nivelActual => {
            return ( nivelActual.numero != nivel.numero ? nivelActual : {...nivelActual, completado: true, resolucion: {matrizFinal, colocaciones}}
           ) 
        }))
    }

    const renderNivel = (nivel, indice) => 
        <TouchableOpacity onPress={() => goToLevel(nivel)}>
            <Card key={indice} style={{ backgroundColor: COLORES_LISTA[indice % COLORES_LISTA.length], borderRadius: 5, borderColor: 'black', alignContent: 'center', justifyContent: 'center' }}>
                <CardItem key={indice} style={{ backgroundColor: nivel.completado ? 'green' : 'red', borderRadius: 5, alignContent: 'center', justifyContent: 'center' }}>
                    <Text key={indice} style={Styles.titulo}>Nivel {nivel.numero}</Text>
                </CardItem>
            </Card>
        </TouchableOpacity>

    return(
        <Container style={Styles.container}>
            <H2></H2>
            <StatusBar translucent={true} backgroundColor={'transparent'}></StatusBar>
            <H2 style={Styles.titulo}>Pinturillo</H2>
            <H2 style={Styles.titulo}>Niveles disponibles: {niveles.length}</H2>
            <Text></Text>
            <FlatList
                data={niveles}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => renderNivel(item.item, item.index)}
            />
        </Container>
    )
}



