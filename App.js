import React from 'react';
import { View } from 'react-native';
import { Loading } from './components/LoadingComponent';
import Start from './components/MainComponent';
import Home from './components/homeComponent';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './components/WelcomeScreenComponent';

export default function App() {
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
//import { Loading } from './components/LoadingComponent';
//import Start from './components/MainComponent';


// export default function App() {
//   return (
//     <View>
//         <WelcomeScreen/>
//     </View>
  );
}


