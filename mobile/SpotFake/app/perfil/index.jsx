
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
    const [modal, setModal] = useState(false)
    const [novaSenha, setNovaSenha] = useState('')
    const [confirma, setConfirma] = useState('')

    useEffect(() => {
        if (userInfo.image) {
            setImage(userInfo.image)
        }
    }, [])

    const enviar = async () => {
        try {
            const data = {
                "file": image,
                "upload_preset": 'ml_default',
                "name": 'teste'
            }
            const res = await fetch('https://api.cloudinary.com/v1_1/dtsbwcpgv/upload', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            console.log(result.url);
            enviarBD(result.url);
            console.log(userInfo)
            setUserInfo({ ...userInfo, image: result.url })
            await mudaSenha(result)
        } catch (e) {
            console.log(e);
        }
    };

    const enviarBD = async (url) => {
        try {
            const res = await fetch('http://localhost:8000/', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ url: url })
            });
            const resData = await res.json();
            console.log(resData);
            if (res.status === 200) {
                console.log('Imagem enviada com sucesso!');
            } else if (res.status === 409) {
                console.log('Erro');
            }
        } catch (e) {
            console.log('Erro', e);
        }
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Desculpe, precisamos da permissão para acessar a galeria!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setNovaImagem(true);
        }
    };

    const mudaSenha = async () => {
        if (novaSenha !== confirma) {
            alert('Senhas Distintas')
            return
        }
        console.log(userInfo)
        const res = await fetch(`http://localhost:8000/autenticacao/mudarSenha/${userInfo.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ novaSenha: novaSenha })
        });
        if (res.status != 200) {
            alert('Ocorreu um Erro')
            setModal(false)
            return
        }
        alert('Senha Alterada')
        setModal(false)
    }

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
                <Text style={style.descricao}>{userInfo.email}</Text>
                <Text style={style.descricao}>{userInfo.senha}</Text>
                <Text style={style.descricao}>{userInfo.status}</Text>

                <Pressable onPress={mudaSenha} style={style.butt}>
                    <Text style={style.descricao}>Alterar Senha</Text>
                </Pressable>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => setModal(false)}>
                    <View>
                        <View style={style.modalView}>
                            <TextInput
                                placeholder='Nova senha'
                                style={style.input}
                                onChangeText={setNovaSenha}
                                value={novaSenha}
                                secureTextEntry={true}
                            />
                            <TextInput
                                placeholder='Confirmar senha'
                                style={style.input}
                                onChangeText={setConfirma}
                                value={confirma}
                                secureTextEntry={true}
                            />
                            <Pressable onPress={mudaSenha} style={style.butt}>
                                <Text style={style.descricao}>Alterar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
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
        fontSize: 25,
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
});
