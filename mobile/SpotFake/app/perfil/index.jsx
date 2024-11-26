
import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView, Modal, TouchableOpacity, TextInput } from "react-native";
import { Link } from "expo-router";
import { AppContext } from "../../scripts/AppContext";
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
    const [image, setImage] = useState('../../assets/images/logo.png');
    const [novaImagem, setNovaImagem] = useState(false);

    useEffect(() => {
        if (userInfo.profile_image) {
            setImage(userInfo.profile_image)
        }
    }, [])

    const enviar = async () => {
        try {
            const data = {
                "file": image,
                "upload_preset": 'ml_default',
            }
            const res = await fetch('https://api.cloudinary.com/v1_1/dtsbwcpgv/upload', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)

            });

            const result = await res.json();
            setImage(result.url);
            setUserInfo({ ...userInfo, profile_image: result.url })
            await enviarBD(result)
        } catch (e) {
            console.log(e);
        }
    };

    const enviarBD = async (result) => {
        const response = await fetch(`http://localhost:8000/usuarios/trocaImg/${userInfo.id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: result.url })
        });
        if (response.status === 200) {
            await response.json()
            alert('Imagem atualizada com sucesso')
            return
        }
        alert('Houve um erro ao atualizar a imagem')
    }
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Precisamos da permissão para acessar a galeria!');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setNovaImagem(true);
        }
    };
    

    return (
        <ScrollView style={style.container}>
            <View style={style.body}>
                <View style={style.log}>
                    <Link href="/" style={style.link}>
                        <Image
                            style={style.image}
                            source={require('../../assets/images/seta-esquerda.png')} />
                    </Link>
                    <Link href="../pagamento" style={style.link}>
                        <Image
                            style={style.image}
                            source={require('../../assets/images/configuracao-do-usuario.png')} />
                    </Link>
                </View>
                <TouchableOpacity onPress={pickImage}>
                    <Image source={{ uri: image }} style={style.img} />
                    {novaImagem && (
                        <Pressable onPress={enviar} style={style.butt}>
                            <Text style={style.descricao}>Editar Foto</Text>
                        </Pressable>
                    )}
                </TouchableOpacity>
                <TextInput
                    style={style.input}
                    value={userInfo.username}
                    onChangeText={(text) => setData({ ...userInfo, username: text })}
                />
                <Text style={style.nome}>{userInfo.nome}</Text>
                <Text style={style.descricao}>{userInfo.sobrenome}</Text>
                <Text style={style.descricao}>{userInfo.dataNascimento}</Text>
                <Text style={style.descricao}>{userInfo.email}</Text>
                <Text style={style.descricao}>{userInfo.status}</Text>
            </View>
        </ScrollView>
    );
};


const style = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#F5EEF8',
        width: '100%',
    },
    body: {},
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
        fontSize: 20,
        color: '#5B2C6F',
        fontFamily: 'Mystery Quest',
        marginTop: 5,
        marginBottom: 20,
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
})
