import { Home } from '../scenes/Home'
import { PantallaJuego } from '../scenes/PantallaJuego'

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const Navegador = createStackNavigator({
    Home: { screen: Home },
    PantallaJuego: {screen: PantallaJuego}
},
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerShown: false, 
            headerStyle: {
                backgroundColor: 'black',
            },

            headerTintColor: '#fff',
        },

    }
);

export default createAppContainer(Navegador);