import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {Box} from '@material-ui/core';
import { Loading } from './LoadingComponent';




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
    firebase.auth().signOut();
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => {
          this.setState({isSignedIn: !!user})}
    );
  }
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  render() {
    if (this.state.isSignedIn) {
      const user= firebase.auth().currentUser;
      const db = firebase.firestore();
      var details={};
      // firebase.auth().signOut()
      details= user.email;
      if(!details) {
        this.props.navigation.navigate('signup');
      }
      else {
        const navigate= this.props.navigation.navigate;
        details={};
        details.name = user.displayName;
        details.phno = user.phoneNumber;
        details.email = user.email;
        db.collection('users').get().then((snapshot)=> {
          snapshot.docs.map((doc) => {
            if(doc.data().phno == details.phno) {
              details.photo = doc.data().photo;
              details.lol = doc.data().lol;
            }
          });
        })
        .then(function() {
          navigate('home', details);
        })
        .catch((err) => {
          console.log(err)
        })
        
      }
      
    }
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
          <Loading />
          {/* <h1>Signed IN</h1>
          <a onClick={() => firebase.auth().signOut()}>Sign-out</a> */}
        </div>
      );
    }
  }
}

export default LogInScreen;