import React, { Component } from 'react';
import
{
    View,
    Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import CustomTabBar from './CustomTabBar';
import DailyAnime from './DailyAnime';

export default class MainPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollableTabView>
                <DailyAnime tabLabel="월" dayOfWeek={0}/>
                <DailyAnime tabLabel="화" dayOfWeek={1}/>
                <DailyAnime tabLabel="수" dayOfWeek={2}/>
                <DailyAnime tabLabel="목" dayOfWeek={3}/>
                <DailyAnime tabLabel="금" dayOfWeek={4}/>
                <DailyAnime tabLabel="토" dayOfWeek={5}/>
                <DailyAnime tabLabel="일" dayOfWeek={6}/>
            </ScrollableTabView>
        )
    }
}
