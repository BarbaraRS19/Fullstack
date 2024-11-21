import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Image } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { AppContext } from "../../scripts/AppContext";
import { router } from "expo-router";

export default SingUp = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const MudarEmail = (email) => setEmail(email);
    const MudarSenha = (senha) => setSenha(senha);
    const { userInfo, setUserInfo } = useContext(AppContext);

    const Login = async () => {
        if (email && senha) {
            try {
                const response = await axios.post(
                    'http://localhost:8000/login',
                    { "email": email, "senha": senha }
                );
                if (response.status === 200) {
                    const data = response.json()
                    alert('Usuário logado com sucesso!');
                    setUserInfo(data.userInfo);
                    if (data.userInfo.status == 'active') {
                        router.push('/perfil');
                    } else {
                        router.push('/pagamento');
                    }
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
            <View style={style.log} >
                <Image
                    style={style.image}
                    source={require('../../assets/images/reprodutor-de-musica.png')} />
                <Text style={style.logo}>PlaayShare</Text>
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
            <Link href="../" style={style.link}>
                <Text style={style.link}>Esqueci minha senha</Text>
            </Link>
            <Pressable style={style.button} onPress={Login}>
                <Text style={style.butt}> Acessar </Text>
            </Pressable>
            <Link href="./registro" >
                <Text style={style.butt2}>Cadastrar!</Text>
            </Link>
            <Link href="./perfil" >
                <Text style={style.butt2}>perfil!</Text>
            </Link>
            <Link href="./home" >
                <Text style={style.butt2}>home!</Text>
            </Link>
        </View>
    </SafeAreaView>
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