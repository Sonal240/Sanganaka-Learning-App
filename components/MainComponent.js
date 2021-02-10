import { StatusBar } from 'expo-status-bar';
import React from 'react';
import styles from './styles/stylesheet.js';
import { Text, View, Image } from 'react-native';

export default function Start(props) {
    setTimeout(()=> {
        props.navigation.navigate('welcome');
    }, 3000)
    return (
        <View style={styles.container}>
            <Image
                source= {require('./images/logo1.png')} 
                style= {styles.img_c}
            />
            <Text style= {styles.appfont}>Sanganaka Learning App</Text>
        </View>
    );
}

