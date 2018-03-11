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
    // url = 'http://localhost:5000/login'
    url = 'http://smartcloud-backend.herokuapp.com/login'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(loginInfo)
    }).then((data) => {
      let user_id = 1
      this.props.navigate('Devices', {user_id: user_id})
    })
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
                            placeholderTextColor='rgba(225,225,225,0.7)'/>

                <TextInput style = {styles.input}
                           returnKeyType="go" ref={(input)=> this.passwordInput = input}
                           placeholder='passphrase'
                           placeholderTextColor='rgba(225,225,225,0.7)'
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
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: 'rgba(225,225,225,0.1)',
        paddingVertical: 15
    },
    buttonText:{
        color: 'rgba(225,225,225,0.7)',
        textAlign: 'center',
        fontWeight: '700'
    },
    loginButton:{
      backgroundColor:  '#2980b6',
       color: '#fff'
    }

});
