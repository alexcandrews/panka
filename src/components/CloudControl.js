import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Picker,
  Text,
  Button
} from 'react-native';

// type Props = {};
export default class CloudControl extends Component {
  constructor() {
    super();
    this.state = {
      patterns: ['SOLID', 'LIGHTNING', 'PULSE', 'REACTIVE', 'RAINBOW'],
      red: 0,
      green: 0,
      blue: 0,
      colorRange: Array.from({length: 256}, (x,i) => JSON.stringify(i)),
      currPattern: 'SOLID',
      currPatternIndex: 0,
      cloudColor: 'NONE',
      cloudPattern: 'NONE',
      particle_id: 'None'
    };
  }

  patternSelected(pattern, index, particle_id) {
    this.setState({currPattern: pattern});
    this.setState({currPatternIndex: index});
    this.setCloudPattern(pattern, particle_id);
  }

  redSelected(value, particle_id) {
    this.setState({red: value});
    let colorStr = this.formatRGBInt(value) + this.formatRGBInt(this.state.green) + this.formatRGBInt(this.state.blue)
    this.setCloudColor(colorStr, particle_id);
  }

  greenSelected(value, particle_id) {
    this.setState({green: value});
    let colorStr = this.formatRGBInt(this.state.red) + this.formatRGBInt(value) + this.formatRGBInt(this.state.blue)
    this.setCloudColor(colorStr, particle_id);
  }

  blueSelected(value, particle_id) {
    this.setState({blue: value});
    let colorStr = this.formatRGBInt(this.state.red) + this.formatRGBInt(this.state.green) + this.formatRGBInt(value)
    this.setCloudColor(colorStr, particle_id);
  }

  colorSelected(color, particle_id) {
    this.setState({red: color});
    this.setState({green: color});
    this.setState({blue: color});
    let colorStr = this.formatRGBInt(color) + this.formatRGBInt(color) + this.formatRGBInt(color)
    this.setCloudColor(colorStr, particle_id);
  }

  setCloudPattern(pattern, particle_id) {
    // url = 'https://smartcloud-backend.herokuapp.com/api/v1.0/devices/' + particle_id + '/set_pattern/' + pattern
    url = 'http://localhost:5000/api/v1.0/devices/' + particle_id + '/set_pattern/' + pattern
    fetch(url, {
      method: 'GET'
    }).then((data) => {
      this.setState({cloudPattern: JSON.stringify(data.status) + '\n' +
        JSON.stringify(data.url)})
    })
  }

  setCloudColor(colorStr, particle_id) {
    // url = 'https://smartcloud-backend.herokuapp.com/api/v1.0/devices/' + particle_id + '/set_color/' + colorStr
    url = 'http://localhost:5000/api/v1.0/devices/' + particle_id + '/set_color/' + colorStr
    fetch(url, {
      method: 'GET'
    }).then((data) => {
      this.setState({cloudColor: JSON.stringify(data.status) + '\n' +
        JSON.stringify(data.url)})
    })
  }

  formatRGBInt(color) {
    colorStr = String(color)
    if (colorStr.length == 3) {
      return colorStr
    } else if (colorStr.length == 2) {
      return '0' + colorStr
    } else if (colorStr.length == 1) {
      return '00' + colorStr
    } else {
      return '000'
    }
  }

  render() {

    const { params } = this.props.navigation.state
    const device = params ? params.device : {'name': 'No Name',
    'particle_id': 'null',
    'last_connected': 'null'
    };

    return (
      <View>
        <Picker selectedValue={this.state.currPatternIndex}
        onValueChange={(itemValue, itemIndex) => this.patternSelected(this.state.patterns[itemIndex], itemIndex, device.particle_id)}>
          {this.state.patterns.map((item, index) => {
            return (<Picker.Item label={item} value={index} key={index} />)
           })}
        </Picker>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
          <View style={{height: 150}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{width: 75}}><Picker selectedValue={this.state.red}
              onValueChange={(itemValue, itemIndex) => this.redSelected(itemValue, device.particle_id)}>
                {this.state.colorRange.map((item, index) => {
                  return (<Picker.Item label={item} value={index} key={index} />)
                 })}
              </Picker></View>
              <View style={{width: 75}}><Picker selectedValue={this.state.green}
              onValueChange={(itemValue, itemIndex) => this.greenSelected(itemValue, device.particle_id)}>
                {this.state.colorRange.map((item, index) => {
                  return (<Picker.Item label={item} value={index} key={index} />)
                 })}
              </Picker></View>
              <View style={{width: 75}}><Picker selectedValue={this.state.blue}
              onValueChange={(itemValue, itemIndex) => this.blueSelected(itemValue, device.particle_id)}>
                {this.state.colorRange.map((item, index) => {
                  return (<Picker.Item label={item} value={index} key={index} />)
                 })}
              </Picker></View>
            </View>
          </View>
          <View style={{height: 150}}>
            <Text>Cloud Pattern: {this.state.cloudPattern}</Text>
            <Text>Cloud Color: {this.state.cloudColor}</Text>
          </View>
        </View>
        <Button title="Update Wifi" onPress={() =>
          this.props.navigation.navigate('UpdateWifi')
        } />
      </View>
    );
  }
}
