import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput
} from 'react-native';

export default class AddDevice extends Component {
  constructor() {
    super();
    this.state = {
      name: 'None',
      device_id: ''
    };
  }

  getDeviceId = async () => {
    url = '192.168.0.1/device-id'
    const response = await fetch(url)
    const json = await response.json()
    this.setState({devices: json})
  }

  getUserDevices = async (user_id) => {
    // url = 'http://localhost:5000/api/v1.0/users_devices/' + user_id
    url = 'http://smartcloud-backend.herokuapp.com/api/v1.0/users_devices/' + user_id
    const response = await fetch(url)
    const json = await response.json()
    this.setState({devices: json.devices})
  }

  addDevice = async (deviceData) => {
    url = 'http://localhost:5000/api/v1.0/devices'
    const response = await fetch(url, {method: 'POST', data: deviceData})
    const json = await response.json()
    this.props.navigation.goBack()
  }

  componentDidMount() {
    this.getDeviceId()
  }

  render() {
    const { params } = this.props.navigation.state

    return (
      <View>
        <Text>Device should be plugged in and flashing blue</Text>
        <Text>Connect to SMARTCLOUD network in Settings > Wifi</Text>
        <TextInput style = {styles.input}
                    autoCapitalize="none"
                    onChangeText={(text) => this.setState({name: text})}
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder='name'
                    placeholderTextColor='rgba(0,0,0,0.5)'/>
        <TextInput style = {styles.input}
                    autoCapitalize="none"
                    onChangeText={(text) => this.setState({device_id: text})}
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder='device-id'
                    placeholderTextColor='rgba(0,0,0,0.5)'/>

        <Button title='Save' onPress={() =>
          this.addDevice({'name': this.state.name})
        } />
        <Button title='Cancel' onPress={() =>
          this.props.navigation.goBack()
        } />
      </View>
    );
  }
}


const styles = StyleSheet.create({
    input:{
        height: 40,
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
    }
});
