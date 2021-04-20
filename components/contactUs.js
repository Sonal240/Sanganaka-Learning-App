import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';



export default function Contact(props) {
        const OpenLinkText = (props) => {
            const handlePress = () => {
                Linking.canOpenURL(props.url)
                .then((supported)=> {
                    if (supported) {
                        Linking.openURL(props.url);
                    } 
                    else {
                        Alert.alert(`Don't know how to open this URL: ${props.url}`);
                    }
                })
                .catch((err)=> {
                    console.log(err);
                });   
            }
            return (
                <Text
                    style={{
                        fontSize: 16,
                        color: '#229'
                    }}
                    onPress={handlePress}
                >
                    {props.url}
                </Text>
            )
        }

        const ppl = [
            {
                name: 'Utkarsh Pandey (Neo Anoman)',
                web: 'http://anoman.herokuapp.com/',
                link: 'https://www.linkedin.com/in/NeoAnoman/',
                git: "https://github.com/NeoAnoman",
                img: './images/neo.jpg'
            },
            {
                name: 'Simran Shilky',
                web: null,
                link: null,
                git: null,
                img: null
            },
            {
                name: 'Deepika Sharma',
                web: null,
                link: null,
                git: null,
                img: null
            },
            {
                name: 'Hare Krishna',
                web: null,
                link: null,
                git: null,
                img: null
            }
        ]

        const AddPpl = (props) => {
            console.log('I am loaded')
            console.log(props)
            return(
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <Image 
                        source= {props.img?require('./images/neo.jpg'):require('./images/user.png')} 
                        style={{width: 200, marginTop: 40, height: 200, resizeMode: 'contain'}}
                    />
                    <Text>{props.name}</Text>
                    {props.web?<Text>Website: - <OpenLinkText url= {props.web} /></Text>:null}
                    {props.git?<Text>Github: - <OpenLinkText url= {props.git} /></Text>:null}
                    {props.link?<Text>Linkdin: - <OpenLinkText url= {props.link} /></Text>:null}
                </View>
            )
        }

        return (
            <ScrollView
             contentContainerStyle= {{
                 alignContent: 'center',
                 alignItems: 'center',
                 paddingBottom: 100,
                 paddingTop: 100,
                 paddingLeft: 20,
                 paddingRight: 20
             }}
            >
                <Text>Made By: - Team Saganaka</Text>
                {ppl.map((item)=> (
                    <AddPpl name= {item.name} web= {item.web?item.web:null}
                        git= {item.git?item.git:null}
                        link= {item.link?item.link:null}
                        img= {item.img?item.img:null}
                    />
                ))}
            </ScrollView>
            );
}