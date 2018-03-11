import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

export default class CloudControl extends Component {
  constructor() {
    super();
    this.state = {
      device_id: 'None',
      pattern: '',
      color: ''
    };
  }

  render() {
    const { params } = this.props.navigation.state
    const device = params ? params.device : {'name': 'No Name',
    'particle_id': 'null',
    'last_connected': 'null'
  };

    return (
      <View>
        <Text>Device Name: {device.name}</Text>
        <Text>Device id: {device.particle_id}</Text>
        <Text>Last Connected: {device.last_connected}</Text>
        <Button title='Set Color & Pattern' onPress={() =>
          this.props.navigation.navigate('CloudControl', {device: device})
        } />
      </View>
    );
  }
}
