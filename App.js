import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { Loading } from './components/LoadingComponent';
import Start from './components/MainComponent';
import Home from './components/homeComponent';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './components/WelcomeScreenComponent';
import LogInScreen from './components/LoginPhoneNumber';
import Article from './components/articleDisplay';
import Signup from './components/SignUpComponent';
import ChatBot from './components/ChatBotComponent';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    //     <View>
    //     <LogInScreen />
        
    // </View>
    <NavigationContainer>
      {/* <WelcomeScreen /> */}
      <Stack.Navigator>
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
        />
        <Stack.Screen
          name="signup"
          component={Signup}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options= {{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="article"
          component={Article}
          options= {{
            headerShown: false
          }}
        />
        
      </Stack.Navigator>
      {/* <ChatBot /> */}
    </NavigationContainer>
    // <WelcomeScreen/>
//import { Loading } from './components/LoadingComponent';
//import Start from './components/MainComponent';


// export default function App() {
//   return (
//     <View>
//         <WelcomeScreen/>
//     </View>
  );
}


