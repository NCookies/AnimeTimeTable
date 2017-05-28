import React, { Component } from 'react';
import
{
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    NetInfo
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import CustomTabBar from './CustomTabBar';
import DailyAnime from './DailyAnime';

export default class MainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            daily: []
        }

        aa = []
    }

    async getAnimeFromDB() {
        try {
            const animeData = await AsyncStorage.getItem('@'
                                                        + dayOfWeek[weekday]
                                                        + 'Anime:key');

            if (animeData !== null) {
                return animeData
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getAnimeFromApi(weekday) {
        let animeData;

        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday']


        try {   // 요일별로 애니 정보를 가져옴
            let response = await fetch('http://www.anissia.net/anitime/list?w=' + weekday);
            let animeData = await response.json();

            // DB에 데이터 저장
            await AsyncStorage.setItem('@' + dayOfWeek[weekday] + 'Anime:key',
            JSON.stringify(animeData));

            return animeData;

        } catch(error) {
            console.error(error);
        }
    }

    async getAnimeData() {

        let animeData;
        let dailyData = [];

        // 0 ~ 6 : 일요일 ~ 토요일
        for (let weekDay = 0; weekDay < 7; weekDay++) {
            animeData = await this.getAnimeFromApi(weekDay);

            dailyData = [
                ...dailyData,
                animeData
            ]

        }

        this.setState({
            daily: dailyData
        })
        // console.log(dailyData.length)
    }

    async checkNetworkConnecting() {
        return await NetInfo.isConnected.fetch();
    }

    async componentDidMount() {

        // 네트워크에 연결되어 있다면 서버로부터 데이터를 새로 받아와 갱신함
        if (await this.checkNetworkConnecting()) {
            await this.getAnimeData();
        } else {
            // 연결되어 있지 않다면 기존의 DB 데이터를 사용함
        }
    }

    render() {

        if (this.state.daily <= 0) return (
            <ScrollableTabView>
                <DailyAnime tabLabel="월" daily={{}}/>
                <DailyAnime tabLabel="화" daily={{}}/>
                <DailyAnime tabLabel="수" daily={{}}/>
                <DailyAnime tabLabel="목" daily={{}}/>
                <DailyAnime tabLabel="금" daily={{}}/>
                <DailyAnime tabLabel="토" daily={{}}/>
                <DailyAnime tabLabel="일" daily={{}}/>
            </ScrollableTabView>
        )

        return (
            <ScrollableTabView>
                <DailyAnime tabLabel="월" daily={this.state.daily[0]}/>
                <DailyAnime tabLabel="화" daily={this.state.daily[1]}/>
                <DailyAnime tabLabel="수" daily={this.state.daily[2]}/>
                <DailyAnime tabLabel="목" daily={this.state.daily[3]}/>
                <DailyAnime tabLabel="금" daily={this.state.daily[4]}/>
                <DailyAnime tabLabel="토" daily={this.state.daily[5]}/>
                <DailyAnime tabLabel="일" daily={this.state.daily[6]}/>
            </ScrollableTabView>
        )
    }
}
