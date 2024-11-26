import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Audio } from 'expo-av';

const PlayerScreen = () => {
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

  const togglePlayback = async () => {
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
            <Image
            style={styles.image}
            source={require('../../assets/images/logo.png')} />
            <Text style={styles.logo}>PlaayShare</Text>
        </View>
      <Image
        style={styles.image}
        source={require('../../assets/images/luan.png')} />
        <Text style={styles.title}>Luan Santana - Acordando o Prédio</Text>
      <Button
        title={isPlaying ? 'Pausar' : 'Reproduzir'}
        onPress={togglePlayback}
      />
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

export default PlayerScreen;

