import React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  Button,
  Picker,
  ScrollView
} from 'react-native';

export default class UpdateWifi extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      ssid: '',
      ssidIndex: 0,
      passphrase: '',
      availableNetworks: [],
      stuff: 'stuff',
      deviceid: '',
      public_key:"{b:30819F300D06092A864886F70D010101050003818D0030818902818100941FE3603A99651A1414A3F398916C8E122E6E18A7E241114F6FF63EF36048DE929A66FEC2E2153CFEB8919228F5553F734C2CDA44334B7A2361D668E52DA3B00F7F6990715609743703666DFD6AB0BC75DB064C071F64001062652C072833475717CFCC6888591EAC127CD70FD41BB80B4A7105B4A2E86081C3BD9BC323C7030203010001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,e:0}"
    }
  }

  componentDidMount(){
  }

  wifiSelected(ssid, ssidIndex) {
    this.setState({ssid: ssid})
    this.setState({ssidIndex: ssidIndex})
  }

  getPublicKey() {
    url = 'http://192.168.0.1/public-key'
    fetch(url, {
      method: 'GET'
    }).then((data) => {
      this.setState({stuff: JSON.stringify(data)})
    })
  }

  updateWifi() {

  }

  scanWifi() {
    url = 'http://192.168.0.1/scan-ap'
    fetch(url, {
      method: 'GET'
    }).then((data) => {
      this.setState({availableNetworks: JSON.stringify(data._bodyInit)})
      this.setState({stuff: JSON.stringify(data)})
    })
    url = 'http://192.168.0.1/device-id'
    fetch(url, {
      method: 'GET'
    }).then((data) => {
      this.setState({deviceid: JSON.stringify(data)})
    })
  }

  render(){
    return(
      <View>
        <ScrollView>
          <Text>JOIN PHOTON-*** WIFI</Text>
          <Button
            title="Update Wifi"
            onPress={() => this.updateWifi()}
          />
          <Text>{this.state.stuff}</Text>
          <Text>{this.state.deviceid}</Text>
        </ScrollView>
      </View>
    );
  }
}
