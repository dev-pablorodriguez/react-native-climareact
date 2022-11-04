import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

const Clima = ({ result }) => {
    const { name, main} = result;
    const kelvin = 273.15
    const apiUrl = `https://openweathermap.org/img/w/${ result.weather[0].icon }.png`;
  return (
    <View style={ styles.clima }>
        <Text style={[ styles.texto, styles.actual ]}>{ parseInt( main.temp - kelvin ) }
            <Text style={ styles.grados }>&#x2103;</Text>
            <Image 
                style={{ width: 66, height: 59 }} 
                source={{ uri: apiUrl }}
            />
        </Text>

        <View style={ styles.tempMinMaxContainer }>
            <Text style={ styles.texto }>Min {''}
                <Text style={ styles.grados }>{ parseInt(main.temp_min - kelvin) }&#x2103;</Text>
            </Text>
            <Text style={ styles.texto }>Max {''}
                <Text style={ styles.grados }>{ parseInt(main.temp_max - kelvin) }&#x2103;</Text>
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    clima: {
        marginBottom: 20
    },
    texto: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginRight: 20
    },
    actual: {
        fontSize: 80,
        marginRight: 0,
        fontWeight: 'bold'
    },
    grados: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    tempMinMaxContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

export default Clima