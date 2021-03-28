import React from 'react';
import { ScrollView, Text, Alert, View, Linking, TouchableOpacity } from 'react-native';
import { Card} from 'react-native-elements';


export default function articleDisp(props) {
    const params= props.route.params.article;

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
    return (
        <View>
            <ScrollView
                style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 50
                }}
            >
                <Text
                    style={{
                        fontSize: 22,
                        textAlign: 'center',
                        marginTop: 30
                    }}
                >
                    {params.topic}
                </Text>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 16
                    }}
                >
                    Level: - {params.category}
                </Text>
                <Text
                    style={{
                        fontSize: 12
                    }}
                >
                    Credits: - {params.credits}
                </Text>
                <Text
                    style={{
                        fontSize: 12,
                        marginTop: 5
                    }}
                >
                    Sub By: - {params.subBy}
                </Text>
                <ScrollView 
                    horizontal= {true}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={200}
                    decelerationRate="normal"
                    style={{
                        marginTop: 10
                    }}
                >
                    {
                        params.images.length?params.images.map((item)=> 
                        (
                        <TouchableOpacity>
                            <Card containerStyle={{width: 300}}>
                                <Card.Image
                                    style= {{
                                        height: 180,
                                        width: '100%',
                                        resizeMode: 'contain'
                                    }} 
                                    source={{uri: item}}>
                                </Card.Image>
                            </Card>
                        </TouchableOpacity>
                        )):null
                    }
                </ScrollView>
                <Text
                    style={{
                        fontSize: 18,
                        marginTop: 20
                    }}
                >
                    {params.content}
                </Text>
                {
                    params.articles?(
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginTop: 10
                            }}
                        >
                            Article Links
                        </Text>
                    ):null
                }
                {
                    params.articles?(
                        params.articles.map((item)=> (
                            <OpenLinkText url={item} />
                        ))
                    ):null
                }
                {
                    params.videos?(
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}
                        >
                            Video Links
                        </Text>
                    ):null
                }
                {
                    params.videos?(
                        params.videos.map((item)=> (
                            <OpenLinkText url={item} />
                        ))
                    ):null
                }
            </ScrollView>
        </View>
    );
}