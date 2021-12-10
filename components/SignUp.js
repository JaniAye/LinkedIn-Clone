import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      userName:''
    };
  }
  registerUser = () =>{
    auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((createdUser) => {
        createdUser.user.updateProfile({
            displayName:this.state.userName
        })
        

      console.log('User account created & signed in!');
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

  render() {
    return (
      <View style={styles.constainer}>
      <Text> SignUpPage </Text>
      <TextInput  style={styles.input}
          label="Enter your email :"
          value={this.state.email}
          onChangeText={text => this.setState(
              {email:text}
          )}
      />
      <TextInput  style={styles.input}
          label="Enter User name :"
          value={this.state.userName}
          onChangeText={text => this.setState(
              {userName:text}
          )}
      />

      <TextInput style={styles.input}
          label="Enter your password :"
          value={this.state.password}
          onChangeText={text => this.setState(
              {password:text}
          )}
      />

        <Button style={styles.btn} mode="contained" onPress={this.registerUser}>
           Signup
        </Button>
       
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
