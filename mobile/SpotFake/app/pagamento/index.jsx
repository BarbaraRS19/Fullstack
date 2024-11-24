import React, { useState } from "react";
import {View, Text, StyleSheet, TextInput, Pressable, Image} from "react-native";
import { Link } from "expo-router";

export default Pagamento = () => {
        const [nome, setNome] = useState('');
        const [numero, setNumero] = useState('');
        const [dataValidade, setDataValidade] = useState('');
        const [cvv, setCvv] = useState('');
        const MudarNome = (nome) => setNome(nome);
        const MudarNumero = (numero) => setNumero(numero);
        const MudarDataValidade = (dataValidade) => setDataValidade(dataValidade);
        const MudarCvv = (cvv) => setCvv(cvv);

    return <View style={style.container}>
    <View style={style.body}>
    <View style={style.log} >
        <Image 
        style={style.image}
        source={require('../../assets/images/logo.png')}/>
        <Text style={style.logo}>PlaayShare</Text>
    </View>
        <Text style={style.text}>Conta Bancária</Text>
        <Text style={style.text2}>Adicionar Cartão</Text>
        <TextInput 
                style={style.input}
                onChangeText={MudarNome}
                value={nome}
                placeholder=" Nome no Cartão"
        />
                <TextInput 
                style={style.input}
                onChangeText={MudarNumero}
                value={numero}
                placeholder=" Número do Cartão"
        />
                <TextInput 
                style={style.input}
                onChangeText={MudarDataValidade}
                value={dataValidade}
                placeholder=" Data de Validade"
        />
                <TextInput 
                style={style.input}
                onChangeText={MudarCvv}
                value={cvv}
                placeholder=" CVV"
        />
        <Link href="../" style={style.link}>
                <Text style={style.link}>Clique para Voltar!</Text>
            </Link>
    </View>
    </View>
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#F5EEF8',
        height: '100%',
        width: '100%',  
    },
    body: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',  
    },
    image: {
        width: 45,
        height: 45
    },
    log: {
        flexDirection: 'row',
        gap: 10
    },
    logo: {
        fontSize: 60,
        color: '#5B2C6F',
        fontFamily: 'Mystery Quest',
        marginBottom: 30,
    },
    text: {
        fontSize: 45,
        color: '#5B2C6F',
        fontFamily: 'Mystery Quest',
        marginBottom: 20,
    },
    text2: {
        fontSize: 35,
        color: '#8E44AD',
        fontFamily: 'Mystery Quest',
        marginBottom: 20,
        marginTop: 20,
    },
    input: {
        border: '1px solid #E8DAEF',
        backgroundColor: '#E8DAEF',
        fontSize: 15,
        marginBottom: 15,
        borderRadius: 50,
        color: '#5B2C6F',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
    },
    link: {
        color: '#5B2C6F',
        fontSize: 15,
        marginBottom: 30,
        marginTop: 20,
    },
    button: {
        border: '1px solid #5B2C6F',   
        borderRadius: 50,
        backgroundColor: '#5B2C6F',
        marginBottom: 30,
        marginTop: 20,
    },
    butt: {
        color: 'white',
        fontSize: 20,
    },
})