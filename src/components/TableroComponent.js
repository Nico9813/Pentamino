import React from 'react';
import { View, TouchableOpacity} from 'react-native';

import Tablero from '../domain/tablero';
import { TAM_TABLERO_ALTO, TAM_TABLERO_ANCHO } from '../styles/constantes';

import ListaPiezas from '../components/ListaPiezas';

import { connect } from 'react-redux';

import { Styles } from '../styles/styles';
import { cambiarMatrizTableroActual,  quitarPiezaDisponibles, quitarPiezaTablero, agregarPiezaDisponibles, agregarPiezaTablero } from '../data/acciones';

class TableroComponent extends React.Component {

    state = {
        tablero: new Tablero(TAM_TABLERO_ALTO, TAM_TABLERO_ANCHO)
    }

    constructor(props){
        super(props);
        console.log("Tablero")
        this.props.piezas_tablero.forEach(coloc => console.log("-" + coloc.pieza.color))
        console.log("Disponibles")
        this.props.piezas.forEach( pieza => console.log("-" + pieza.color))
    }

    componentDidMount() {
        this.state.tablero.matriz.matriz = this.props.matriz;
        this.state.tablero.piezas = this.props.nivel.completado ? this.props.nivel.resolucion.colocaciones : [];
    }

    puedeAgregar(pieza, cordenadasPieza, cordenadasTablero){
        return this.state.tablero.puedeCombinar(pieza, cordenadasTablero.y, cordenadasTablero.x, cordenadasPieza.x, cordenadasPieza.y);
    }

    estaCompleto(){
        return this.state.tablero.estaCompleto();
    }

    completarNivel(){
        this.props.pantalla.ganarNivel(this.state.tablero.piezas, this.state.tablero.matriz);
    }

    agregarPieza(piezaComponent, pieza, cordenadasPieza, cordenadasTablero){
        let pieza_agregada = this.state.tablero.agregarPieza(piezaComponent, pieza, cordenadasTablero.y, cordenadasTablero.x, cordenadasPieza.x, cordenadasPieza.y);
        if(pieza_agregada != null){
            this.props._cambiar_matriz_tablero_actual(this.state.tablero.matriz.matriz)
            this.props._agregar_pieza_tablero(pieza_agregada);
            this.props._quitar_pieza_disponibles(pieza_agregada.pieza);
        }
        if(this.estaCompleto()){
            this.completarNivel()
        }
    }

    quitarPieza(x, y){
        this.state.tablero.matriz.matriz = this.props.matriz;
        this.state.tablero.piezas = this.props.piezas_tablero;

        let pieza_removida = this.state.tablero.quitarPieza(x, y);
        if(pieza_removida != null){
            this.props._cambiar_matriz_tablero_actual(this.state.tablero.matriz.matriz)
            this.props._quitar_pieza_tablero(pieza_removida);
            this.props._agregar_pieza_disponibles(pieza_removida.pieza);
            pieza_removida.componente.reiniciarPieza();
        }
    }

    obtenerColorPiezacolocada(id){
        let colocacion = this.props.piezas_tablero.find(coloc => coloc.id == id);
        if(colocacion){
            return colocacion.pieza.color;
        }
        return null;
    }

    render() {
        return (
            <View>
                <View style={Styles.contenedor_tablero}>
                    {
                        this.props.matriz.map((rowData, index) => (
                            <View key={index} style={[Styles.parte_tablero, { flexDirection: 'row' }]}>
                                {
                                    rowData.map((cellData, cellIndex) => (
                                        <TouchableOpacity disabled={this.props.nivel.completado} activeOpacity={0.95} key={cellIndex} onPress={() => this.quitarPieza(index, cellIndex)}>
                                            <View key={cellIndex} style={[{ borderRadius: 5, borderWidth: 0.5, borderColor: 'white' }, Styles.parte_tablero, { flexDirection: 'column' }, (cellData > 0) && { backgroundColor: this.obtenerColorPiezacolocada(cellData) }, , (cellData == -1) && { backgroundColor: 'grey' }]}></View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        ))
                    }

                </View>
                    <View pointerEvents='box-none' style={[Styles.footer, { overflow: 'visible', backgroundColor: 'transparent' }]}>
                        <ListaPiezas tablero={this} piezasIniciales={this.props.nivel.piezasIniciales} />
                    </View>
            </View>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        matriz: state.matriz_tablero_actual,
        piezas_tablero: state.piezas_tablero_actual,
        piezas: state.piezas_actuales
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

export default connect(mapStateToProps, mapDispatchToProps)(TableroComponent);