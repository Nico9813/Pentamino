import React from 'react';
import { View, PanResponder, Animated, TouchableOpacity } from 'react-native';

import { Styles } from '../styles/styles';

import { connect } from 'react-redux';
import { cambiarMatrizTableroActual, quitarPiezaDisponibles, quitarPiezaTablero, agregarPiezaDisponibles, agregarPiezaTablero } from '../data/acciones';

import { INICIO_TABLERO, TAM_PARTE_TABLERO, TAM_PARTE_PIEZA, TAM_TABLERO_ANCHO, TAM_TABLERO_ALTO, DIMENSIONES_PIEZA } from '../styles/constantes'

class PiezaComponent extends React.Component {

    state = {
        pieza: this.props.piezaActual,
        cordenadasPieza: { x: 0, y: 0 },
        pan: new Animated.ValueXY(),
        scale: new Animated.Value(1),
        cordenadasValidas: true
    }

    componentDidMount(){

    }

    constructor(props) {

        super(props)

        this._val = { x: 0, y: 0 }
        this.state.pan.addListener((value) => this._val = value);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return gestureState.dx != 0 && gestureState.dy != 0;
            },
            onPanResponderGrant: (evt, gestureState) => {
                let cordenadas = this.getCordenadasPieza(evt.nativeEvent.locationX, evt.nativeEvent.locationY)
                this.setState({ ...this.state, 
                    cordenadasPieza: { x: evt.nativeEvent.locationX, y: evt.nativeEvent.locationY }, 
                    cordenadasValidas: this.state.pieza.matriz.matriz[cordenadas.y][cordenadas.x]
                })
            },
            onPanResponderMove: (evt, gesture) => { 
                if (this.state.cordenadasValidas == true){
                    this.state.pan.y.setValue(gesture.dy)
                    this.state.pan.x.setValue(gesture.dx)
                    if (evt.nativeEvent.pageX > INICIO_TABLERO.x) {
                        Animated.spring(this.state.scale, {
                            toValue: TAM_PARTE_TABLERO / TAM_PARTE_PIEZA
                        }).start();
                    }
                }
            },
            onPanResponderRelease: (e, gesture) => {
                if(this.state.cordenadasValidas == true){
                    if (this.estaEnTablero(gesture.moveX, gesture.moveY)) {

                        let cordenadasPieza = this.getCordenadasPieza(this.state.cordenadasPieza.x, this.state.cordenadasPieza.y)
                        let cordenadasTablero = this.getPosicionEnTablero(gesture.moveX, gesture.moveY)
                        if (this.props.tablero.puedeAgregar(this.props.piezaActual, cordenadasPieza, cordenadasTablero)) {
                            this.props.tablero.agregarPieza(this, this.state.pieza, cordenadasPieza, cordenadasTablero)
                        } else {
                            this.reiniciarPieza()
                        }
                    } else {
                        this.reiniciarPieza()
                    }
                }
            }
        });
    }

    reiniciarPieza(){
        Animated.parallel([
            Animated.spring(
                this.state.pan,
                { toValue: { x: 0, y: 0 } }
            ),
            Animated.spring(
                this.state.scale,
                { toValue: 1 }
            )
        ]).start()
    }

    getCordenadasPieza(x, y) {
        return {
            x: Math.floor(x / TAM_PARTE_PIEZA),
            y: Math.floor(y / TAM_PARTE_PIEZA),
        }
    }

    getPosicionEnTablero(x, y) {
        return {
            x: Math.floor((x - INICIO_TABLERO.x) / TAM_PARTE_TABLERO),
            y: Math.floor((y - INICIO_TABLERO.y) / TAM_PARTE_TABLERO),
        }
    }

    estaEnTablero(x, y) {
        return (x > INICIO_TABLERO.x && x < INICIO_TABLERO.x + TAM_PARTE_TABLERO * TAM_TABLERO_ANCHO) && (y > INICIO_TABLERO.y && y < INICIO_TABLERO.y + TAM_PARTE_TABLERO * TAM_TABLERO_ALTO)
    }

    rotarPieza() {
        this.state.pieza.matriz.rotar_90_derecha(1);
        this.setState({...this.state, pieza: this.state.pieza})
    }

    espejarPieza() {
        this.state.pieza.matriz.espejar();
        this.setState({ ...this.state, pieza: this.state.pieza })
    }

    piezaSeleccionada(columna, fila) {
        console.log("[" + columna + ',' + fila + ']');
    }

    render() {
        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={this.state.pan.getLayout()}>

                {(this.props.piezaActual != undefined) ?
                    <TouchableOpacity activeOpacity={0.5} onPress={() => this.rotarPieza()} onLongPress={() => this.espejarPieza()}>
                        <Animated.View style={[Styles.contenedor_pieza, { transform: [{ scale: this.state.scale }] }]} pointerEvents="box-only" >
                            {
                                this.props.piezaActual.matriz.matriz.map((rowData, index) => (
                                    <View pointerEvents="none" key={index} style={[Styles.parte_pieza, { flexDirection: 'row'}]}>
                                        {
                                            rowData.map((cellData, cellIndex) => (
                                                <View pointerEvents="none" id={cellIndex} key={cellIndex}>
                                                    <View key={cellIndex} style={[Styles.parte_pieza, { flexDirection: 'column'}, (cellData != 0) && { backgroundColor: this.props.piezaActual.color, borderColor: 'white', borderWidth: 0.5, borderRadius:2}]}></View>
                                                </View>
                                            ))
                                        }
                                    </View>
                                ))
                            }
                        </Animated.View>
                    </TouchableOpacity>
                    :
                    <View>

                    </View>
                }
                
            </Animated.View>
        )
    }
}

const mapStateToProps = (state, prevPops) => {

    return {
        matriz: state.matriz_tablero_actual,
        piezas_tablero: state.piezas_tablero_actual,
        piezas: state.piezas_actuales,
        piezaActual: state.piezas_actuales.find(pieza => pieza.id == prevPops.pieza_id)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        _cambiar_matriz_tablero_actual: (matriz) => dispatch(cambiarMatrizTableroActual(matriz)),
        _quitar_pieza_disponibles: (pieza) => dispatch(quitarPiezaDisponibles(pieza)),
        _quitar_pieza_tablero: (pieza) => dispatch(quitarPiezaTablero(pieza)),
        _agregar_pieza_disponibles: (pieza) => dispatch(agregarPiezaDisponibles(pieza)),
        _agregar_pieza_tablero: (pieza) => dispatch(agregarPiezaTablero(pieza)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PiezaComponent);