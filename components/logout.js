import React from 'react';
import { View, Text } from 'react-native';
import { Loading } from './LoadingComponent';
import firebase from 'firebase';


export default function LogOut(props) {
    const navigate = props.navigation.navigate;
    const user= firebase.auth().currentUser;
    React.useEffect(() => {
        if(user) {
            firebase.auth().signOut()
            .then(()=> {
                navigate('welcome', {isLoggedOut: true});
            })
            .catch((err)=> {
                console.log(err);
            });
        }
    }, []);
    return (
        <View
            style={{
                alignContent: 'center',
                height: '100%',
                width: '100%'
            }}
        >
            <Loading />
        </View>
    )
}