import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import Start from './components/MainComponent';
import Home from './components/homeComponent';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './components/WelcomeScreenComponent';
import LogInScreen from './components/LoginPhoneNumber';
import Article from './components/articleDisplay';
import Signup from './components/SignUpComponent';
import ArticleList from './components/cardList';
import Question from './components/questionDisp';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';




const config = {
  apiKey: 'AIzaSyAve9SFpbBZeS40BMYwD4KNzMoht1SyxnI',
  authDomain: 'sanganaka-f8486.firebaseapp.com',
  databaseURL: "https://sanganaka-f8486.firebaseio.com",
  projectId: "sanganaka-f8486",
  storageBucket: "sanganaka-f8486.appspot.com",
  messagingSenderId: "891657383270",
  appId: "1:891657383270:web:8c5be227feed61ed8aeca7",
  measurementId: "G-VLFG4CWX78"
};
if (!firebase.apps.length) {
   firebase.initializeApp(config);
}else {
   firebase.app(); // if already initialized, use that one
}

const Stack = createStackNavigator();

export default function App() {
  return (
    //     <View>
    //     <LogInScreen />
        
    // </View>
    <NavigationContainer>
      {/* <WelcomeScreen /> */}
      <Stack.Navigator
        initialRouteName= "started"
      >
        <Stack.Screen
          name="started"
          component={Start}          
          options= {{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="welcome"
          component={WelcomeScreen}
          options= {{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="login"
          component={LogInScreen}
          options={{ title: 'Login/Signup' }}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options= {{
            headerShown: false,
            headerLeft: null
          }}
        />
        <Stack.Screen
          name="article"
          component={Article}
          options= {{
            title: 'View Article'
          }}
        />
        <Stack.Screen
          name="question"
          component={Question}
          options= {{
            title: 'View Question'
          }}
        />
        <Stack.Screen
          name="articles"
          component={ArticleList}
          options= {{
            title: 'View Articles'
          }}
        />
        
      </Stack.Navigator>
      {/* <ChatBot /> */}
    </NavigationContainer>
    // <WelcomeScreen/>
//import { Loading } from './components/LoadingComponent';
//import Start from './components/MainComponent';


 
  );
}


