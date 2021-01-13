import React from 'react';
import { StatusBar} from 'react-native';
import { Container } from 'native-base';

import Navegador from './src/navigation/navigation'

export default function App() {
  return (

    <Container>
      <StatusBar></StatusBar>
      <Navegador />
    </Container>
  );
}



