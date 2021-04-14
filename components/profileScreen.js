import React from 'react';
import { View, Text, ScrollView, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';
import * as ImagePicker from 'expo-image-picker';
import { Loading } from './LoadingComponent';
import Topbar from './topbar';
import firebase from 'firebase';
import { RefreshControl } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';



export default function Profile(props) {
    var user = firebase.auth().currentUser;
    const db = firebase.firestore();

    const [name, setName]= React.useState(user.displayName);
    const [email, setEmail]= React.useState(user.email);
    const [photo, setPic]= React.useState(null);
    const [dob, setDob]= React.useState(null);
    const [gender, setGender]= React.useState(null);
    const [lol, setLol]= React.useState(null);
    const [phno, setPhno]= React.useState(null);
    const [show, setShow]= React.useState(false);
    const [id, setId]= React.useState(null);
    let [refreshing, setRefreshing] = React.useState(false);
    let [sub, setSub] = React.useState(false);

    const fetchInfo= () => {
        db.collection('users').where('phno', '==', props.route.params.phno).get().then((snapshot)=> {
            setPic(snapshot.docs[0].data().photo);
            setDob(snapshot.docs[0].data().dob?new Date(snapshot.docs[0].data().dob.seconds * 1000):null);
            setLol(snapshot.docs[0].data().lol);
            setGender(snapshot.docs[0].data().gender);
            setPhno(snapshot.docs[0].data().phno);
            setId(snapshot.docs[0].id)
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

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();


        if (pickerResult.cancelled === true) {
            return;
        }

        const response = await fetch(pickerResult.uri);
        const blob = await response.blob();
        var reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = function() {
            var base64data = reader.result;          
            setPic(base64data);
        }

    }


    const onRefresh = async () => {
        setRefreshing(true);

        setName(user.displayName);
        setEmail(user.email);
        setId(null);
        setShow(false)
        setPic(null);
        setDob(null);
        setLol(null);
        setGender(null);
        setPhno(null);

        await fetchInfo();
        
        setRefreshing(false);
    }
    const navigate= props.navigation.navigate;
    const submit = () => {
        console.log('enterted the function')
        if(!sub) {
            console.log('enterted the function if')
            setSub(true);
            setRefreshing(true);
            var details= {
                phno: phno, 
                dob: dob,
                photo: photo,
                lol: lol,
                gender: gender,
                name: name,
                email: email
            }
            user.updateProfile({
                displayName: name
            })
            .then(async () => {
                console.log('changing Email')
                await user.updateEmail(email)
            }
            )
            .then(async () => {
                await db.collection("users").doc(id).set(details, { merge: true })
            }
            )
            .then(()=> {
                    setRefreshing(false);
                    setSub(false);
                    navigate('welcome', {isChanges: true});
                }
            )
            .catch(function(error) {
                console.log(error);
            });
        }
    }
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDob(currentDate);
    };

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
                    <TouchableOpacity 
                        onPress= {()=> {
                            openImagePickerAsync()
                        }}
                    >
                        <Image
                            source={!photo?require('./images/user.png'):{uri: photo}}
                            style={{width: 200, marginTop: 40, height: 200, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>
                    <Text style={{marginTop: 40}}>Phone Number:-</Text>
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
                    <TouchableOpacity
                        onPress={()=> {
                            setShow(true);
                        }}
                    >
                        <TextInput 
                            style={{ 
                                height: 60, textAlign: 'center',
                                width: '60%', borderColor: 'gray', 
                                borderWidth: 1, fontSize: 20,
                                marginTop: 10,
                                borderColor: 'blue', color: 'blue', 
                                backgroundColor: '#99f'
                            }} 
                            variant='outlined' 
                            placeholder='No Date Selected' 
                            value= {dob?dob.getDate()+'/'+(dob.getMonth()+1)+'/'+dob.getFullYear():null}
                            editable= {false}
                        />
                    </TouchableOpacity>
                    {
                        show?<DateTimePicker
                            testID="dateTimePicker"
                            value={dob?dob:new Date(946699909999)}
                            mode={'date'}
                            display="default"
                            onChange={onChange}
                            />:null
                    }
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