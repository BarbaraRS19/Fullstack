import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, ImageBackground } from 'react-native';
import { AppContext } from "../../scripts/AppContext.js";
import { Link } from "expo-router";

export default Home = () => {
    const { userInfo, setUserInfo } = useContext(AppContext);
    const [artistas, setArtistas] = useState([]);
    const [albuns, setAlbuns] = useState([]);

    const Artistas = async () => {
        try {
            const response = await fetch('http://localhost:8000/artista/');
            const data = await response.json();
            setArtistas(data);
        } catch (error) {
            alert('Erro ao carregar artistas:', error);
        }
    };

    const Albuns = async () => {
        try {
            const response = await fetch('http://localhost:8000/album/');
            const data = await response.json();
            setAlbuns(data);
        } catch (error) {
            alert('Erro ao carregar álbuns:', error);
        }
    };

    useEffect(() => {
        Artistas();
        Albuns();
    }, []);

    console.log(artistas)

    return (
        <View style={styles.container}>
            <View style={styles.log}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/logo.png')} />
                <Text style={styles.logo}>PlaayShare</Text>
            </View>
            <Text style={styles.titulo}>Álbuns do Momento:</Text>
            <FlatList
                horizontal={true}
                data={albuns}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <ImageBackground
                            style={styles.cardImage}
                            source={{ uri: item.coverImageUrl }}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardReleaseYear}>{item.releaseYear}</Text>
                        </ImageBackground>
                    </View>
                )}
            />
            <Text style={styles.titulo}>Artistas do Momento:</Text>
            <FlatList
                horizontal={true}
                data={artistas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            style={styles.cardImage}
                            source={{ uri: item.imageUrl }} />
                        <Text style={styles.cardTitle2}>{item.nome}</Text>
                        <Text style={styles.cardBio}>{item.bio}</Text>
                    </View>
                )}
            />
             <View style={styles.link}>
             <Link href="/" style={styles.log}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/casa (1).png')} />
            </Link>
            <Link href="../player" style={styles.log}>
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
    );
}

const styles = StyleSheet.create({
        container: {
        display: 'flex',
         backgroundColor: '#F5EEF8',
        width: '100%',
        height: '100%'
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
        marginTop: 20,
    },
    logo: {
        fontSize: 60,
        color: '#5B2C6F',
        fontFamily: 'Mystery Quest',
    },
    titulo: {
        fontSize: 30,
        color: '#5B2C6F',
        fontFamily: 'Mystery Quest',
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 10
    },
    card: {
        backgroundColor: '#5B2C6F',
        borderRadius: 12,
        marginHorizontal: 8,
        width: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden',
        display:  'flex',
        justifyContent: 'center',
        textAlign: 'center'
    },
    cardImage: {
        width: '100%',
        height: 150,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 8,
        marginTop: 10
       
    },
    cardTitle2: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 8,
        marginTop: 10
       
    },
    cardReleaseYear: {
        fontSize: 12,
        color: 'white',
        marginBottom: 20,
        marginLeft: 8,
    },
    cardBio: {
        fontSize: 12,
        color: '#ffffff',
        margin: 8,
        marginBottom: 30
    },
    link: {
        flexDirection: 'row',
       justifyContent: 'space-around',
       backgroundColor: '#d7bde2',
       marginTop: 10,
       marginBottom: 5
    }
});
