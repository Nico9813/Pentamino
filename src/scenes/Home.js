import React, { useEffect, useState } from 'react';
import { Text, FlatList, StatusBar } from 'react-native';
import { Card, CardItem,H2, Container } from 'native-base';

import { Styles } from '../styles/styles';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { NivelesActuales } from '../NivelesActuales'
import AsyncStorage from '@react-native-community/async-storage';
const COLORES_LISTA = ['#6600cc', '#0099cc', '#4d9900','#cc0000']

export const Home = (props) => {

    const [niveles, setNiveles] = useState(NivelesActuales)
    const [ready, setReady ] = useState(false)

    useEffect(() =>{
        async function readData(){
            const keys = await AsyncStorage.getAllKeys()
            for(let i=0; i < keys.length; i++){
                const key = keys[i]
                const resolucion_actual = await AsyncStorage.getItem(key)
                niveles[key].completado = true
                niveles[key].resolucion = JSON.parse(resolucion_actual)
                setNiveles(niveles)
            }
        }
        readData()
    }, [])

    const goToLevel = (nivel) => {
        props.navigation.navigate('PantallaJuego', { nivel: nivel, completarLevel: completarLevel })
    }

    const getProximoNivel = (nivel) => niveles.find( nivel_actual => !nivel_actual.completado && nivel_actual.numero > nivel.numero)

    const completarLevel = (nivel, matrizFinal, colocacionesFinales) => {
        const proximo_nivel = getProximoNivel(nivel)
        if (proximo_nivel) props.navigation.navigate('PantallaJuego', { nivel: proximo_nivel, completarLevel: completarLevel })
        const colocaciones_sin_componente = colocacionesFinales.map(colocacion => {return({...colocacion, componente: null})})
        setNiveles(niveles.map(nivelActual => {
            return (nivelActual.numero != nivel.numero ? nivelActual : { ...nivelActual, completado: true, resolucion: { matrizFinal, colocaciones: colocacionesFinales } }
        )}))
        async function guardarResolucion(){
            await AsyncStorage.setItem(JSON.stringify(nivel.numero), JSON.stringify({ matrizFinal, colocaciones: colocaciones_sin_componente }))
        }
        guardarResolucion()
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



