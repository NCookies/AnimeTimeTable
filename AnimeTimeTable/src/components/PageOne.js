import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import PageTwo from './PageTwo';

export default class PageOne extends Component {
  render() {
    return (
      <ScrollableTabView>
          <Text>Hello 1</Text>
          <Text>Hello 2</Text>
          <Text>Hello 3</Text>
      </ScrollableTabView>
    )
  }
}

// <ScrollableTabView
//   renderTabBar={() => <DefaultTabBar />}
//   ref={(tabView) => { this.tabView = tabView; }}
// >
//     <Text tabLabel='Tab #1'>My</Text>
//     <Text tabLabel='Tab #2'>favorite</Text>
//     <Text tabLabel='Tab #3'>project</Text>
// </ScrollableTabView>
