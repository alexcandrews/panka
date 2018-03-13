import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  StyleSheet,
  StatusBar
} from 'react-native';

export default class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  login(loginInfo) {

    url = 'http://smartcloud-backend.herokuapp.com/login'
    url = 'http://localhost:5000/login'

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      args: JSON.stringify({
        'email': 'email'
      }),
    });
  }

  getUser = async (email) => {
    url = 'http://localhost:5000/api/v1.0/users/' + user_id
    const response = await fetch(url)
    const json = await response.json()
    this.setState({devices: json.devices})
  }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <TextInput style = {styles.input}
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({email: text})}
                            onSubmitEditing={() => this.passwordInput.focus()}
                            autoCorrect={false}
                            keyboardType='email-address'
                            returnKeyType="next"
                            placeholder='email or phone'
                            placeholderTextColor='rgba(0,0,0,0.5)'/>

                <TextInput style = {styles.input}
                           returnKeyType="go" ref={(input)=> this.passwordInput = input}
                           placeholder='passphrase'
                           placeholderTextColor='rgba(0,0,0,0.5)'
                           secureTextEntry/>
              <TouchableOpacity style={styles.buttonContainer}
                onPress={() => this.login(this.state.email) }>
                <Text style={styles.buttonText}>login</Text>
              </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
     padding: 20
    },
    input:{
        height: 40,
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        color: 'rgba(0,0,0,0.5)'
    },
    buttonContainer:{
        backgroundColor: 'white',
        paddingVertical: 15
    },
    buttonText:{
        color: '#007AFF',
        textAlign: 'center',
        fontWeight: '700'
    },
    loginButton:{
      backgroundColor:  '#2980b6',
       color: '#fff'
    }

});
