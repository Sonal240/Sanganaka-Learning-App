import React from 'react';
import { Button } from 'react-native-paper';
import {View, Image, Text} from 'react-native';
import styles from './styles/stylesheet';
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from "react-native";


const screenWidth = Math.round(Dimensions.get('window').width);
 export default function WelcomeScreen(props){
     props.navigation.addListener('beforeRemove', (e)=> {
        e.preventDefault();
    })
    const slide_image_detail=[
        {
            id:1,
            image: require('./images/img1.png'),
            description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsumLorem ipsum"
        },
        {
            id:2,
           image:require('./images/img2.png'),
           description: "Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
       },
       {
           id:3,
           image:require('./images/img3.png'),
           description: "Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum  Lorem ipsumLorem ipsum  Lorem ipsum Lorem ipsum "
       }
       ];
    function Item(props){
        return(
            <View style={{width: screenWidth}}>
                <Image source={props.img_src} style={styles.carouselImg}/>
                <Text style={{color: '#064789', 
                fontSize: 16, 
                marginRight: 2 ,
                marginLeft:2.5, 
                textAlign:'center', 
                padding: 1}}>
                    {props.descp}</Text>
            </View>
        )
    }

     return(
        <View style={styles.container}>
            <View
                style={{
                    backgroundColor: '#44b',
                    marginTop: 40,
                    height: 40,
                    width: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    display:props.route.params?'flex':'none'
                }}
            >
                <Text style={{
                    display:props.route.params?props.route.params.isRecentSigned?'flex':'none':'none',
                    backgroundColor: '#44b',
                    color: '#fff',
                    textAlign: 'center'
                }}>
                    Your account has been Created please login again!!!
                </Text>
                <Text style={{
                    display:props.route.params?props.route.params.isChanges?'flex':'none':'none',
                    backgroundColor: '#44b',
                    color: '#fff'
                }}>
                    Changes in account have been made please sign in to continue...
                </Text>
                <Text style={{
                    display:props.route.params?props.route.params.isLoggedOut?'flex':'none':'none',
                    backgroundColor: '#44b',
                    color: '#fff'
                }}>
                    You have successfully Logged Out !!!!
                </Text>
            </View>
            <ScrollView 
                horizontal= {true}
                contentContainerStyle={{ width: `${100 * 3}%` }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
                pagingEnabled

            >
                {
                    slide_image_detail.map((slide_image_detail)=><Item key={slide_image_detail.id} img_src={slide_image_detail.image} descp={slide_image_detail.description} />)
                }
            </ScrollView>
            
            <View>
                 <Button mode="contained" style={{backgroundColor: 'blue', width:150, marginRight: `50%`, position: 'absolute'}} onPress={() => props.navigation.navigate('login')}>
                        Log In
                  </Button>
                 <Button mode="contained" style={{backgroundColor: 'blue', width:150,marginLeft: `50%`, marginBottom: 10 }} onPress={() => props.navigation.navigate('login')}>
                     Sign Up
                </Button>
            </View>
        </View>
     );
 }
