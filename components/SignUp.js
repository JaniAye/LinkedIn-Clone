import React, { Component } from 'react';
import { View, Text,StyleSheet, Image , TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '211156240757-79ulqi61aj4d88sa6vioi42qpltbvfai.apps.googleusercontent.com',
});

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
      <View style={styles.container}>
        <Image
           style={styles.linkedInImg}
           source={require('../assets/Linkedin-Logo.png')}
         />

        <Text style={styles.txtJoinin}>Join Linkedin</Text>
               
          <TouchableOpacity style={styles.btnSignIN}
            onPress={() => navigate('Signin', { name: 'Signin' })}
          >
               <Text style={styles.txtor}>or
               <Text style={styles.txtSignIn}> sign in</Text>
               </Text>
                   
        </TouchableOpacity>
      <TextInput  style={styles.txtinput1}
      secureTextEntry
          label="Enter your email :"
          value={this.state.email}
          onChangeText={text => this.setState(
              {email:text}
          )}
      />
      <TextInput  style={styles.txtinput1}
          label="Enter User name :"
          value={this.state.userName}
          onChangeText={text => this.setState(
              {userName:text}
          )}
      />

      <TextInput style={styles.txtinput2}
          label="Enter your password :"
          value={this.state.password}
          onChangeText={text => this.setState(
              {password:text}
          )}
      />

        <Button style={styles.btnRegister} mode="contained" onPress={this.registerUser}>
        <Text style={styles.txtContinue}>Continue</Text>
        </Button>

       
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: '#95a5a6', opacity:0.3}}/>
        <View>
          <Text style={{width: 50, textAlign: 'center'}}>or</Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: '#95a5a6', opacity:0.3}} />
        </View>
        <TouchableOpacity style={styles.btnGoogle}   
              onPress={this.onGoogleButtonPress}> 
            <Image style={styles.imgGoogle}
                source={require('../assets/google-logo.png')}
            />
            <Text style={styles.txt2}>Sign in with Google</Text>
         </TouchableOpacity>
       
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FEFEFE',
      color: '#FEFEFE',
      margin:7,
  },
  btnGoogle:{
    marginTop:15,
    width: 350,
    height: 50,
    backgroundColor:'white',
    alignSelf:'center',
    borderRadius:30,
    borderColor:'#646464',
    borderWidth:1
},
  imgGoogle: {
    marginTop:10,
    width: 25,
    height: 25,
    alignSelf:'center',
    marginLeft:-210,
},
  linkedInImg: {
      marginTop: 15,
      width: 100,
      height: 25,
      marginLeft: 10,
      marginBottom:40
  },
  txt2:{
    fontSize:20,
    alignSelf:'center',
   
    marginTop:-27,
    fontWeight:'bold'
},
  txtJoinin:{
    fontWeight:'bold',
      fontSize:30, 
      color:'#202124',
      marginTop:20,
      marginLeft:5
  },
  txtSignIn: {
      fontSize:17, 
      color: '#0A66C2',

  },
  txtor:{
    fontWeight:'bold',
  color:'#34495e',
      fontSize:17,
  },
  txtinput1: {
      marginTop: 10
  },
  btnRegister:{
      marginTop:20,
      backgroundColor:'#0A66C2',
      width: 350,
      height: 50,
      alignSelf:'center',
      borderRadius:30,
      marginBottom:20
    },
  txtContinue: {
      fontSize: 20,
      color: 'white',
      marginTop: 10
  },
  txt6: {
      alignSelf: 'center',
      marginTop: 15
  },
  gbtn:{
    marginTop:10,
      width: 350,
      height: 50,
      backgroundColor:'white',
      alignSelf:'center',
      borderRadius:30,
      borderColor:'#646464',
      borderWidth:1
  },
 
  btnSignIN: {
      marginTop: 10,
      marginLeft: 5,
  },
  txtinput2: {
      marginTop: 10
  },
})
