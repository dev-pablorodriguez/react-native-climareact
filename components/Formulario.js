import React, { useState } from 'react'
import { 
    View, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableWithoutFeedback, 
    Animated
} from 'react-native'
import { Picker } from '@react-native-picker/picker'

const Formulario = ({ busqueda, setBusqueda, consultarClima}) => {
    const [ animacionBoton ] = useState(new Animated.Value(1));

    const { pais, ciudad } = busqueda;

    const animacionEntrada = () => {
        Animated.spring( animacionBoton, {
            toValue: 0.5,
            useNativeDriver: true
        }).start();
    }
    const animacionSalida = () => {
        Animated.spring( animacionBoton, {
            toValue: 1,
            friction: 1,//Rebote,
            tension: 30,
            useNativeDriver: true
        }).start();
    }

    const estiloAnimacion = {
        transform: [{ scale: animacionBoton }]
    }

    return (
        <>
            <View>
                <View>
                    <TextInput
                        value={ ciudad }
                        onChangeText={ ciudad => setBusqueda({ ...busqueda, ciudad }) }
                        style={ styles.input }
                        placeholder='Ciudad'
                        placeholderTextColor='#666'
                    />
                </View>
                <View>
                    <Picker
                        selectedValue={ pais }
                        onValueChange={ pais => setBusqueda({ ...busqueda, pais }) }
                        style={{ backgroundColor: '#FFF' }}
                    >
                        <Picker.Item label='-- Seleccione un país  --' value=''  />
                        <Picker.Item label='Chile' value='CL'  />
                        <Picker.Item label='Irlanda' value='IE'  />
                        <Picker.Item label='Reino Unido' value='UK'  />
                        <Picker.Item label='Estados Unidos' value='US'  />
                        <Picker.Item label='México' value='MX'  />
                        <Picker.Item label='Argentina' value='AR'  />
                        <Picker.Item label='Colombia' value='CO'  />
                        <Picker.Item label='Costa Rica' value='CR'  />
                        <Picker.Item label='España' value='ES'  />
                        <Picker.Item label='Perú' value='PE'  />
                    </Picker>
                </View>

                <TouchableWithoutFeedback
                    onPressIn={ animacionEntrada }
                    onPressOut={ animacionSalida }
                    onPress={ consultarClima }
                >
                    <Animated.View style={[ styles.btnBuscar, estiloAnimacion ]}>
                        <Text style={ styles.btnBuscarTexto }>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    btnBuscarTexto: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }
})

export default Formulario