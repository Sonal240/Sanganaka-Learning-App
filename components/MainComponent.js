import { StatusBar } from 'expo-status-bar';
import React from 'react';
import styles from './styles/stylesheet.js';
import { Text, View, Image } from 'react-native';
import * as firebase from 'firebase';
// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    appfont: {
        color: '#064789',
        fontSize: 24,
        position: 'fixed',
        bottom: 32
    }
});

export default function Start(props) {
    const classes = useStyles();
    const propsc = props;
        setTimeout(()=>{
            const user= firebase.auth().currentUser;
            const db = firebase.firestore();
            var details={};
            if(user != null) {
                details= user.email;
            }
            else {
                details = user;
            }
            console.log("started")
            console.log(details);
            console.log(user);
            if(!details) {
                firebase.auth().signOut();
                propsc.navigation.navigate('welcome');
                // details={};
                // details.name = 'Neo Anoman';
                // details.phno = '+917052646932';
                // details.email = 'neoanoman@gmail.com';
                // propsc.navigation.navigate('home', details);
            }
            else {
                const navigate= propsc.navigation.navigate;
                details={};
                details.name = user.displayName;
                details.phno = user.phoneNumber;
                details.email = user.email;
                db.collection('users').get().then((snapshot)=> {
                    snapshot.docs.map((doc) => {
                    if(doc.data().phno == details.phno) {
                        details.photo = doc.data().photo;
                        details.lol = doc.data().lol;
                    }
                    });
                })
                .then(function() {
                    navigate('home', details);
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        } ,1000);
    
    return (
        <View style={styles.container}>
            <Image
                source= {require('./images/logo1.png')} 
                style= {styles.img_c}
            />
            <Text className= {classes.appfont}>Sanganaka Learning App</Text>
        </View>
    );
}

