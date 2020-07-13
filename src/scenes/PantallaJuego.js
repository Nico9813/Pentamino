import React from 'react';
import { StatusBar, Button, View, Text } from 'react-native';
import { AppLoading } from 'expo';
import { Container, H2, Right, Left } from 'native-base';

import { connect } from 'react-redux';
import { cambiarMatrizTableroActual, quitarPiezaDisponibles, quitarPiezaTablero, agregarPiezaDisponibles, agregarPiezaTablero, completarNivel, reiniciarPiezas } from '../data/acciones';

import TableroComponent from '../components/TableroComponent';

import Tablero from '../domain/tablero';
import { TAM_TABLERO_ALTO, TAM_TABLERO_ANCHO } from '../styles/constantes';

import { Styles } from '../styles/styles';
import Matriz from '../domain/matriz';
import { TouchableOpacity } from 'react-native-gesture-handler';

class PantallaJuego extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ready: false,
        };
    }

    async componentDidMount(){
        await new Promise((resolve, reject) => this.loadLevel(resolve))

        this.setState({ready: true })
        
    }

    loadLevel(resolve){
        let nivel = this.props.navigation.state.params.nivel;
        let tablero = new Tablero(TAM_TABLERO_ALTO, TAM_TABLERO_ANCHO);
        tablero.matriz.instanciar_inhabilitados(TAM_TABLERO_ALTO - nivel.altura, 0);

        if (!nivel.completado) {
            nivel.piezasIniciales.forEach(pieza => {
                this.props._agregar_pieza_disponibles(pieza)
            });
            this.props._cambiar_matriz_tablero_actual(tablero.matriz.matriz);
        }else{
            nivel.resolucion.colocaciones.forEach(colocacion => {
                this.props._agregar_pieza_tablero(colocacion);
            })
            this.props._cambiar_matriz_tablero_actual(nivel.resolucion.matriz.matriz);
        }
        resolve();
    }

    ganarNivel(colocacionesFinales, matrizFinal){
        this.props._completar_nivel(this.props.navigation.state.params.nivel.numero, colocacionesFinales, matrizFinal)
        this.props._reiniciar_piezas([],[])
        this.props.navigation.navigate('Home');
    }

    reiniciarNivel(){
        let nivel = this.props.navigation.state.params.nivel;
        this.props._reiniciar_piezas(nivel.piezasIniciales,[])
        let matriz_inicial = new Matriz(TAM_TABLERO_ALTO, TAM_TABLERO_ANCHO);
        matriz_inicial.instanciar_inhabilitados(TAM_TABLERO_ALTO - nivel.altura, 0);
        console.log("REINICIOOOOO")
        this.props._cambiar_matriz_tablero_actual(matriz_inicial.matriz)
    }

    render() {

        let nivel = this.props.navigation.state.params.nivel;
        const Tablero = <TableroComponent pantalla={this} altura={nivel.altura} nivel={nivel}/>

        if(!this.state.ready){
            return (<AppLoading />)
        }else{
            return (
                <Container style={[Styles.fondo, { overflow: 'visible' }]}>
                    {Tablero}
                    <View style={Styles.container}>
                        <StatusBar></StatusBar>
                        <Right>
                            <H2 style={Styles.titulo}>Nivel {nivel.numero}</H2>
                            {(nivel.completado) ?
                                <TouchableOpacity onPress={() => console.log("activar")}><Text>REINICIAR</Text></TouchableOpacity> : <View></View>
                            }
                        </Right>
                    </View>
                </Container>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        _cambiar_matriz_tablero_actual: (matriz) => dispatch(cambiarMatrizTableroActual(matriz)),
        _completar_nivel: (nivel, colocaciones, matrizFinal) => dispatch(completarNivel(nivel, colocaciones, matrizFinal)),
        _quitar_pieza_disponibles: (pieza) => dispatch(quitarPiezaDisponibles(pieza)),
        _quitar_pieza_tablero: (pieza) => dispatch(quitarPiezaTablero(pieza)),
        _reiniciar_piezas: (disponibles, tablero) => dispatch(reiniciarPiezas(disponibles, tablero)),
        _agregar_pieza_disponibles: (pieza) => dispatch(agregarPiezaDisponibles(pieza)),
        _agregar_pieza_tablero: (pieza) => dispatch(agregarPiezaTablero(pieza)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PantallaJuego);

