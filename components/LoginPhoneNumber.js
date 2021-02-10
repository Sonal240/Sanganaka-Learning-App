import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {Box} from '@material-ui/core';

const config = {
  apiKey: 'AIzaSyAve9SFpbBZeS40BMYwD4KNzMoht1SyxnI',
  authDomain: 'sanganaka-f8486.firebaseapp.com',
};
firebase.initializeApp(config);


const uiConfig = {
  signInFlow: 'popup',
  callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    },
  signInOptions: [
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ]
};


class LogInScreen extends React.Component {
  state = {
    isSignedIn: false // Local signed-in state.
  };
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => {
          this.setState({isSignedIn: !!user})}
    );
  }
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  render() {
    if (!this.state.isSignedIn) {
      return (
        <Box my='6rem'>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </Box>
      );
    }
    else {
      return (
        <div>
          <h1>Signed IN</h1>
          <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
        </div>
      );
    }
  }
}

export default LogInScreen;