import React from 'react';
import { ScrollView, Text, Alert, View, Linking, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-elements';
import firebase from 'firebase';
import { Loading } from './LoadingComponent';


export default function questionDisp(props) {
    const db = firebase.firestore();
    const ques= props.route.params.ques;
    let [answers, updateAns] = React.useState(null);
    let [fetched, updateFetch] = React.useState(false);

    const Answers = (props) => {
        const fetchAnswers = async () => {
            updateFetch(false);
            var user= {
                initialInfo: 'initial property'
            };
            var main= [];
            await db.collection('answers').where('qid', '==', props.ques.qid).get().then(async (snapshot)=> {
                await snapshot.docs[0].data().username_and_answers.map(async (data)=> {
                    await db.collection('users').where('phno', '==', data.mobile).get().then((snapshot)=> {
                        user= {
                            dob: snapshot.docs[0].data().dob,
                            email: snapshot.docs[0].data().email,
                            name: snapshot.docs[0].data().name,
                            phno: snapshot.docs[0].data().phno,
                            photo: snapshot.docs[0].data().photo,
                            gender: snapshot.docs[0].data().gender,
                            lol: snapshot.docs[0].data().lol
                        }
                    })
                    .catch(err=> {
                        console.log(err)
                    })
                    main.push({
                        userInfo: user,
                        answer: data.answer
                    })
                    updateAns({
                        answers: main
                    })
                })
            })
            .then(()=> {
                    updateFetch(true)
                }
            )
            .catch((err)=> {
                console.log(err);
            })
        }

        React.useEffect(() => {
            if(!answers) {
                fetchAnswers();
            }
        }, []); //replecating componentDidMount Behaviour
        const handlePress = () => {
            console.log('I am called')  
        }

        if(answers) {
            return (
                <View
                    style={{
                        marginTop: 20,
                        backgroundColor: '#fff',
                        paddingTop: 10,
                        paddingLeft: 20,
                        paddingRight: 10,
                        paddingBottom: 10
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#555'
                        }}
                        onPress={handlePress}
                    >
                        Some Answer
                    </Text>
                </View>
            )
        }
        else if(fetched){
            return (
                <Text
                        style={{
                            fontSize: 16,
                            color: '#229'
                        }}
                    >
                        No Answers Yet !!!!
                </Text>
            )
        }
        else {
            return(
                <Loading />
            )
        }

    }
    return (
        <View>
            <View
                style={{
                    marginTop: 20,
                    backgroundColor: '#fff',
                    paddingBottom: 10,
                    paddingTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20
                }}
            >
                <TouchableOpacity>
                    <Image 
                            source={
                                ques.user.photo?
                                {uri: ques.user.photo}:
                                require('./images/user.png')
                            }
                            style={{
                                height: 50,
                                width: 50
                            }} 
                        />
                    <Text
                        style={{
                            color: '#999',
                            marginTop: -30,
                            marginLeft: 60
                        }}
                    >
                        Submited By: - {ques.user.name}
                    </Text>
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 20,
                        marginTop: 30
                    }}
                >
                    {ques.question}
                </Text>
            </View>
            <ScrollView
                style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 50
                }}
            >
                <Answers ques={ques} />
            </ScrollView>
        </View>
    );
}