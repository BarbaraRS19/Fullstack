import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { AppContext } from "../../../scripts/AppContext";
import {router} from 'expo-router'


export default Home = () => {
    const { userInfo, setUserInfo } = useContext(AppContext)

    return (
        <View style={styles.container}>
            
            <Text>Home page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#F5EEF8',
        width: '100%',
    },
 
})