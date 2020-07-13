import React from 'react';
import { Button, Text, FlatList } from 'react-native';
import { Card, CardItem,H2, Container } from 'native-base';

import { Styles } from '../styles/styles';

import { connect } from 'react-redux';
import { cambiarMatrizTableroActual, agregarPiezaDisponibles } from '../data/acciones';

import { TouchableOpacity } from 'react-native-gesture-handler';
const COLORES_LISTA = ['#6600cc', '#0099cc', '#4d9900','#cc0000']

class Home extends React.Component{

    goToLevel(nivel){
        this.props.navigation.navigate('PantallaJuego', { nivel: nivel })
    }

    renderNivel(nivel, indice){
        return(
            <TouchableOpacity onPress={()=> this.goToLevel(nivel)}>
                <Card key={indice} style={{ backgroundColor: COLORES_LISTA[indice % COLORES_LISTA.length], borderRadius: 5, borderColor: 'black', alignContent: 'center', justifyContent: 'center'}}>
                    <CardItem key={indice} style={{ backgroundColor: nivel.completado ? 'green' : 'red', borderRadius: 5, alignContent: 'center', justifyContent: 'center'}}>
                        <Text key={indice} style={Styles.titulo}>Nivel {nivel.numero}</Text>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }

    render(){
        return (
            <Container style={[Styles.fondo, Styles.container]}>
                <H2 style={Styles.titulo}>Pinturillo</H2>
                <H2 style={Styles.titulo}>Niveles disponibles: {this.props.niveles.length}</H2>
                <Text></Text>
                <FlatList 
                    data={this.props.niveles}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem = {(item) => this.renderNivel(item.item, item.index)}
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        niveles: state.niveles
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        _cambiar_matriz_tablero_actual: (matriz) => dispatch(cambiarMatrizTableroActual(matriz)),
        _agregar_pieza_disponibles: (pieza) => dispatch(agregarPiezaDisponibles(pieza)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);



