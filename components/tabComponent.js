import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homescreen from './homescreen';
import Profilescreen from './profileScreen';
import Chatscreen from './chatScreen';
import Qscreen  from './qaScreen';
import Contribute from './contributeComponent';

import { Icon } from 'react-native-elements';

import { View, Text } from 'react-native';



const Tab = createBottomTabNavigator();

export default function Tabs(props) {
    const [name, setValue] = React.useState(props.route.name);
    var info = props.route.params.info;
    console.log(name)
    
    return(
        <Tab.Navigator
            initialRouteName= {name+'2'}
            screenOptions={({ route })=> ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if(route.name === 'Home') {
                        iconName= focused?'home':'home-outline'
                    }
                    else if(route.name === 'Q&A') {
                        iconName= focused?'help-circle':'help-circle-outline'
                    }
                    else if(route.name === 'Chat') {
                        iconName= focused?'chatbox-ellipses-sharp':'chatbox-ellipses-outline'
                    }
                    else if(route.name === 'Profile') {
                        iconName= focused?'person':'person-outline'
                    }
                    return <Icon type="ionicon" name={iconName} color="blue" />
                }
            })}
            tabBarOptions={{
                    activeTintColor: '#569',
                    inactiveTintColor: 'gray',
                }}
        >
            <Tab.Screen name="Home2"  component={Homescreen} 
            options={{
                    tabBarButton: () => {return(
                        <Icon 
                        type="ionicon"
                        name={name==='Home'?'home':'home-outline'}
                        color="white"
                        containerStyle={{alignItems: 'center', width: '16%' }}
                        iconStyle={{color: 'blue', marginTop: -10}}
                        reverse 
                        onPress= {()=>{props.navigation.navigate('Home')}}
                        />
                    )}
                }}
            />
            <Tab.Screen name="Q&A2"  component={Qscreen} 
            initialParams= {info}
            options={{
                    tabBarButton: () => {return(
                        <Icon 
                        type="ionicon"
                        name={name==='Q&A'?'help-circle':'help-circle-outline'}
                        color="#fff"
                        containerStyle={{alignItems: 'center', width: '16%' }}
                        iconStyle={{color: 'blue', marginTop: -10}}
                        reverse 
                        onPress= {()=>{props.navigation.navigate('Q&A')}}
                        />
                    )}
                }}
            />
            <Tab.Screen name="Contribute2" component={Contribute}
                options={{
                    tabBarButton: () => {return(
                        <Icon 
                        type="ant-design"
                        name="pluscircle"
                        color="blue"
                        containerStyle={{alignItems: 'center', marginTop: -10, width: '16%'}}
                        reverse 
                        onPress= {()=>{props.navigation.navigate('Contribute')}}
                        />
                    )}
                }}
             />
            <Tab.Screen name="Chat2"  component={Chatscreen} 
            options={{
                    tabBarButton: () => {return(
                        <Icon 
                        type="ionicon"
                        name={name==='Chat'?'chatbox-ellipses-sharp':'chatbox-ellipses-outline'}
                        color="#fff"
                        containerStyle={{alignItems: 'center', width: '16%' }}
                        iconStyle={{color: 'blue', marginTop: -10}}
                        reverse 
                        onPress= {()=>{props.navigation.navigate('Chat')}}
                        />
                    )}
                }}
            />
            <Tab.Screen name="Profile2" component={Profilescreen} 
            initialParams= {info}
            options={{
                    tabBarButton: () => {return(
                        <Icon 
                        type="ionicon"
                        name={name==='Profile'?'person':'person-outline'}
                        color="#fff"
                        containerStyle={{alignItems: 'center', width: '16%' }}
                        iconStyle={{color: 'blue', marginTop: -10}}
                        reverse 
                        onPress= {()=>{
                            props.navigation.navigate('Profile')
                        }}
                        />
                    )}
                }}
            />
        </Tab.Navigator>
    );
}