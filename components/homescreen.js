import React from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, RefreshControl } from 'react-native';
import Topbar from './topbar';
import firebase from 'firebase';
import { Loading } from './LoadingComponent';
import { Card} from 'react-native-elements';
import { Button } from 'react-native-paper';

function ItemQuestion(props){
        return(
            <TouchableOpacity>
                <Card containerStyle={{width: 300}}>
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
                    }} key="1">
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
        return(
            <TouchableOpacity
                onPress={()=> props.props.navigation.navigate('article', details)}
            >
                <Card containerStyle={{width: 300}}>
                    <Card.Image
                        style= {{
                            height: 180,
                            width: '100%',
                            resizeMode: 'contain'
                        }} 
                        source={{uri: props.article.images[0]}}>
                    </Card.Image>
                    <Card.FeaturedTitle style={{
                        color: 'blue',
                        fontSize: 20,
                        marginTop: 20
                    }} key="1">
                        {props.article.topic}
                    </Card.FeaturedTitle>
                </Card>
            </TouchableOpacity>
        )
    }

export default function Homescreen(props) {
    const preventDefault = (event) => event.preventDefault();

    let [articles, updateArt] = React.useState(null);
    let [refreshing, setRefreshing] = React.useState(false);
    let [questions, updateQues] = React.useState(null);
    let [answers, updateAns] = React.useState(null);
    const db = firebase.firestore();
    const fetchArticles = () => {
        var i = 0;
        var art=[];
        db.collection('articles').orderBy('timestamp').limitToLast(10).get().then((snapshot)=> {
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
        db.collection('questions').orderBy('date').limitToLast(10).get().then((snapshot)=> {
            snapshot.docs.map((doc) => {
                art.push(
                    {
                        date: doc.data().date,
                        mobile: doc.data().mobile,
                        qid: doc.data().qid,
                        question: doc.data().question
                    }
                )
            })
        })
        .then(()=> {
            updateQues(art);
        })
        .catch((err)=> {
            console.log(err);
        })
    }
    const fetchAnswers = () => {
        var i=0;
        var art=[];
        db.collection('answers').get().then((snapshot)=> {
            snapshot.docs.map((doc) => {
                art.push(
                    {
                        allAnswers: doc.data().username_and_answers,
                        qid: doc.data().qid
                    }
                )
            })
        })
        .then(()=> {
            updateAns(art);
        })
        .catch((err)=> {
            console.log(err);
        })
    }
    React.useEffect(() => {
        if(!articles) {
            fetchArticles();
            fetchQuestions();
            fetchAnswers();
        }
    }, []); //replecating componentDidMount Behaviour

    const onRefresh = async () => {
        setRefreshing(true)
        updateAns(null);
        updateQues(null);
        updateArt(null);
        fetchArticles();
        fetchQuestions();
        await fetchAnswers();
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
                                        item3.selected?(<ItemQuestion title={item.question} userName={item3.username} answer={item3.answer} photo={item3.photo} />):null
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
                                Featured Articles
                            </Text>
                            <Button
                                style= {{
                                    flexDirection: 'row-reverse',
                                    marginTop: -30
                                }}
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