import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry
} from 'react-native';
import Login from './src/components/Login'
import Devices from './src/components/Devices'
import Device from './src/components/Device'
import CloudControl from './src/components/CloudControl'
import UpdateWifi from './src/components/UpdateWifi'

console.disableYellowBox = true;

export default class App extends Component<Props> {
  render() {
    return (
      <RootStack />
    );
  }
}

const RootStack = StackNavigator (
  {
    Login: {
      screen: Login,
      title: 'Login'
    },
    Devices: {
      screen: Devices,
      title: 'Devices'
    },
    Device: {
      screen: Device,
      title: 'Device'
    },
    CloudControl: {
      screen: CloudControl,
      title: 'CloudControl'
    },
    UpdateWifi: {
      screen: UpdateWifi,
      title: 'Settings'
    }
  },
  {
    initialRouteName: 'Login',
  }
);

AppRegistry.registerComponent('App', () => App);
