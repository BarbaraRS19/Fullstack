import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Image } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

export default SingUp = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const MudarNome = (nome) => setNome(nome);
    const MudarSobrenome = (sobrenome) => setSobrenome(sobrenome);
    const MudarDataNascimento = (dataNascimento) => setDataNascimento(dataNascimento);
    const MudarEmail = (email) => setEmail(email);
    const MudarSenha = (senha) => setSenha(senha);

    const Registro = async () => {
        if (nome && sobrenome && dataNascimento && email && senha) {
            try {
                const response = await axios.post(
                    'http://localhost:8000/autenticacao/registro',
                    { "nome": nome, "sobrenome": sobrenome, "dataNascimento": dataNascimento, "email": email, "senha": senha }
                );
                if (response.status === 200) {
                    alert('Usuário criado com sucesso!')
                    router.push('/')
                }
            } catch (error) {
                alert('Erro ao criar usuário!', error);
                router.push('/')
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
                    source={require('../../assets/images/logo.png')} />
                <Text style={style.logo}>PlaayShare</Text>
            </View>
            <Text style={style.text}>Registre-se</Text>
            <TextInput
                style={style.input}
                onChangeText={MudarNome}
                value={nome}
                placeholder=" Nome"
            />
            <TextInput
                style={style.input}
                onChangeText={MudarSobrenome}
                value={sobrenome}
                placeholder=" Sobrenome"
            />
            <TextInput
                style={style.input}
                onChangeText={MudarDataNascimento}
                value={dataNascimento}
                placeholder=" dd/mm/aa"
            />
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
            <Pressable style={style.button} onPress={Registro}>
                <Text style={style.butt}> Concluir </Text>
            </Pressable>

            <Link href="../" style={style.link}>
                <Text style={style.link}>Clique para Voltar!</Text>
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
        fontSize: 15,
        marginBottom: 30,
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