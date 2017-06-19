import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import
{
    Scene,
    Router,
    Reducer,
    Switch,
    Modal,
    Actions
} from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore()
const RouterWithRedux = connect()(Router);

import MainPage from './components/MainPage';

import DailyAnime from './components/DailyAnime';
import SampleInfo from './components/SampleInfo';
import Bookmark from './components/Bookmark';

import AnimeInfoPage from './components/AnimeInfoPage';
import DetailInfo from './components/DetailInfo';
import Subtitle from './components/Subtitle';

import BookmarkPage from './components/BookmarkPage';

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        return defaultReducer(state, action);
    };
};

/*
router-flux 에서는 App 에 reducer 를 작성함
모든 컴포넌트의 속성을 선언해줘야 함

component의 이름 대신 Scene 태그를 만들고 component 속성으로 불러옴
key 는 각 Scene 을 구분할 수 있는 아이디. Action 에서 호출할 때 사용됨
title 은 상단바에 보여지는 제목

initial={true} 는 이 페이지가 가장 먼저 보여진다는 의미임
TabView 처럼 여러 Scene 이 하나의 Scene에 포함될 때 하나의 Scene에 initial 속성을 지정할 수 있음
ex)
<Scene>
    <Scene key="tab1" component={TabView} initial ...>
    <Scene key="tab2" component={TabView} ...>
    <Scene key="tab3" component={TabView} ...>
    <Scene key="tab4" component={TabView} ...>
</Scene>

hideTabBar, hideNavBar 속성을 이용하여 TaBar와 NavBar를 숨길 수 있음

나머지는 React.js 와 비슷한 듯함
*/
export default class App extends Component {

    render() {
        const Scenes = Actions.create(
            <Scene key="root">

                <Scene key="main" component={MainPage} title="메인" initial={true}>
                    <Scene key="dailyAnime" component={DailyAnime} />
                </Scene>

                <Scene key="bookmarkPage" component={BookmarkPage} title="즐겨찾기" />

                <Scene key="animeInfoPage" component={AnimeInfoPage} title="애니정보" />

            </Scene>
        )

        return (
            <Provider store={store}>
                <RouterWithRedux scenes={Scenes} />
            </Provider>
        )
    }
}
