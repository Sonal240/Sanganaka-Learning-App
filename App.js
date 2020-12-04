import React from 'react';
import { View } from 'react-native';
import { Loading } from './components/LoadingComponent';
import Start from './components/MainComponent';
import Home from './components/homeComponent';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './components/WelcomeScreenComponent';
import LogInScreen from './components/LoginPhoneNumber';
import Article from './components/articleDisplay';


export default function App() {
  return (
    //     <View>
    //     <LogInScreen />
        
    // </View>
    <NavigationContainer>
      <Home />
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


