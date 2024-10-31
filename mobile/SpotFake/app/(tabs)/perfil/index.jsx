import React, { useState } from "react";
import {View, Text, StyleSheet, Pressable, Image, ScrollView} from "react-native";
import { Link } from "expo-router";

export default Perfil = () => {
    const [ ] = useState('');

    return <ScrollView style={style.container}>
    <View style={style.body}>
    <View style={style.log} >
        <Image 
        style={style.image}
        source={require('../../../assets/images/seta-esquerda.png')}/>
        <Image 
        style={style.image}
        source={require('../../../assets/images/configuracao-do-usuario.png')}/>
    </View>
    <Image 
        style={style.foto}
        source={require('../../../assets/images/perfil-de-usuario.png')}/>
    <Text style={style.nome}>Flávia Neto</Text>
    
    </View>
    </ScrollView>
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#F5EEF8',
        height: '100%',
        width: '100%',
    },
    body: {
  
    },
    image: {
        width: 45,
        height: 45
    },
    log: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    foto: {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 110,
        height: 110
    },
    nome: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 40,
        color: '#5B2C6F',
        fontFamily: 'Mystery Quest',
        marginTop: 5,
        marginBottom: 20,
    },
    text: {
 
    },
    input: {

    },
    link: {
  
    },
    button: {
 
    },
    butt: {
      
    },
    butt2: {
       
    },
})