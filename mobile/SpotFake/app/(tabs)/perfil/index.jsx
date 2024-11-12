import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView, SafeAreaView, Button, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { AppContext } from "../../../scripts/AppContext";
//import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import * as ImagePicker from 'expo-image-picker'

const cld = new Cloudinary({
    cloud: {
        cloudName: 'demo'
    },
    url: {
        secure: true
    }
})

const options = {
    upload_preset: 'sample_preset',
    unsigned: true,
}

export default Perfil = () => {
    const { userInfo, setUserInfo } = useContext(AppContext);
    const [image, setImage] = useState('../../../assets/images/perfil-de-usuario.png')
    const [novaImagem, setNovaImagem] = useState(false)

    const enviar = async () => {
        try{
            const data = {
                "file": image,
                "upload_preset": 'ml_default',
                "name": 'teste'
            }
            const res = await fetch('https://api.cloudinary.com/v1_1/dtsbwcpgv/upload', {
                method:'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            console.log(result.url)
            enviarBD(result.url)
        }
        catch (e) {
            console.log(e)
        }
    }

    const enviarBD = async (url) => {
        try{
            const data = {
                "file": image,
                "upload_preset": 'ml_default',
                "name": 'teste'
            }
            const res = await fetch('http://localhost:8000/1', {
                method:'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    url: url
                })
            });
            console.log(res)
            if(res.status === 200){
            console.log(res)
            }
            else if(res.status === 409){
                console.log(erro)
            }
        }        catch (e) {
            console.log(e)
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setNovaImagem(true)
        }
    }

    return <ScrollView style={style.container}>
        <View style={style.body}>
            <View style={style.log} >
                <Link href="/" style={style.link}>
                    <Image
                        style={style.image}
                        source={require('../../../assets/images/seta-esquerda.png')} />
                </Link>
                <Link href="../pagamento" style={style.link}>
                    <Image
                        style={style.image}
                        source={require('../../../assets/images/configuracao-do-usuario.png')} />
                </Link>
            </View>
            <TouchableOpacity onPress={pickImage}>
                {image && <Image source={{ uri: image }} style={style.img} />}
                {novaImagem && <Pressable onPress={enviar} style={style.butt}>
            <Text style={style.descricao}>Editar Foto</Text></Pressable>}
            </TouchableOpacity>
            <Text style={style.nome}>{userInfo.nome}</Text>
            <Text style={style.descricao}>{userInfo.sobrenome}</Text>
            <Text style={style.descricao}>{userInfo.email}</Text>
            <Text style={style.descricao}>{userInfo.senha}</Text>
            <Text style={style.descricao}>{userInfo.status}</Text>
        </View>
    </ScrollView>
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#F5EEF8',
        width: '100%',
    },
    body: {

    },
    image: {
        width: 45,
        height: 45
    },
    img: {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 100,
        height: 100, 
        borderRadius: 50,
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
    descricao: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 25,
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
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 25,
        color: '#5B2C6F',
        fontFamily: 'Mystery Quest',
        marginTop: 5,
        marginBottom: 20,
    },
    butt2: {

    }
})}