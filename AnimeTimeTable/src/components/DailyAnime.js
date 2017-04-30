import React, { Component } from 'react';
import
{   View,
    Text,
    AsyncStorage,
    NetInfo }
    from 'react-native';
import { Actions } from 'react-native-router-flux';

import SampleInfo from './SampleInfo';
import Bookmark from './Bookmark'


export default class DailyAnime extends Component {

    async getMoviesFromApi(weekday) {
        let animeData;

        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday']


        try {   // 요일별로 애니 정보를 가져옴
            let response = await fetch('http://www.anissia.net/anitime/list?w='
                                        + weekday);

            let animeData = await response.json();
            await AsyncStorage.setItem('@' + dayOfWeek[weekday] + 'Anime:key', animeData);
            // DB에 데이터 저장

            return animeData;

        } catch(error) {
            console.error(error);
        }
    }

    async componentDidMount() {

        // 네트워크 연결 확인
        // NetInfo.isConnected.fetch().then(isConnected => {
        //     console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        // });
        // function handleFirstConnectivityChange(isConnected) {
        //     console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
        //     NetInfo.isConnected.removeEventListener(
        //         'change',
        //         handleFirstConnectivityChange
        //     );
        // }
        // NetInfo.isConnected.addEventListener(
        //     'change',
        //     handleFirstConnectivityChange
        // );

        // 0 ~ 6 : 일요일 ~ 토요일
        for (let i = 0; i < 7; i++) {
            await this.getMoviesFromApi(i);
            // 변수를 어떤 방식으로 저장해야될지 모르겠음
        }


        // try {
        //     const animeData = await AsyncStorage.getItem('@sundayAnime:key');
        //     if (animeData !== null) {
        //         console.log('data : ', animeData);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    render() {
        return (
            <View style={{margin: 128}}>
                <SampleInfo />
                <Bookmark />
            </View>
        )
    }
}
