import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { AppContext } from "../../scripts/AppContext.js";
import { router } from 'expo-router'
import { Link } from "expo-router";

export default Home = () => {
    const { userInfo, setUserInfo } = useContext(AppContext)
    const [artistas, setArtistas] = useState([]);
    const [albuns, setAlbuns] = useState([]);

    const Artistas = async () => {
        try {
            const response = await fetch('http://localhost:8000/artista/pegarTodosArtistas/');
            const data = await response.json();
            setArtistas(data);
        } catch (error) {
            alert('Erro ao carregar artistas:', error);
        }
    };

    const Albuns = async () => {
        try {
            const response = await fetch('http://localhost:8000/album/pegarAlbumsPorArtista/');
            const data = await response.json();
            setAlbuns(data);
        } catch (error) {
            alert('Erro ao carregar álbuns:', error);
        }
    };

    useEffect(() => {
        Artistas();
        Albuns();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.log} >
                <Image
                    style={styles.image}
                    source={require('../../assets/images/logo.png')} />
                <Text style={styles.logo}>PlaayShare</Text>
            </View>
            <Text style={styles.titulo}>Álbuns do Momento:</Text>
            <FlatList
                data={albuns}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.descricao}>
                    {item.title}
                    {item.releaseYear}
                    {item.coverImageURL}</Text>
                )}
            />
            <Text style={styles.titulo}>Artistas do Momento:</Text>
            <FlatList
                data={artistas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.descricao}>
                    {item.nome}
                    {item.bio}
                    {item.imageURL}</Text>
                )}
            />
            <View style={styles.link}>
            <Link href="/" style={styles.log}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/casa (1).png')} />
            </Link>
            <Link href="../home" style={styles.log}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/logo.png')} />
            </Link>
            <Link href="../perfil" style={styles.log}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/configuracao-do-usuario.png')} />
            </Link>
</View>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#F5EEF8',
        width: '100%',
        height: '100%'
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
    titulo: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 30,
        color: '#5B2C6F',
        fontFamily: 'Mystery Quest',
        marginTop: 5,
        marginBottom: 20,
    },
    image: {
        width: 45,
        height: 45
    },
    log: {
        flexDirection: 'row',
        gap: 10,
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 25
    },
    logo: {
        fontSize: 60,
        color: '#5B2C6F',
        fontFamily: 'Mystery Quest',
        marginBottom: 20,
    },
link: {
    flexDirection: 'row',
   justifyContent: 'space-around',
   backgroundColor: '#d7bde2',
   marginTop: 10
}
})