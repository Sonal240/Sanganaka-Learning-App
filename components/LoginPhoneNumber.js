import React from 'react';
import * as firebase from 'firebase';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha'
import { Loading } from './LoadingComponent';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import styles from './styles/stylesheet';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';



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


class LogInScreen extends React.Component {
  state = {
    isSignedIn: false, // Local signed-in state.
    phone: '',
    otp: false,
    otpCode: '',
    verificationId: '',
    message: null
  };
  confirmationResult = '';
  recaptchaVerifier = {
    current: null
  };
  showMessage = (val) => {
    this.setState({
      message: val
    })
  }
  // verifyPhone = ()=> {
  //   recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  //   appVerifier = recaptchaVerifier;
  //   phoneNumber = this.phone;
    

  //   firebase.auth().signInWithPhoneNumber(()=> {return ('+91'+phoneNumber)}, appVerifier)
  //   .then((confirmationResult) => {
  //     // SMS sent. Prompt user to type the code from the message, then sign the
  //     // user in with confirmationResult.confirm(code).
  //     this.confirmationResult = confirmationResult;
  //     this.setState({
  //       otp: true
  //     });
  //     // ...
  //   }).catch((error) => {
  //     // Error; SMS not sent
  //     // ...
  //     recaptchaVerifier.render().then((widgetId) => {
  //       grecaptcha.reset(widgetId);
  //     });
  //   });
  // }
  submitCode = ()=> {
    this.confirmationResult.confirm(otpCode).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(user);
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      console.log(error);
    });
  }
  componentDidMount() {
    firebase.auth().signOut();
    this.setState({
        otp: false
      });
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
      if(this.state.otp) {
        return (
          <View style={styles.container}>
            <Text style={styles.fontBlue}>
              Enter your OTP: -
            </Text>
            <TextInput
                label="OTP here."
                value={this.otpCode}
                type= 'outline'
                style={{width: '80%', marginBottom: 250}}
                onChangeText={text => this.setState({
                  otpCode: text
                })}
              />
              <Button mode="contained" 
              style={{width:150, 
                backgroundColor: 'blue', 
                marginRight: `50%`, 
                position: 'absolute'}} 
                onPress={async () => {
                  try {
                      const credential = firebase.auth.PhoneAuthProvider.credential(
                        this.state.verificationId,
                        this.state.otpCode
                      );
                      await firebase.auth().signInWithCredential(credential);
                      this.setState({
                        message:{ text: 'Phone authentication successful 👍' }
                      });
                    } catch (err) {
                      this.setState({
                        message: { text: `Error: ${err.message}`, color: 'red' }
                      });
                    }
                }}>
                Login/Signup
              </Button>
              {this.state.message ? (
                <TouchableOpacity
                  style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: 0xffffffee, justifyContent: 'center' },
                  ]}
                  onPress={() => this.showMessage(undefined)}>
                  <Text
                    style={{
                      color: this.state.message.color || 'blue',
                      fontSize: 17,
                      textAlign: 'center',
                      margin: 20,
                    }}>
                    {this.state.message.text}
                  </Text>
                </TouchableOpacity>
              ) : (
                undefined
              )}
          </View>
        );
      }
      else{
        return (
          <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref= {this.recaptchaVerifier}
                firebaseConfig= {config}
                attemptInvisibleVerification= {false}
              />
            <Text style={styles.fontBlue}>
              Enter your phone  number: -
            </Text>
            <TextInput
                label="Phone No."
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                value={this.phone}
                type= 'outline'
                style={{width: '80%', marginBottom: 250}}
                onChangeText={text => this.setState({
                  phone: '+91'+text
                })}
              />
              <Button mode="contained" 
              style={{width:150, 
              backgroundColor: 'blue', 
              marginRight: `50%`, 
              position: 'absolute'}} 
              disabled={!this.state.phone}
              onPress={async ()=> {
                // The FirebaseRecaptchaVerifierModal ref implements the
                  // FirebaseAuthApplicationVerifier interface and can be
                  // passed directly to `verifyPhoneNumber`.
                  try {
                    const phoneProvider = new firebase.auth.PhoneAuthProvider();
                    const verificationId = await phoneProvider.verifyPhoneNumber(
                      this.state.phone,
                      this.recaptchaVerifier.current
                    );
                    this.setState({
                      verificationId: verificationId
                    })
                    this.setState({
                      message: {
                      text: 'Verification code has been sent to your phone.',
                    }});
                    this.setState({
                      otp: true
                    })
                  } catch (err) {
                    this.setState({
                      message: { text: `Error: ${err.message}`, color: 'red' }
                    });
                  }
                }}>
                Verify
              </Button>
              {this.state.message ? (
                  <TouchableOpacity
                    style={[
                      StyleSheet.absoluteFill,
                      { backgroundColor: 0xffffffee, justifyContent: 'center' },
                    ]}
                    onPress={() => this.showMessage(undefined)}>
                    <Text
                      style={{
                        color: this.state.message.color || 'blue',
                        fontSize: 17,
                        textAlign: 'center',
                        margin: 20,
                      }}>
                      {this.state.message.text}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  undefined
                )}
          </View>
        );
      }
    }
    else {
      return (
        <>
          <Loading />
          {/* <h1>Signed IN</h1>
          <a onClick={() => firebase.auth().signOut()}>Sign-out</a> */}
        </>
      );
    }
  }
}

export default LogInScreen;