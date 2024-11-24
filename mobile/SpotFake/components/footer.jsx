import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Image, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { Link } from "expo-router";

const Footer = () => {
    const [tocando, setTocando] = useState(false);

    const pausa = () => {
        setTocando(!tocando); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.icones}>
                <TouchableOpacity style={styles.button}>
                    <Link href="/">
                    <Ionicons name="home" size={30} color="#fff" />
                    </Link>
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Link href="../app/home/index">
                    <Ionicons name="library" size={30} color="#fff" />
                    </Link>
                    <Text style={styles.text}>Biblioteca</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Link href="../app/perfil/index">
                    <Ionicons name="settings" size={30} color="#fff" />
                    </Link>
                    <Text style={styles.text}>Configurações</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.musicControls}>
                <TouchableOpacity style={styles.playPauseButton} onPress={pausa}>
                    <Ionicons name={tocando ? "pause" : "play"} size={50} color="#1DB954" />
                </TouchableOpacity>
                <Text style={styles.songStatus}>{tocando ? "Tocando" : "Pausado"}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#121212",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 1,
        borderTopColor: "#333",
    },
    icones: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    button: {
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 12,
        marginTop: 5,
    },
    musicControls: {
        marginTop: 10,
        alignItems: "center",
    },
    playPauseButton: {
        backgroundColor: "#fff",
        borderRadius: 50,
        padding: 10,
        marginBottom: 5,
    },
    songStatus: {
        color: "#fff",
        fontSize: 14,
    },
});

export default Footer;
