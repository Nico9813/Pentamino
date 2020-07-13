import React from 'react';
import { View, FlatList, Text, ScrollView } from 'react-native';

import PiezaComponent from './PiezaComponent';

import { connect } from 'react-redux';
import {ViewOverflow} from 'react-native-view-overflow';

import { Styles } from '../styles/styles';

class ListaPiezas extends React.Component {

    constructor(props){
        super(props)
    }

    renderPieza(pieza){
        return(
            <PiezaComponent pieza_id={pieza.id}/>
        )
    }

    render(){
        return (
            <View style={{ flex: 1, flexDirection: 'column', overflow: 'visible'}}>
                {this.props.piezasIniciales.map((item, index) =>
                    <PiezaComponent style={{ overflow: 'visible' }} key={index} pieza_id={item.id} tablero={this.props.tablero}/>
                )}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        piezas: state.piezas_actuales
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListaPiezas);