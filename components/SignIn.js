import React, { Component } from 'react';
import { View, Text,StyleSheet, Image ,TouchableOpacity } from 'react-native';
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
      <View style={styles.container}>
       <Image
           style={styles.imgLinkedIn}
           source={require('../assets/Linkedin-Logo.png')}
      />
       <TouchableOpacity onPress={() => navigate('Signup', { name: 'Signup' })}>
          <Text style={styles.txtJoin}>
             Join now
          </Text>
        </TouchableOpacity>
            <Text style={styles.txtSignIN}>
                Sign in
            </Text>
      <TextInput  style={styles.txtinput1}
          label="Enter your email :"
          value={this.state.email}
          onChangeText={text => this.setState(
              {email:text}
          )}
      />

      <TextInput style={styles.txtinput1}
          label="Enter your password :"
          value={this.state.password}
          onChangeText={text => this.setState(
              {password:text}
          )}
      />
      <TouchableOpacity style={styles.btn3}>
                    <Text style={styles.txt4}>
                        Forgot password?
                    </Text>
                </TouchableOpacity>
       <Button style={styles.btnContinue} mode="contained" onPress={this.userLogin}>
          <Text style={styles.txt1}>
              Continue   
         </Text>
      </Button>
       <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: '#95a5a6', opacity:0.3}}/>
        <View>
          <Text style={{width: 50, textAlign: 'center'}}>or</Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: '#95a5a6', opacity:0.3}} />
        </View>

      {/* <GoogleSigninButton
        style={styles.btn2}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this.onGoogleButtonPress}
     /> */}

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
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FEFEFE',
      color: '#FEFEFE',
      margin: 10,
  },
  txtinput1: {
    marginTop: 10,
},
imgLinkedIn: {
      marginTop: 10,
      width: 100,
      height: 25,
      marginLeft: 10
  },
  imgGoogle: {
    marginTop:10,
    width: 25,
    height: 25,
    alignSelf:'center',
    marginLeft:-210,
},
 
  txt1:{
      fontSize:20,
      color:'white'
  },
  txt2:{
      fontSize:20,
      alignSelf:'center',
     
      marginTop:-27,
      fontWeight:'bold'
  },
  txtJoin:{
      fontSize:16,
      fontWeight:'bold',
      alignSelf:'center',
      color:'#0A66C2',
      marginTop:-20,
      marginLeft:290
  },
  txt4:{
      fontSize:16,
      alignSelf:'center',
      color:'#0A66C2'
  },
  txtSignIN:{
   
      fontSize:35, 
      color:'#202124',
      marginTop:20,
      marginLeft:5,
      marginBottom:20
  },
  btnContinue:{
      marginTop:15,
      backgroundColor:'#0A66C2',
      width: 350,
      height: 50,
      alignSelf:'center',
      borderRadius:30,
      marginBottom:15
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
  btn3:{
      marginTop:15,
      width:150,
      height:25,
  },
   
})
