import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        description:''
    };
    const subscriber = firestore()
    .collection('usersData')
    .doc('O7L2RASVGNzo7I059lJY')
    .onSnapshot(documentSnapshot => {
      console.log('User data: ', documentSnapshot.data());
      this.setState({
        description:documentSnapshot.data().description
      })
    });
  }

  saveDes =() =>{
    firestore()
    .collection('usersData')
    .add({
        description: this.state.description,
     
    })
    .then(() => {
      console.log('User added!');
      this.setState({
          description:''
      })
    });
  }
  render() {
    return (
        <View style={styles.constainer}>
            <Text> Home </Text>
            <TextInput  style={styles.input}
                label="Description:"
                value={this.state.description}
                onChangeText={text => this.setState(
                    {description:text}
                 )}
            />
             <Button style={styles.btn} mode="contained" onPress={this.saveDes}>
                Post
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
  