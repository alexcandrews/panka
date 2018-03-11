import React, { Component } from 'react';
import {
  ScrollView,
  FlatList,
  View,
  Alert,
  Button,
  Text,
  StyleSheet
} from 'react-native';
import {
  Cell,
  Section,
  Separator,
  TableView,
} from 'react-native-tableview-simple';

// type Props = {};
export default class Devices extends Component {

  state = {
    devices: []
  }

  componentDidMount() {
    this.getUserDevices(this.props.navigation.state.params.user_id)
  }

  getUserDevices = async (user_id) => {
    url = 'http://localhost:5000/api/v1.0/users_devices/' + user_id
    url = 'http://smartcloud-backend.herokuapp.com/api/v1.0/users_devices/' + user_id
    const response = await fetch(url)
    const json = await response.json()
    this.setState({devices: json.devices})
  }

  render() {
    const { params } = this.props.navigation.state
    const navigate = this.props.navigation.navigate
    return (
      <ScrollView>
      <FlatList
        data={this.state.devices}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, separators }) =>
          <Cell
            title={item.name}
            titleTextColor="#007AFF"
            onPress={() => navigate('Device', {device: item})}
            onHighlightRow={separators.highlight}
            onUnHighlightRow={separators.unhighlight}
          />}
        ItemSeparatorComponent={({ highlighted }) =>
        <Separator isHidden={highlighted} />}
        />
        <Button title='Add Device' onPress={() =>
          navigate('AddDevice')
        } />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#EFEFF4',
    flex: 1
  },
});
