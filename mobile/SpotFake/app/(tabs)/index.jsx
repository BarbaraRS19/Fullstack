import React, { useState } from "react";
import {View, Text, StyleSheet, TextInput, Pressable, Image} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default SingUp = () => {
        const [email, setEmail] = useState('');
        const [senha, setSenha] = useState('');
        const MudarEmail = (email) => setEmail(email);
        const MudarSenha = (senha) => setSenha(senha);
        
    
        const Login = async () => {
            if (email && senha) {
                try {
                    const response = await axios.post(
                        'http://localhost:8000/login',
                        {"email": email, "senha": senha }
                    );
                    if (response.status === 200){
                        alert('Usuário criado com sucesso!')
                    }
                } catch (error) {
                    alert('Erro ao criar usuário!', error);
                }
            } else {
                alert('Dados incompletos, revise-os!');
            }
        };
    
    return <SafeAreaView style={style.container}>
    <View style={style.body}>
    <View >
        <Image 
        style={style.image}
        source={require('../../assets/images/reprodutor-de-musica.png')}/>
        <Text style={style.text}>PlaayShare</Text>
    </View>
        <Text style={style.text}>Login</Text>
        <TextInput 
                style={style.input}
                onChangeText={MudarEmail}
                value={email}
                placeholder=" E-mail"
        />
        <TextInput 
                style={style.input}
                onChangeText={MudarSenha}
                value={senha}
                secureTextEntry={true}
                placeholder=" Senha"
        />
            <Link href="../" >
            <br></br><Text>Esqueci minha senha</Text>
            </Link>
        <Pressable style={style.button} onPress={Login}>
        <Text> Acessar </Text>
        </Pressable>
        <Link href="./registro" >
                <br></br><Text>Cadastrar!</Text>
            </Link>
    </View>
    </SafeAreaView>
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#f2f3f4'
    },
    body: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',  
    },
    text: {
        fontSize: 50,
        color: '#4F4F4F',
        marginBottom: 30,
    },
    input: {
        border: '1px solid black',
        fontSize: 15,
        marginBottom: 20,
    },
    button: {
        border: '2px solid black',   
    },
    image: {
        width: 10,
        height: 10
    }
})