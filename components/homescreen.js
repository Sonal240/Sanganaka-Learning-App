import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, RefreshControl } from 'react-native';
import Topbar from './topbar';
import firebase from 'firebase';
import { Loading } from './LoadingComponent';
import { Card } from 'react-native-elements';
import { Button } from 'react-native-paper';

function ItemQuestion(props){
    var i = 1;
        return(
            <TouchableOpacity
                onPress={()=> {
                    var details = {
                        ques: props.all,
                        user: props.propsc.route.params
                    }
                    props.propsc.navigation.navigate('question', details)
                }}
            >
                <Card key={i++} containerStyle={{width: 300}}>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Image 
                        containerStyle={{
                            width: 50, 
                            height: 50, 
                            borderRadius: 100
                        }} 
                        style= {{
                            width: 50, 
                            height: 50
                        }}
                        source={{uri: props.photo}}>
                    </Card.Image>
                    <Card.FeaturedTitle style={{
                        color: '#999',
                        fontSize: 10,
                        marginTop: -20,
                        marginLeft: 60
                    }}>
                        Answered By:- {props.userName}
                    </Card.FeaturedTitle>
                    <Text style={{
                        marginTop: 10
                    }}>{props.answer}</Text>
                </Card>
            </TouchableOpacity>
        )
    }

function ItemArticles(props){
    const details = {
        article: props.article
    }
    var i  = 1;
        return(
            <TouchableOpacity
                onPress={()=> props.props.navigation.navigate('article', details)}
            >
                <Card key={i++} containerStyle={{width: 300}}>
                    <Card.Image
                        style= {{
                            height: 180,
                            width: '100%',
                            resizeMode: 'contain'
                        }} 
                        source={props.article.images?{uri: props.article.images[0]}:require('./images/logo1.png')}>
                    </Card.Image>
                    <Card.FeaturedTitle style={{
                        color: 'blue',
                        fontSize: 20,
                        marginTop: 20
                    }} >
                        {props.article.topic}
                    </Card.FeaturedTitle>
                </Card>
            </TouchableOpacity>
        )
    }

export default function Homescreen(props) {
    const preventDefault = (event) => event.preventDefault();
    let [message, updateMess] = React.useState(props.route.params?props.route.params.message:null);
    if(message) {
        alert(message);
        updateMess(null)
    }
    let [articles, updateArt] = React.useState(null);
    let [refreshing, setRefreshing] = React.useState(false);
    let [questions, updateQues] = React.useState(null);
    let [answers, updateAns] = React.useState(null);
    const db = firebase.firestore();
    const fetchArticles = () => {
        var i = 0;
        var art=[];
        db.collection('articles').orderBy('timestamp', 'desc').limit(10).get().then((snapshot)=> {
            snapshot.docs.map((doc) => {
                art.push(
                    {
                        articles: doc.data().articles,
                        category: doc.data().category,
                        content: doc.data().content,
                        credits: doc.data().credits,
                        id: doc.data().id,
                        images: doc.data().images,
                        interest: doc.data().interest,
                        subBy: doc.data().subBy,
                        topic: doc.data().topic,
                        videos: doc.data().videos
                    }
                )
            })
        })
        .then(()=> {
            updateArt(art);
        })
        .catch((err)=> {
            console.log(err);
        })
    }
    const fetchQuestions = () => {
        var i=0;
        var art=[];
        var temp;
        var temp2;
        var art2=[];
        var arr = [];
        db.collection('questions').orderBy('date', 'desc').limit(5).get().then(async (snapshotInitial)=> {
            art = await Promise.all(snapshotInitial.docs.map(async (doc) => {
                if(doc.data().mobile) {
                    await db.collection('users').where('phno', '==', doc.data().mobile).get().then((snapshot)=> {
                        temp = {
                                question: doc.data().question,
                                qid: doc.data().qid,
                                mobile: doc.data().mobile,
                                user: {
                                    photo: snapshot.docs[0].data().photo,
                                    mobile: doc.data().mobile,
                                    dob: snapshot.docs[0].data().dob?new Date(snapshot.docs[0].data().dob.seconds * 1000):null,
                                    lol: snapshot.docs[0].data().lol,
                                    gender: snapshot.docs[0].data().gender,
                                    name: snapshot.docs[0].data().name,
                                    email: snapshot.docs[0].data().email
                                }
                            }
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
                    return temp;
                }
            }))
            art2 = await Promise.all(snapshotInitial.docs.map(async (doc) => {
                if(doc.data().qid) {
                    await db.collection('answers').where('qid', '==', doc.data().qid).get().then(async (snapshot)=> {
                            arr = await Promise.all(snapshot.docs[0].data().username_and_answers.map(async (data)=> {
                                    await db.collection('users').where('phno', '==', data.mobile).get().then(async (snapshot2)=> {
                                        if(data.selected) {
                                            for(var j=0; j<art.length; j++) {
                                                if(art[j].qid===doc.data().qid) {
                                                    art[j].selected = true;
                                                }
                                            }
                                        }
                                        temp2 = {
                                                    answer: data.answer,
                                                    selected: data.selected,
                                                    dob: snapshot2.docs[0].data().dob,
                                                    mobile: snapshot2.docs[0].data().phno,
                                                    photo: snapshot2.docs[0].data().photo,
                                                    username: snapshot2.docs[0].data().name,
                                                    email: snapshot2.docs[0].data().email,
                                                    lol: snapshot2.docs[0].data().lol,
                                                    gender: snapshot2.docs[0].data().gender
                                                }
                                    })
                                    .catch((err)=> {
                                        console.log(err)
                                    })
                                    return temp2;
                                }))
                    })
                    .catch(err=> {console.log(err)})
                    return ({
                        qid: doc.data().qid,
                        allAnswers: arr
                    })
                }
            }))
        })
        .then(()=> {
            updateQues(art);
            updateAns(art2);
        })
        .catch((err)=> {
            console.log(err);
        })
    }
    // const fetchAnswers = () => {
    //     var i=0;
    //     var art=[];
    //     db.collection('answers').where('qid', '==', item).get().then((snapshot)=> {
    //         snapshot.docs.map((doc) => {
    //             art.push(
    //                 {
    //                     allAnswers: doc.data().username_and_answers,
    //                     qid: doc.data().qid
    //                 }
    //             )
    //         })
    //     })
    //     .then(()=> {
    //         updateAns(art);
    //     })
    //     .catch((err)=> {
    //         console.log(err);
    //     })
    // }
    React.useEffect(() => {
        if(!articles) {
            fetchArticles();
            fetchQuestions();
        }
    }, []); //replecating componentDidMount Behaviour

    const onRefresh = async () => {
        setRefreshing(true)
        updateAns(null);
        updateQues(null);
        updateArt(null);
        fetchArticles();
        await fetchQuestions();
        setRefreshing(false);
        
    }

                return (
                    <View>
                        <Topbar options={props} /> 
                        <ScrollView
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        >
                            <Text
                                style={{
                                    fontSize: 25,
                                    marginTop: 25
                                }}
                            >
                                Recent Questions
                            </Text>
                            <Button
                                style= {{
                                    flexDirection: 'row-reverse',
                                    marginTop: -30
                                }}
                                onPress= {()=>{props.navigation.navigate('Q&A')}}
                            >
                                View All
                            </Button>
                            <ScrollView 
                                horizontal= {true}
                                showsHorizontalScrollIndicator={false}
                                scrollEventThrottle={200}
                                decelerationRate="normal"

                            >
                                {
                                    questions!=null&&answers!=null?questions.map((item)=> 
                                        item.selected?answers.map((item2)=>
                                        item2.qid===item.qid?
                                        item2.allAnswers.map((item3)=>
                                        item3.selected?(<ItemQuestion all={item} propsc={props} title={item.question} userName={item3.username} answer={item3.answer} photo={item3.photo} />)
                                        :(null)
                                        ):(null)
                                        ):
                                        (<ItemQuestion title={item.question} all={item} propsc={props} userName={'No one'} answer={'No answers selected as correct yet'} photo={null} />)
                                    ):((<Loading />))
                                }
                            </ScrollView>
                            <Text
                                style={{
                                    fontSize: 25,
                                    marginTop: 25
                                }}
                            >
                                Latest Articles
                            </Text>
                            <Button
                                style= {{
                                    flexDirection: 'row-reverse',
                                    marginTop: -30
                                }}
                                onPress={()=> props.navigation.navigate('articles')}
                            >
                                View All
                            </Button>
                            <ScrollView 
                                horizontal= {true}
                                showsHorizontalScrollIndicator={false}
                                scrollEventThrottle={200}
                                decelerationRate="normal"

                            >
                                {
                                    articles!=null?articles.map((item)=> (
                                        <ItemArticles article={item} props={props} />
                                    )):((<Loading />))
                                }
                            </ScrollView>
                        </ScrollView>
                    </View>
            );
}