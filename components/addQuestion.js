import React from 'react';
import * as firebase from 'firebase';
import {
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import uuid from 'react-native-uuid';


export default function AddQuestion(props) {
    const [question,setName]= React.useState(null);
    const db = firebase.firestore();
    const navigate = props.navigation.navigate;

    const submit = () => {
        if(question) {
            db.collection("questions").add({
                date: firebase.firestore.FieldValue.serverTimestamp(),
                mobile: props.route.params.phno,
                question: question
            })
            .then((docRef)=> {
                db.collection('questions').doc(docRef.id).set({qid: docRef.id}, {merge: true})
            })
            .then(()=> {
                var details = props.route.params;
                alert('Question is added !!!!');
                navigate('Home', details);
            })
            .catch((err)=> {
                console.log(err);
            })
        }
        else {
            alert('Please write the question in the given text field');
        }
    }

    return(
        <View
            style={{
                alignItems: 'center',
                marginTop: 20
            }}
        >
            <Text
                style={{
                    fontSize: 20
                }}
            >Enter your Question: - </Text>
            <TextInput style={{ height: 60, textAlign: 'center',
                    width: '60%', borderColor: 'gray', 
                    borderWidth: 1, fontSize: 20,
                    marginTop: 20,
                    marginBottom: 20,
                    borderColor: 'blue', color: 'blue'
                }} 
                variant='outlined' 
                placeholder='Question Goes Here' 
                onChangeText={text=> setName(text)}
                autoCompleteType="username" 
            />
            <Button title="Submit" 
                onPress= {submit}
            />
        </View>
    );
}