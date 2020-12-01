import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
//import { Loading } from './components/LoadingComponent';
//import Start from './components/MainComponent';
import WelcomeScreen from './components/WelcomeScreenComponent';

export default function App() {
  return (
    <View>
        <WelcomeScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
