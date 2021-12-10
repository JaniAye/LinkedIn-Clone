import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

        data:[]
    };


    const subscriber = firestore()
    .collection('usersData')
    .onSnapshot(querySnapshot => {
      const descrip = [];

      querySnapshot.forEach(documentSnapshot => {
        descrip.push({
            description:documentSnapshot.data().description,
            key:documentSnapshot.id
        });
      });
      this.setState({
          data:descrip
      })
     
    });

  }

  render() {
    return (
      <View>
        <Text> Dashboard </Text>
        <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                    <View style={{ height: 150, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Name: {item.description}</Text>
                    
                    </View>
                )}
                keyExtractor={(item) => {
                    item.key
                }}
            />
      </View>
    );
  }
}
