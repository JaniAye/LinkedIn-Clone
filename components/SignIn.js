import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  webClientId: '211156240757-79ulqi61aj4d88sa6vioi42qpltbvfai.apps.googleusercontent.com',
});

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
    };
  }

  userLogin = () =>{
    auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password )
    .then((user) => {

    console.log(user);
      console.log('signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });
   }
   onGoogleButtonPress = async () =>{

      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
    
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
      // Sign-in the user with the credential
      const user= auth().signInWithCredential(googleCredential);
      console.log((await user).user);


   }
  
  render() {
    return (
      <View style={styles.constainer}>
      <Text> Sign In </Text>
      <TextInput  style={styles.input}
          label="Enter your email :"
          value={this.state.email}
          onChangeText={text => this.setState(
              {email:text}
          )}
      />

      <TextInput style={styles.input}
          label="Enter your password :"
          value={this.state.password}
          onChangeText={text => this.setState(
              {password:text}
          )}
      />
       <Button style={styles.btn} mode="contained" onPress={this.userLogin}>
         Login
      </Button>

      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this.onGoogleButtonPress}
     />

      </View>
    );
  }
}
const styles=StyleSheet.create({
  btn: {
      marginTop: 20,
      width: 300
  },
  constainer: {
      flex: 1,
      alignItems: 'center'
  },
  input: {
      width: 300,
      marginTop: 15,

  },
  x: {
      marginBottom: 150,
      marginTop: 50
  }
})
