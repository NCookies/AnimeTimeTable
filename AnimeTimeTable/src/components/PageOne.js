import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import PageTwo from './PageTwo';
import CustomTabBar from './CustomTabBar';

const styles = StyleSheet.create({
  container: {

  },
});

export default class PageOne extends Component {
    render() {
        return (
            <ScrollableTabView renderTabBar={() => <CustomTabBar />}>
                <PageTwo tabLabel="asdfsf"/>
                <PageTwo tabLabel="aa"/>
                <PageTwo tabLabel="bb"/>
                <PageTwo tabLabel="cc"/>
            </ScrollableTabView>
        )
    }
}

/*
<ScrollableTabView style={styles.container}>
    <Text tabLabel="월"></Text>
    <Text tabLabel="화"></Text>
    <Text tabLabel="수"></Text>
    <Text tabLabel="목"></Text>
    <Text tabLabel="금"></Text>
    <Text tabLabel="토"></Text>
    <Text tabLabel="일"></Text>
    <Text onPress={Actions.pageOne} tabLabel="test">aaa</Text>
</ScrollableTabView>
*/
