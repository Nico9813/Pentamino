import React from 'react';
import { View, StatusBar} from 'react-native';
import { Container } from 'native-base';

import { Provider } from 'react-redux';
import configureStore from './src/data/store';

import Navegador from './src/navigation/navigation'

import { Styles } from './src/styles/styles';

const puzzleStore = configureStore();

export default function App() {
  return (
    <Container>
      <StatusBar></StatusBar>
      <Provider store={puzzleStore}>
      <Navegador />
      </Provider>
    </Container>
  );
}



