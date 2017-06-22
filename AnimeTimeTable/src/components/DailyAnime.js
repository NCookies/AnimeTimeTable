import React, { Component, PropTypes } from 'react';
import
{   View,
    Text,
    StyleSheet,
    AsyncStorage,
    NetInfo,
    ListView
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import SampleInfo from './SampleInfo';
import Bookmark from './Bookmark'


class DailyAnime extends Component {

    static propTypes = {
        routes: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            isFetching: false,
            bookmark: {}
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('@BOOKMARK', (err, result) => {
            if (result === null) {
                AsyncStorage.setItem('@BOOKMARK', JSON.stringify([]));
            } else {
                console.log(result);
            }
        });
        // AsyncStorage.removeItem('@BOOKMARK');

        this.getBookmarks();
        // 네트워크에 연결되어 있다면 서버로부터 데이터를 새로 받아와 갱신함
        // if (await this.checkNetworkConnecting()) {
            this.getAnimeFromApi();
        // } else {    // 연결되어 있지 않다면 기존의 DB 데이터를 사용함

        // }
    }

    render() {
        const loading = (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>
                    로딩 중...
                </Text>
            </View>
        )

        const listView = (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                                    <SampleInfo info={rowData}
                                                bookmark={ this.state.bookmark }
                                    />
                            }
                />
            </View>
        )

        return (
            <View>
                { this.state.isFetching ? loading : listView }
            </View>
        )
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
            // console.log(this.state.dataSource);
        })
    }

    async checkNetworkConnecting() {
        return await NetInfo.isConnected.fetch();
    }

    getBookmarks() {
        AsyncStorage.getItem('@BOOKMARK', (err, result) => {
            this.setState({
                ...this.state,
                bookmark: JSON.parse(result)
            })
        });
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },

    loadingText: {
        textAlign: 'center',
        fontSize: 30,
        color: 'black'
    }
})

export default connect(({routes}) => ({routes}))(DailyAnime);
