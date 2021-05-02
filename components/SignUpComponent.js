import React from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  Image
} from 'react-native';
import styles from './styles/stylesheet';
import * as firebase from 'firebase';
import { Picker } from '@react-native-community/picker';
import * as ImagePicker from 'expo-image-picker';



export default function SignUp(props) {
  var user = firebase.auth().currentUser;

  const db = firebase.firestore();

  const [levelOfLearning,setLol]= React.useState('0');
  const [name,setName]= React.useState('');
  const [email,setEmail]= React.useState('');
  const [photo,setPic]= React.useState(null);
  
  const [b64,setB64]= React.useState('');

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setPic({ localUri: pickerResult.uri });
    const response = await fetch(pickerResult.uri);
    const blob = await response.blob();
    var reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
     var base64data = reader.result;                
     setB64(base64data);
    }

  }


  var details={};
  if(user) {
    details.email= user.email;
    details.name= user.displayName;
  }
  const navigate= props.navigation.navigate;
  const submit=()=> {
    user.updateProfile({
      displayName: name
    })
    .then(
    user.updateEmail(email)
    )
    .then(() => {
      console.log("emailchanged")
    })
    .then(function() {
      console.log("Name changed")
    })
    .then(
      db.collection("users").add({
                photo: b64,
                lol: levelOfLearning,
                phno: user.phoneNumber,
                name: name,
                email: email
            })
    )
    .then(()=> {
          console.log("data uploaded");
          var details={}
          details.name = user.displayName;
          details.email = user.email;
          details.phno = user.phoneNumber;
          details.photo = b64;
          details.lol = levelOfLearning;
          navigate('welcome', {isRecentSigned: true});
        }
      )
    .catch(function(error) {
      console.log(error);
    });
    }
    return(
      <View style={styles.container}>
        <Image
        source={photo==null?require('./images/user.png'):{uri: photo.localUri}}
        style={{width: '50%', height: 200, resizeMode: 'contain'}}
         />
        <Button title="Upload Pic" onPress={openImagePickerAsync} />
        <TextInput style={{ height: 60, textAlign: 'center',
          width: '60%', borderColor: 'gray', 
          borderWidth: 1, fontSize: 20,
          marginTop: 20,
          borderColor: 'blue', color: 'blue'}} 
          variant='outlined' 
          placeholder='Name' 
          onChangeText={text=> setName(text)}
          autoCompleteType="username" 
        />
        <TextInput style={{ height: 60, marginTop: 20, 
          marginBottom: 20, borderColor: 'gray', 
          borderWidth: 1, width: '60%',
          fontSize: 20, textAlign: 'center',
          borderColor: 'blue', color: 'blue' }} 
          variant='outlined' 
          placeholder='Email' 
          onChangeText={text=> setEmail(text)}
          autoCompleteType= "email" 
        />
        <Text id='level'>Level of Learning</Text>
        <Picker 
          selectedValue={levelOfLearning} 
          style={{ height: 100, width: '60%' }}
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
      </View>  
    );
}
