import React from 'react';
import { Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';

import { Card, ListItem } from 'react-native-elements';
import firebase from 'firebase';
import { Loading } from './LoadingComponent';


var i=1;

function DisplayList(props) {
    const details = {
        ques: props.question
    }
    return (
        <TouchableOpacity
            onPress={()=> props.propsc.navigation.navigate('question', details)}
        >
            <ListItem key={i++} 
                bottomDivider
            >
                <Image 
                    source={
                        props.question.user.photo?
                        {uri: props.question.user.photo}:
                        require('./images/user.png')
                    }
                    style={{
                        height: 50,
                        width: 50
                    }} 
                />
                <ListItem.Content>
                <ListItem.Title>{props.question.question}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        </TouchableOpacity>
    )
}

export default function AllQuestions(props) {
    let [questions, updateArt] = React.useState(null);
    let [refreshing, setRefreshing] = React.useState(false);
    const db = firebase.firestore();

    React.useEffect(() => {
        if(!questions) {
            fetchquestions();
        }
    }, []);

    const onRefresh = async () => {
        i=1;
        setRefreshing(true);
        updateArt(null);
        await fetchquestions();
        setRefreshing(false);
    }
    
    const fetchquestions = () => {
        var art=[];
        db.collection('users').where('phno', '==', props.route.params.phno).get().then((snapshot0)=> {
            snapshot0.docs[0].data().answered?snapshot0.docs[0].data().answered.map((item)=> {
                db.collection('questions').where('qid', '==', item).get().then(async (snapshot)=> {
                    await art.push(
                                {
                                    question: snapshot.docs[0].data().question,
                                    qid: snapshot.docs[0].data().qid,
                                    mobile: snapshot.docs[0].data().mobile,
                                    user: {
                                        photo: snapshot0.docs[0].data().photo,
                                        mobile: snapshot.docs[0].data().mobile,
                                        dob: snapshot0.docs[0].data().dob?new Date(snapshot0.docs[0].data().dob.seconds * 1000):null,
                                        lol: snapshot0.docs[0].data().lol,
                                        gender: snapshot0.docs[0].data().gender,
                                        name: snapshot0.docs[0].data().name,
                                        email: snapshot0.docs[0].data().email
                                    }
                                }
                            )
                })
                .then(()=> {
                        updateArt(art);
                    }
                )
                .catch((err)=> {
                    console.log(err);
                })
            }):updateArt(null)
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    return(
        <>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Card containerStyle={{padding: 0}} >
                    {
                        questions?questions.map((item) => <DisplayList question={item} propsc={props} />):<Loading />
                    }
                </Card>
            </ScrollView>
        </>
    )
}
