import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { Link } from "expo-router";

const Player = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadAudio = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/audio/NickMattos-a-onde-foi-parar-nik-cbfafd01.mp3'), 
        { shouldPlay: false }
      );
      setSound(sound);
    };
    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const Pausar = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
       <View style={styles.log} >
       <Link href="../home" style={styles.link}>
            <Image
            style={styles.image}
            source={require('../../assets/images/seta-esquerda.png')} />
                    </Link>
            <Image
            style={styles.image}
            source={require('../../assets/images/logo.png')} />
            <Text style={styles.logo}>PlaayShare</Text>
        </View>
      <Image
        style={styles.imagem}
        source={require('../../assets/images/luan.png')} />
        <Text style={styles.descricao}>Luan Santana - Acordando o Prédio</Text>
        <Pressable style={styles.butt} onPress={Pausar}>
      <Text style={styles.butt}>
        {isPlaying ? 'Pausar' : 'Reproduzir'}
      </Text>
    </Pressable>
      
    </View>
  );
};

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
    image: {
        width: 45,
        height: 45,
    },
    imagem: {
        width: 200,
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20
    },
    log: {
        flexDirection: 'row',
        gap: 10,
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 25,
    },
    logo: {
        fontSize: 60,
        color: '#5B2C6F',
        fontFamily: 'Mystery Quest',
        marginBottom: 20,
    },
    link: {
    flexDirection: 'row',
       gap: 40,
       marginTop: 10,
    },
    butt: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 40,
        color: '#600090',
        fontFamily: 'Mystery Quest',
        marginTop: 5,
        marginBottom: 20,
    },
})

export default Player;

