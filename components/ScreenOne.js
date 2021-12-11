import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class ScreenOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // setTimeout(() => {
    //     navigate('Signin'); 
    // }, 2000); 

    return (
        <View style={styles.container}>
        <View style={styles.container2}>
            <View style={styles.container3}>
            <Image
                style={styles.tinyLogo}
                source={require('../assets/Linkedin-Logo.png')}
            />      
            </View>    
        </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    container :{
        backgroundColor: '#f1f2f6',
        height : '100%',
    },
    container2 : {
        height : '75%', 
        transform : [{ scaleX : 2 }],
        borderBottomStartRadius : 350,
        borderBottomEndRadius : 350,
        overflow : 'hidden',
    },
    container3 : {
        flex : 1,
        transform : [{ scaleX : 0.5 }],
        backgroundColor: '#FEFEFE',
        alignItems : 'center',
        justifyContent : 'center'
    },
    tinyLogo: { 
        marginTop:150,
        width: 220,
        height: 55,
    },
})