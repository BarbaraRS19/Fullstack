import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, Image } from "react-native";
import { Link } from "expo-router";
import { router } from "expo-router";
import { AppContext } from "../scripts/AppContext.js";

const Login = () => {
    const [email, onChangeEmail] = React.useState("");
    const [senha, onChangePassword] = React.useState("");
    const { userInfo, setUserInfo } = useContext(AppContext);

    const fazerlogin = async () => {
        console.log(email);
        if (!email || !senha) {
            alert("Prencha todos os campos corretamente");
        }
        try {
            const resposta = await fetch('http://localhost:8000/autenticacao/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    senha,
                })
            });
        
            console.log(resposta);
            if (resposta.status === 200) {
                const dados = await resposta.json()
                setUserInfo(dados.userInfo)
                router.replace('./home');
                console.log(resposta);
            }
            else if (resposta.status == 409){
                alert("Email já cadastrado");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (<SafeAreaView style={style.container}>
                <View style={style.body}>
                     <View style={style.log} >
                       <Image
                         style={style.image}
                           source={require('../assets/images/logo.png')} />
                       <Text style={style.logo}>PlaayShare</Text>
                    </View>
                    <Text style={style.text}>Login</Text>
                    <TextInput
                        style={style.input}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder=" E-mail"
                    />
                    <TextInput
                        style={style.input}
                        onChangeText={onChangePassword}
                    value={senha}
                        secureTextEntry={true}
                        placeholder=" Senha"
                    />
                    <Link href="../" style={style.link}>
                       <Text style={style.link}>Esqueci minha senha</Text>
                 </Link>
                    <Pressable style={style.button} onPress={fazerlogin}>
                        <Text style={style.butt}> Acessar </Text>
                    </Pressable>
                    <Link href="./registro" >
                     <Text style={style.butt2}>Cadastrar!</Text>
                 </Link>
                </View>
            </SafeAreaView>
        )}
        
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
        marginBottom: 20,
    },
    text: {
        fontSize: 45,
        color: '#8E44AD',
        fontFamily: 'Mystery Quest',
        marginBottom: 20,
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
        fontSize: 10,
        marginBottom: 30,
    },
    button: {
        border: '1px solid #5B2C6F',
        borderRadius: 50,
        backgroundColor: '#5B2C6F',
        marginBottom: 20
    },
    butt: {
        color: 'white',
        fontSize: 20,
    },
    butt2: {
        color: '#5B2C6F',
        fontSize: 20,
    },
        })
        export default Login
