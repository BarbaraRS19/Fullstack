import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { AppContext } from "../../../scripts/AppContext";
import {router} from 'expo-router'

export default Home = () => {
    const { userInfo, setUserInfo } = useContext(AppContext)
    const [artistas, setArtistas] = useState([]);
    const [albuns, setAlbuns] = useState([]);

    const Artistas = async () => {
        try {
            const response = await fetch('http://localhost:8000/pegarTodosArtistas/');
            const data = await response.json();
            setArtistas(data); 
            } catch (error) {
              alert('Erro ao carregar artistas:', error);
            }
          };

    const Albuns = async () => {
        try {
            const response = await fetch('http://localhost:8000/pegarAlbumsPorArtista/');
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
                    source={require('../../../assets/images/reprodutor-de-musica.png')} />
                <Text style={styles.logo}>PlaayShare</Text>
            </View>
            <Text style={styles.titulo}>Álbuns do Momento:</Text>
        <FlatList
        data={albuns}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <Text style={styles.descricao}>{item.nome}</Text>
        )}
      /> 
        <Text style={styles.titulo}>Artistas do Momento:</Text>
        <FlatList
        data={artistas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <Text style={styles.descricao}>{item.nome}</Text>
        )}
      />     
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#F5EEF8',
        width: '100%',
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
        fontSize: 40,
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
        gap: 10
    },
    logo: {
        fontSize: 60,
        color: '#5B2C6F',
        fontFamily: 'Mystery Quest',
        marginBottom: 20,
    },
 
})