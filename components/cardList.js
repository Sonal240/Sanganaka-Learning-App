import React from 'react';
import { Card, ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { ScrollView, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { Loading } from './LoadingComponent';
import { Image } from 'react-native';
import { View } from 'react-native';

var i=1;

function DisplayList(props) {
    const details = {
        article: props.article
    }
    return (
        <TouchableOpacity
            onPress={()=> props.propsc.navigation.navigate('article', details)}
        >
            <ListItem key={i++} 
                bottomDivider
            >
                <Image 
                    source={
                        props.article.images?
                        {uri: props.article.images[0]}:
                        require('./images/logo1.png')
                    }
                    style={{
                        height: 50,
                        width: 50
                    }} 
                />
                <ListItem.Content>
                <ListItem.Title>{props.article.topic}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        </TouchableOpacity>
    )
}

export default function CardList(props) {
    let [articles, updateArt] = React.useState(null);
    let [items, updateItems] = React.useState(20);
    let [refreshing, setRefreshing] = React.useState(false);
    let [reachedEnd, setEnd] = React.useState(false);
    let [loading, setLoading] = React.useState(false);
    const db = firebase.firestore();

    React.useEffect(() => {
        if(!articles) {
            fetchArticles();
        }
    }, []);

    const onRefresh = async () => {
        i=1;
        setEnd(false);
        console.log(items);
        setRefreshing(true);
        updateArt(null);
        await fetchArticles();
        setRefreshing(false);
    }
    
    const fetchArticles = () => {
        var art=[];
        db.collection('articles').orderBy('timestamp', 'desc').limit(20).get().then((snapshot)=> {
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
            updateItems(40);
            updateArt(art);
        })
        .catch((err)=> {
            console.log(err);
        })
    }
    const fetchMoreArticles = () => {
        if(!reachedEnd && !loading) {
            setLoading(true);
            updateItems(items+20);
            console.log(items);
            var art=[];
            db.collection('articles').orderBy('timestamp', 'desc').limit(items).get().then((snapshot)=> {
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
                setLoading(false);
                if(art.length< items) {
                    setEnd(true);
                }
            })
            .catch((err)=> {
                console.log(err);
            })
        }
    }
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 0;
        return (layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom)&&articles;
    };

    return(
        <>
            <ScrollView
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        fetchMoreArticles();
                    }
                }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Card containerStyle={{padding: 0}} >
                    {
                        articles?articles.map((item) => <DisplayList article={item} propsc={props} />):<Loading />
                    }
                </Card>
                <View
                    style={{
                        display: !reachedEnd?'none':'flex',
                        width: '100%',
                        bottom: 0,
                        backgroundColor: '#229'
                    }}
                >
                    <Text style={{
                        color: '#fff',
                        textAlign: 'center'
                    }}>
                        You have reached the end
                    </Text>
                </View>
            </ScrollView>
            <View
                style={{
                    display: !loading?'none':'flex',
                    justifyContent: 'center',
                    bottom: 20,
                    backgroundColor: '#229'
                }}
            >
                <Loading />
            </View>
        </>
    )
}