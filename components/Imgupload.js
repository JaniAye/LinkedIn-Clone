import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';


export default class Imgupload extends Component {
  constructor(props) {
    super(props);
    this.state = {
        imagePath:'',
        imageName:''
    };
  }

  getImageFromGalary=() => {
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image);
        this.setState({
            imagePath:image.path
        })
        this.setState({
            imageName:image.modificationDate
        })
        this.uploadImage()
      });
  }

  uploadImage = async () =>{
      const fileName=this.state.imageName+".jpg";
    const reference = storage().ref(`images/${fileName}`);
    await reference.putFile(this.state.imagePath);
    const url = await storage().ref(`images/${fileName}`).getDownloadURL();
    console.log('====================================');
    console.log(url);
    console.log('====================================');
  }
  render() {
    return (
        <View style={styles.constainer}>
        <Text> Imgupload </Text>
        <Button style={styles.btn} mode="contained" onPress={this.getImageFromGalary}>
         Login
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
    }
  })
  