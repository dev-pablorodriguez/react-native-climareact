import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Alert 
} from 'react-native';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () => {
  const [ busqueda, setBusqueda ] = useState({
    ciudad: '',
    pais: ''
  })
  const [ result, setResult ] = useState({});
  const [ bgColor, setBgColor ] = useState('rgb(71, 149, 212)');

  const { ciudad, pais } = busqueda;

  const consultarClima = async () => {
    if(ciudad.trim() === '' || pais.trim() === ''){
      Alert.alert('Error', 'Agrega una ciudad y país para la búsqueda.');
      return;
    }

    //el API Key de openweathermap puede ser obtenida desde su sitio web, fue eliminada por motivos de seguridad
    const apiKey = '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ ciudad },${ pais }&appid=${ apiKey }`

    try {
      const response = await fetch(url);
      const data = await response.json()

      if(data.cod != 200){
        throw new Error(data.message);
      }

      setResult(data);

      //Modifica los colores de fondo basado en la temperatura
      const kelvin = 273.15;
      const { main } = data;
      const actual = main.temp - kelvin;

      if(actual < 10){
        setBgColor('rgb(105, 108, 149)');

      }else if(actual >= 10 && actual < 25){
        setBgColor('rgb(71, 149, 212)');
        
      }else{
        setBgColor('rgb(178, 28, 61)');
      }


    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  //Settings
  const showClimaComponent = Object.keys(result).length > 0;

  const hideKeboard = () => {
    Keyboard.dismiss();
  }

  const bgColorApp = {
    backgroundColor: bgColor
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={ () => hideKeboard() }>
        <View style={[ styles.app, bgColorApp ]}>
          <View style={ styles.contenido }>
            { showClimaComponent && <Clima result={ result } /> }
            <Formulario
              busqueda={ busqueda }
              setBusqueda={ setBusqueda }
              consultarClima={ consultarClima }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
