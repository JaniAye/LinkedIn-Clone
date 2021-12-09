import React, { Component } from 'react';
import { View, Text } from 'react-native';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SignIn/>
      //<SignUp/>
    );
  }
}
