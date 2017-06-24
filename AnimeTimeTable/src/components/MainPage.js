import React, { Component } from 'react';
import
{
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome'


import ScrollableTabView from 'react-native-scrollable-tab-view';

import CustomTabBar from './CustomTabBar';
import FacebookTabBar from './FacebookTabBar';
import DailyAnime from './DailyAnime';


// this.props.routes.scene 을 통하여 props에 접근할 수 있음
// react-native 에서는 모든 component에 connect를 해주는 듯
// 다른 route 에 Actions.SCENE_KEY(PARAMS)로 접근할 수 있음
class MainPage extends Component {

    static propTypes = {
        routes: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    render() {

        let dt = new Date();
        let weekday = dt.getDay() - 1;
        if (weekday < 0) weekday = 6;

        return (
            <ScrollableTabView
                initialPage={weekday}
                tabBarPosition="bottom">

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

export default connect(({routes}) => ({routes}))(MainPage);
