import React from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import Topbar from './topbar';
import firebase from 'firebase';


import { projectList } from './list';



export default function Homescreen(props) {
    const preventDefault = (event) => event.preventDefault();
    let [articles, updateArt] = React.useState("null");
    const db = firebase.firestore();
    var art=[];
    const fetchArticles = () => {
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
            })
            .then(updateArt(art))
            .catch((err)=> {
                console.log(err);
            })
        })
        .catch((err)=> {
            console.log(err);
        })
    }

                return (
                    <View>
                        <Topbar options={props} />    
                    </View>
            );
}