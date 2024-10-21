import React, { useState } from "react";
import {View, Text, StyleSheet, TextInput, Pressable} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

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
            if (nome && sobrenome && email && senha) {
                try {
                    const response = await axios.post(
                        'https://taskhub-s37f.onrender.com/auth/signup',
                        { "name": nome, "sobrenome": sobrenome, "dataNascimento": dataNascimento, "email": email, "password": senha }
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
        <Text> Concluir </Text>
        </Pressable>
        <Pressable style={style.button} onPress={Registro}>
        <Text> Cancelar </Text>
        </Pressable>
        <Link href="../" >
                <br></br><Text>Clique para Voltar!</Text>
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
    }
})