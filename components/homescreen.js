import React from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import Topbar from './topbar';
import firebase from 'firebase';
import { Loading } from './LoadingComponent';
import { Card} from 'react-native-elements'


const arr = [
    {
        question: 'How To Use App?',
        answeredBy: 'Some_Cool_Guy',
        answer: 'Some random answer.'
    },
    {
        question: 'How To Use App?',
        answeredBy: 'Some_Cool_Guy',
        answer: 'Some random answer.'
    },
    {
        question: 'How To Use App?',
        answeredBy: 'Some_Cool_Guy',
        answer: 'Some random answer.'
    }
]

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
                        source={require('./images/user.png')}>
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
        return(
            <TouchableOpacity>
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
    let [articlesDisp, updateArt2] = React.useState(null);
    const db = firebase.firestore();
    var art=[];
    var art2=[];
    var i= 0;
    const fetchArticles = () => {
        console.log('I ran')
        db.collection('articles').get().then((snapshot)=> {
            snapshot.docs.map((doc) => {
                art.push(
                    {
                        link: doc.data().article_link,
                        category: doc.data().category,
                        content: doc.data().content,
                        credits: doc.data().credits,
                        id: doc.data().id,
                        images: doc.data().images,
                        interest: doc.data().interest,
                        sub: doc.data().subBy,
                        topic: doc.data().topic,
                        videos: doc.data().videos
                    }
                )
                if(i<10) {
                    art2.push({
                        link: doc.data().article_link,
                        category: doc.data().category,
                        content: doc.data().content,
                        credits: doc.data().credits,
                        id: doc.data().id,
                        images: doc.data().images,
                        interest: doc.data().interest,
                        sub: doc.data().subBy,
                        topic: doc.data().topic,
                        videos: doc.data().videos
                    });
                    i++;
                }
            })
        })
        .then(()=> {
            updateArt(art);
            updateArt2(art2);
            console.log('reportHere')
            console.log(articlesDisp)
        })
        .catch((err)=> {
            console.log(err);
        })
    }
    React.useEffect(() => {
        if(!articles) {
            fetchArticles();
        }
    }, []); //replecating componentDidMount Behaviour

                return (
                    <View>
                        <Topbar options={props} /> 
                        <ScrollView>
                            <Text
                                style={{
                                    fontSize: 25,
                                    marginTop: 25
                                }}
                            >
                                Recent Questions
                            </Text>
                            <ScrollView 
                                horizontal= {true}
                                showsHorizontalScrollIndicator={false}
                                scrollEventThrottle={200}
                                decelerationRate="normal"

                            >
                                {arr.map((item)=> (
                                    <ItemQuestion title={item.question} userName={item.answeredBy} answer={item.answer} />
                                ))}
                            </ScrollView>
                            <Text
                                style={{
                                    fontSize: 25,
                                    marginTop: 25
                                }}
                            >
                                Featured Articles
                            </Text>
                            <ScrollView 
                                horizontal= {true}
                                showsHorizontalScrollIndicator={false}
                                scrollEventThrottle={200}
                                decelerationRate="normal"

                            >
                                {
                                articlesDisp!=null?articlesDisp.map((item)=> (
                                    <ItemArticles article={item} />
                                )):((<Loading />))
                                }
                            </ScrollView>
                        </ScrollView>
                    </View>
            );
}