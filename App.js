import React from 'react';
import { View } from 'react-native';
import { Loading } from './components/LoadingComponent';
import Start from './components/MainComponent';
import Home from './components/homeComponent';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './components/WelcomeScreenComponent';
import LogInScreen from './components/LoginPhoneNumber';


export default function App() {
  return (
        <View>
        <LogInScreen />
        
    </View>
    // <NavigationContainer>
    // <WelcomeScreen/>
    //   <Home />
    // </NavigationContainer>
//import { Loading } from './components/LoadingComponent';
//import Start from './components/MainComponent';


// export default function App() {
//   return (
//     <View>
//         <WelcomeScreen/>
//     </View>
  );
}


