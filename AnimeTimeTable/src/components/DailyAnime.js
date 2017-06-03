import React, { Component } from 'react';
import
{   View,
    Text,
    AsyncStorage,
    NetInfo,
    ListView
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import SampleInfo from './SampleInfo';
import Bookmark from './Bookmark'


export default class DailyAnime extends Component {

    constructor(props) {
        super(props);

        const ds =
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            isFetching: false
        };
    }


    async componentDidMount() {

        // 네트워크에 연결되어 있다면 서버로부터 데이터를 새로 받아와 갱신함
        if (await this.checkNetworkConnecting()) {
            await this.getAnimeFromApi();
        } else {    // 연결되어 있지 않다면 기존의 DB 데이터를 사용함

        }
    }

    render() {
        const loading = (
            <View>
                <Text>
                    Loading...
                </Text>
            </View>
        )

        const listView = (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <SampleInfo info={rowData}/>}
                />
            </View>
        )

        return (
            <View style>
                { this.state.isFetching ? loading : listView }
            </View>
        )
    }

    genRows(daily) {
        let dataBlob = [];
        let jsonData

        for (let i = 0; i < jsonData.length; i++) {
            dataBlob.push('Row ' + i + jsonData[i]["s"]);
        }

        return dataBlob;
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

    getAnimeFromApi() {
        let animeData;

        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday']

        this.setState({
            isFetching: true
        })

        fetch('http://www.anissia.net/anitime/list?w=' + this.props.dayOfWeek)
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(json),
                isFetching: false
            })
            AsyncStorage.setItem('@' + dayOfWeek[this.props.dayOfWeek] + 'Anime:key', json)
            console.log(this.state.dataSource);
        })
    }

    async checkNetworkConnecting() {
        return await NetInfo.isConnected.fetch();
    }
}
