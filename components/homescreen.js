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
                        ques: props.all
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
    console.log('WATCH MEEEEE')
    console.log(props.route.params)
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
        var art2=[];
        var arr = [];
        db.collection('questions').orderBy('date').limit(5).get().then((snapshot)=> {
            snapshot.docs.map((doc) => {
                db.collection('users').where('phno', '==', doc.data().mobile).get().then((snapshot)=> {
                    art.push(
                        {
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
                    )
                })
                .catch((err)=> {
                    console.log(err)
                })
                db.collection('answers').where('qid', '==', doc.data().qid).get().then((snapshot)=> {
                    snapshot.docs[0].data().username_and_answers.map((data)=> {
                            db.collection('users').where('phno', '==', data.mobile).get().then(async (snapshot2)=> {
                                await arr.push({
                                            answer: data.answer,
                                            selected: data.selected,
                                            dob: snapshot2.docs[0].data().dob,
                                            mobile: snapshot2.docs[0].data().phno,
                                            photo: snapshot2.docs[0].data().photo,
                                            username: snapshot2.docs[0].data().name,
                                            email: snapshot2.docs[0].data().email,
                                            lol: snapshot2.docs[0].data().lol,
                                            gender: snapshot2.docs[0].data().gender
                                        })
                                await art2.push(
                                    {
                                        qid: snapshot.docs[0].data().qid,
                                        allAnswers: arr
                                    }
                                )
                                console.log(art2);
                                updateAns(art2);
                            })
                        })
                })
                .catch(err=> {console.log(err)})
            })
        })
        .then(()=> {
            updateQues(art);
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
                                        answers.map((item2)=>
                                        item2.qid===item.qid?
                                        item2.allAnswers.map((item3)=>
                                        item3.selected?(<ItemQuestion all={item} propsc={props} title={item.question} userName={item3.username} answer={item3.answer} photo={item3.photo} />):(<ItemQuestion title={item.question} userName={'No one'} answer={'No answers selected as correct yet'} photo={null} />)
                                        ):null
                                        )
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