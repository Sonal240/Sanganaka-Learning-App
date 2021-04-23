import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllQuestions from './questions';
import MyQuestions from './questionsMy';
import MyAnswers from './questionsA';
import { View } from 'react-native';
import Topbar from './topbar';


const Tab = createMaterialTopTabNavigator();


export default function MyTabs(props) {
  var info = props.route.params;
  return (
    <>
        <Topbar options={props} />
        <Tab.Navigator
            initialRouteName="Questions"
        >
        <Tab.Screen name="Questions" initialParams= {info} component={AllQuestions} />
        <Tab.Screen name="My Questions" initialParams= {info} component={MyQuestions} />
        <Tab.Screen name="Questions Answered" initialParams= {info} component={MyAnswers} />
        </Tab.Navigator>
    </>
  );
}