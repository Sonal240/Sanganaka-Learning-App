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

    const [content, setContent]= React.useState(null);
    const [topic, setTopic]= React.useState(null);
    const [images, setPic]= React.useState(null);
    const [credits, setCredits]= React.useState(null);
    const [interest, setInt]= React.useState(null);
    const [videos, setVid]= React.useState(null);
    const [articles, setArt]= React.useState(null);
    const [category, setCat]= React.useState(null);
    let [refreshing, setRefreshing] = React.useState(false);
    let [sub, setSub] = React.useState(false);


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

    const navigate= props.navigation.navigate;
    const submit = () => {
        console.log('enterted the function')
        if(!sub) {
            
        }
    }
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDob(currentDate);
    };

        return (
            <View>
                <ScrollView
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingBottom: 150
                    }}
                >    
                    {/* <TouchableOpacity 
                        onPress= {()=> {
                            openImagePickerAsync()
                        }}
                    >
                        <Image
                            source={!photo?require('./images/user.png'):{uri: photo}}
                            style={{width: 200, marginTop: 40, height: 200, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity> */}
                    <Text style={{marginTop: 40}}>Topic:-</Text>
                    <TextInput 
                        style={{ height: 60, textAlign: 'center',
                        width: '80%', borderColor: 'gray', 
                        borderWidth: 1, fontSize: 20,
                        marginTop: 10,
                        borderColor: 'blue', color: 'blue'}}
                        variant='outlined' 
                        placeholder = 'Topic goes here...' 
                        onChangeText={text=> setTopic(text)}
                        value= {topic}
                    />
                    <Text>Content:-</Text>
                    <TextInput 
                        style={{ textAlign: 'center',
                        width: '80%', borderColor: 'gray', 
                        borderWidth: 1, fontSize: 20,
                        marginTop: 10,
                        borderColor: 'blue', color: 'blue'}}
                        variant='outlined' 
                        placeholder='Content goes here' 
                        onChangeText={text=> setContent(text)}
                        value= {content}
                        multiline = {true}
                        numberOfLines = {6}
                    />
                    <Text>Interests:-</Text>
                    <TextInput 
                        style={{ height: 60, textAlign: 'center',
                        width: '80%', borderColor: 'gray', 
                        borderWidth: 1, fontSize: 20,
                        marginTop: 10,
                        borderColor: 'blue', color: 'blue'}} 
                        variant='outlined' 
                        placeholder='Interest goes here' 
                        onChangeText={text=> setInt(text)}
                        value= {interest}
                    />
                    <Text>Article Links (if any) ( seperated by comma(,) ):-</Text>
                    <TextInput 
                        style={{ height: 60, textAlign: 'center',
                        width: '80%', borderColor: 'gray', 
                        borderWidth: 1, fontSize: 20,
                        marginTop: 10,
                        borderColor: 'blue', color: 'blue'}} 
                        variant='outlined' 
                        placeholder='Article Links goes here...' 
                        onChangeText={text=> setArt(text)}
                        value= {articles}
                    />
                    <Text>Video Links (if any) ( seperated by comma(,) ):-</Text>
                    <TextInput 
                        style={{ height: 60, textAlign: 'center',
                        width: '80%', borderColor: 'gray', 
                        borderWidth: 1, fontSize: 20,
                        marginTop: 10,
                        borderColor: 'blue', color: 'blue'}} 
                        variant='outlined' 
                        placeholder='Video Links goes here...' 
                        onChangeText={text=> setVid(text)}
                        value= {videos}
                    />
                    <Text>Category:-</Text>
                    <Picker 
                        selectedValue={category} 
                        style={{ height: 60, width: '80%' }}
                        onValueChange={(itemValue, itemIndex)=> setCat(itemValue)}
                    >
                        <Picker.item label="none" value="0" />
                        <Picker.item label='Beginner' value="1" />
                        <Picker.item label='Intermediate' value="2" />
                        <Picker.item label='Advanced' value="3" />
                    </Picker>
                    <Text>Credits:-</Text>
                    <TextInput 
                        style={{ height: 60, textAlign: 'center',
                        width: '80%', borderColor: 'gray', 
                        borderWidth: 1, fontSize: 20,
                        marginTop: 10, marginBottom: 20,
                        borderColor: 'blue', color: 'blue'}} 
                        variant='outlined' 
                        placeholder='Credits goes here' 
                        onChangeText={text=> setCredits(text)}
                        value= {credits}
                    />
                    <Button title="Submit" 
                        onPress= {submit}
                    />
                </ScrollView>
            </View>
            );
}