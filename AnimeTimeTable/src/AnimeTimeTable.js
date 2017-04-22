import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

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
        return (
            <Router createReducer={reducerCreate} sceneStyle={{backgroundColor:'#F7F7F7'}}>
                <Scene key="root">

                    <Scene key="main" component={MainPage} title="메인" initial={true}>
                        <Scene key="dailyAnime" component={DailyAnime}>
                            <Scene key="sampleInfo" component={SampleInfo} />
                            <Scene key="bookmark" component={Bookmark} />
                        </Scene>
                    </Scene>

                    <Scene key="bookmarkPage" component={BookmarkPage} title="즐겨찾기" />

                    <Scene key="animeInfoPage" component={AnimeInfoPage} title="애니정보">
                        <Scene key="detailInfo" component={DetailInfo} />
                        <Scene key="subtitle" component={Subtitle} />
                    </Scene>

                </Scene>
            </Router>
        )
    }
}

// <Scene key="tabbar" tabs={true} >
//     <Scene key="tab1"  title="Tab #1">
//     </Scene>
//     <Scene key="tab2" initial={true} title="Tab #2" >
//     </Scene>
//     <Scene key="tab3" component={TabView} title="Tab #3" hideTabBar={true} />
//     <Scene key="tab4" component={TabView} title="Tab #4" hideNavBar={true} />
//     <Scene key="tab5" component={TabView} title="Tab #5"  />
// </Scene>




// <Scene key="launch" component={Launch} title="Launch" initial={true} style={{flex:1, backgroundColor:'transparent'}}/>
//
// <Scene key="pageOne" component={PageOne}>
//     <Scene key="pageTwo" component={PageTwo} title="PageTwo">
//
//
//
//     </Scene>
// </Scene>
//
// <Scene key="tabbar" component={NavigationDrawer}>
//     <Scene
//         key="main"
//         tabs
//         tabBarStyle={styles.tabBarStyle}
//         tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
//         >
//         <Scene key="tab1" component={TabView} title="월" icon={TabIcon} />
//         <Scene key="tab2" component={TabView} title="화" icon={TabIcon} />
//         <Scene key="tab3" component={TabView} title="수" icon={TabIcon} />
//         <Scene key="tab4" component={TabView} title="목" icon={TabIcon} />
//         <Scene key="tab5" component={TabView} title="금" icon={TabIcon} />
//         <Scene key="tab6" component={TabView} title="토" icon={TabIcon} />
//         <Scene key="tab7" component={TabView} title="일" icon={TabIcon} />
//     </Scene>
// </Scene>
//
// <Scene key="myTabBar" tabs={true} hideNavBar tabBarStyle={styles.tabBarStyle}>
//     <Scene key="tab11" component={TabView} title="월" icon={TabIcon} />
//     <Scene key="tab22" component={TabView} title="화" icon={TabIcon} />
//     <Scene key="tab33" component={TabView} title="수" icon={TabIcon} />
// </Scene>
