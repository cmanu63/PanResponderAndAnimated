import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PanResponderDemo from './components/PanDemo';
//import ButtonDemo from './components/ButtonDemo';

export default class App extends Component {
  render() {
    return(
      <View style = { styles.container } >
       <PanResponderDemo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
