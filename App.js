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
import AddDevice from './src/components/AddDevice'
import Device from './src/components/Device'
import CloudControl from './src/components/CloudControl'
import UpdateWifi from './src/components/UpdateWifi'

import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: 'panka.auth0.com', clientId: 'AM8nw8NClScwIkJe6KT4iayj61aIyVGA' });

auth0
    .webAuth
    .authorize({scope: 'openid profile email', audience: 'https://panka.auth0.com/userinfo'})
    .then(credentials =>
      console.log(credentials)
      // Successfully authenticated
      // Store the accessToken
    )
    .catch(error => console.log(error));

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
    AddDevice: {
      screen: AddDevice,
      title: 'AddDevice'
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
