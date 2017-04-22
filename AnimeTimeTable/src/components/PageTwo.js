import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from "react-native-button";
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class PageTwo extends Component {
  render() {
    return (
        <View>
            <Button onPress={Actions.tabbar}>Go to TabBar page</Button>
        </View>
    )
  }
}
