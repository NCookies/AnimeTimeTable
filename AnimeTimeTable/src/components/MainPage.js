import React, { Component, PropTypes } from 'react';
import
{
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import CustomTabBar from './CustomTabBar';
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
        const {routes} = this.context;

        return (
            <ScrollableTabView style={{backgroundColor: '#ECF0F1'}}>
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
