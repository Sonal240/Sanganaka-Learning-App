import React from 'react';
import { View, Text, ScrollView, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';



export default function Contribute(props) {
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
            var arr = images?images:[];
            arr.push(base64data);
            setPic([...arr]);
        }
    }

    const deleteImage = (index) => {
        var arr = images;
        arr[index] = null;
        setPic([...arr]);
    }

    const navigate= props.navigation.navigate;
    const details = props.route.params;

    const submit = async () => {
        console.log('enterted the function')
        if(!sub) {
            console.log('In if');
            setSub(true);
            var vids = await videos?(videos.split(',')):null;
            var arts = await articles?videos.split(','):null;
            db.collection('newArticles').add({
                articles: arts,
                category: category,
                content: content,
                credits: credits,
                images: images,
                videos: vids,
                subBy: user.displayName,
                phno: user.phoneNumber,
                topic: topic,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                category: category,
                interest: interest

            })
            .then((docRef)=> {
                db.collection('newArticles').doc(docRef.id).set({id: docRef.id}, {merge: true})
            })
            .then(()=> {
                alert('Article is submited for review');
                setSub(false);
            })
            .catch((err)=> {
                console.log(err);
            })
        }
    }

        return (
            <View>
                <ScrollView
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingBottom: 150
                    }}
                >    
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
                    <ScrollView 
                        horizontal= {true}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={200}
                        decelerationRate="normal"
                        style={{
                            marginTop: 10
                        }}
                        contentContainerStyle= {{
                            paddingBottom: 10,
                            paddingTop: 10
                        }}
                    >
                        {
                            images?(images.length?(images.map((item, index)=> {
                                if(item) {
                                    return (
                                        <View>
                                            <Icon 
                                                type= "antdesign"
                                                name=  "closecircle"
                                                onPress = {()=> {deleteImage(index)}}
                                            />
                                            <Image
                                                source={{uri: item}}
                                                style={{width: 200, height: 200, resizeMode: 'contain'}}
                                            />
                                        </View>
                                    )
                                }
                            })):null):null
                        }

                    </ScrollView>
                    <View
                        style={{
                            width: '80%',
                            paddingBottom: 10,
                            paddingTop: 10
                        }}
                    >
                        <Button 
                            title= "Add Image"
                            onPress= {openImagePickerAsync}
                        />
                    </View>
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