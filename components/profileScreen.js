import React from 'react';
import { View, Text, ScrollView, Image, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-community/picker';
import * as ImagePicker from 'expo-image-picker';
import { Loading } from './LoadingComponent';
import Topbar from './topbar';
import firebase from 'firebase';
import { RefreshControl } from 'react-native';


export default function Profile(props) {
    const db = firebase.firestore();
    const [name, setName]= React.useState(null);
    const [email, setEmail]= React.useState(null);
    const [photo, setPic]= React.useState(null);
    const [dob, setDob]= React.useState(null);
    const [gender, setGender]= React.useState(null);
    const [lol, setLol]= React.useState(null);
    const [phno, setPhno]= React.useState(null);
    let [refreshing, setRefreshing] = React.useState(false);

    const fetchInfo= () => {
        db.collection('users').where('phno', '==', props.route.params.phno).get().then((snapshot)=> {
            setName('Neo Anoman');
            setEmail('neoanoman@gmail.com');
            setPic(snapshot.docs[0].data().photo);
            setDob(snapshot.docs[0].data().dob);
            setLol(snapshot.docs[0].data().lol);
            setGender(snapshot.docs[0].data().gender);
            setPhno(snapshot.docs[0].data().phno);
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    React.useEffect(() => {
        if(!phno) {
            fetchInfo();
        }
    }, []); //replecating componentDidMount Behaviour


    const onRefresh = async () => {
        setRefreshing(true);

        setName(null);
        setEmail(null);
        setPic(null);
        setDob(null);
        setLol(null);
        setGender(null);
        setPhno(null);

        await fetchInfo();
        
        setRefreshing(false);
    }
    
    const submit = () => {
        console.log('I will submit form')
    }

    if(phno) {
        return (
            <View>
                <Topbar options={props} />
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingBottom: 150
                    }}
                >    
                    <Image
                        source={!photo?require('./images/user.png'):{uri: photo}}
                        style={{width: '50%', marginTop: 20, height: 200, resizeMode: 'contain'}}
                    />
                    <Text>Phone Number:-</Text>
                    <TextInput 
                        style={{ height: 60, textAlign: 'center',
                        width: '60%', borderColor: 'gray', 
                        borderWidth: 1, fontSize: 20,
                        marginTop: 10,
                        borderColor: '#eee', color: 'grey', backgroundColor: '#ddd'}} 
                        variant='outlined' 
                        placeholder='Phone' 
                        // onChangeText={text=> setPhno(text)}
                        value= {phno}
                        // autoCompleteType='tel'
                        editable= {false}
                    />
                    <Text>Name:-</Text>
                    <TextInput 
                        style={{ height: 60, textAlign: 'center',
                        width: '60%', borderColor: 'gray', 
                        borderWidth: 1, fontSize: 20,
                        marginTop: 10,
                        borderColor: 'blue', color: 'blue'}} 
                        variant='outlined' 
                        placeholder='Name' 
                        onChangeText={text=> setName(text)}
                        value= {name}
                        autoCompleteType="username" 
                    />
                    <Text>Email:-</Text>
                    <TextInput 
                        style={{ height: 60, textAlign: 'center',
                        width: '60%', borderColor: 'gray', 
                        borderWidth: 1, fontSize: 20,
                        marginTop: 10,
                        borderColor: 'blue', color: 'blue'}} 
                        variant='outlined' 
                        placeholder='Email' 
                        onChangeText={text=> setEmail(text)}
                        value= {email}
                        autoCompleteType='email'
                    />
                    <Text>Date Of Birth:-</Text>
                    <Text>Gender:-</Text>
                    <Picker 
                        selectedValue={gender} 
                        style={{ height: 60, width: '60%' }}
                        onValueChange={(itemValue, itemIndex)=> setGender(itemValue)}
                    >
                        <Picker.item label="Not Selected" value="not selected" />
                        <Picker.item label="Male" value="male" />
                        <Picker.item label='Female' value="female" />
                    </Picker>
                    <Text>Level Of Learning:-</Text>
                    <Picker 
                        selectedValue={lol} 
                        style={{ height: 60, width: '60%' }}
                        onValueChange={(itemValue, itemIndex)=> setLol(itemValue)}
                    >
                        <Picker.item label="none" value="0" />
                        <Picker.item label='Beginner' value="1" />
                        <Picker.item label='Intermediate' value="2" />
                        <Picker.item label='Advanced' value="3" />
                    </Picker>
                    
                    <Button title="Submit" 
                        onPress= {submit}
                    />
                </ScrollView>
            </View>
            );
    }
    else {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Topbar options={props} />    
                <Loading />
            </View>
        )
    }
}