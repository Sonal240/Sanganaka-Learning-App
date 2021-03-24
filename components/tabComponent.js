import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homescreen from './homescreen';
import Profilescreen from './profileScreen';
import Chatscreen from './chatScreen';
import Qscreen  from './qaScreen';
import Contribute from './contributeComponent';

import { Icon } from 'react-native-elements';



const Tab = createBottomTabNavigator();

export default function Tabs(props) {
    return(
        <Tab.Navigator
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
            <Tab.Screen name="Home"  component={Homescreen} />
            <Tab.Screen name="Q&A"  component={Qscreen} />
            <Tab.Screen name="Contribute" component={Contribute}
                options={{
                    tabBarButton: () => {return(
                        <Icon 
                        type="ant-design"
                        name="pluscircle"
                        color="blue"
                        containerStyle={{alignItems: 'center', marginTop: -10}}
                        reverse 
                        onPress= {()=>{props.navigation.navigate('Contribute')}}
                        />
                    )}
                }}
             />
            <Tab.Screen name="Chat"  component={Chatscreen} />
            <Tab.Screen name="Profile" component={Profilescreen} />
        </Tab.Navigator>
    );
}