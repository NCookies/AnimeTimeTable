import React, { Component } from 'react';
import
{   View,
    Text,
    StyleSheet,
    TouchableHighlight,
    AsyncStorage,
    NetInfo,
    ListView
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import Button from 'apsl-react-native-button'

import SampleInfo from './SampleInfo';


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

        console.log('constructor')
    }

    componentDidMount() {
        this.getBookmarks();

        AsyncStorage.getItem('@BOOKMARK', (err, result) => {
            if (result === null) {
                AsyncStorage.setItem('@BOOKMARK', JSON.stringify([]));
            } else {
                console.log(result);
            }
        });

        console.log('componentDidMount')

        // 네트워크에 연결되어 있다면 서버로부터 데이터를 새로 받아와 갱신함
        // if (await this.checkNetworkConnecting()) {
            this.getAnimeFromApi();
        // } else {    // 연결되어 있지 않다면 기존의 DB 데이터를 사용함

        // }
    }

    render() {
        console.log('render');
        // 북마크 페이지에서 즐겨찾기를 해제하면 변경 사항이 반영되지 않음

        const loading = (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>
                    로딩 중...
                </Text>
            </View>
        )
        // 북마크 영역은 모바일 헤드처럼 꾸미면 될 듯
        const listView = (
            <View>
                <View style={styles.bookmarkPageButtonContainer}>
                    <Button onPress={Actions.bookmarkPage} title="bookmark" style={styles.bookmarkPageButton}>
                        <Text style={styles.buttonText}>북마크</Text>
                    </Button>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                                  <SampleInfo info={rowData} />
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

    // async getAnimeFromDB() {
    //     try {
    //         const animeData = await AsyncStorage.getItem('@'
    //         + dayOfWeek[weekday]
    //         + 'Anime:key');
    //
    //         if (animeData !== null) {
    //             return animeData
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

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
    },

    bookmarkPageButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 50
    },

    bookmarkPageButton: {
        backgroundColor: '#2ECC71',
        width: 100,
        borderWidth: 0,

        flex: 1,
        margin: 5
    },

    buttonText: {
        color: 'white',
        fontSize: 20
    }
})

export default connect(({routes}) => ({routes}))(DailyAnime);
