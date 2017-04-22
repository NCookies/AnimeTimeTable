import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import CustomTabBar from './CustomTabBar';
import DailyAnime from './DailyAnime';

export default class MainPage extends Component {
    render() {
        return (
            <ScrollableTabView renderTabBar={() => <CustomTabBar />}>
                <DailyAnime tabLabel="월" />
                <DailyAnime tabLabel="화" />
                <DailyAnime tabLabel="수" />
                <DailyAnime tabLabel="목" />
                <DailyAnime tabLabel="금" />
                <DailyAnime tabLabel="토" />
                <DailyAnime tabLabel="일" />
            </ScrollableTabView>
        )
    }
}
