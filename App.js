import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Imgupload from './components/Imgupload';
import ScreenOne from './components/ScreenOne';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
componentDidMount(){

}
  render() {
    return (
     // <SignIn/>
     // <SignUp/>
      //<Home/>
     <Dashboard/>
      //<Imgupload/>
     // <ScreenOne/>
    );
  }
}
