import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllQuestions from './questions';
import MyQuestions from './questionsMy';
import MyAnswers from './questionsA';
import { View } from 'react-native';
import Topbar from './topbar';


const Tab = createMaterialTopTabNavigator();


export default function MyTabs(props) {
  return (
    <>
        <Topbar options={props} />
        <Tab.Navigator
            initialRouteName="Questions"
        >
        <Tab.Screen name="Questions" component={AllQuestions} />
        <Tab.Screen name="My Questions" component={MyQuestions} />
        <Tab.Screen name="My Answers" component={MyAnswers} />
        </Tab.Navigator>
    </>
  );
}