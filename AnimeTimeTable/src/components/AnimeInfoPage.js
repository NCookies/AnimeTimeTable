import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    TouchableHighlight,
    Linking
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import Subtitle from './Subtitle';

import Icon from 'react-native-vector-icons/FontAwesome';
import FaceIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinkIcon from 'react-native-vector-icons/Entypo';

import parseDate from '../lib/parseDate';
import parseTime from '../lib/parseTime';


class AnimeInfoPage extends Component {

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
            isEmpty: false
        };
    }

    componentDidMount() {
        this.getSubtitle();
    }

    render() {
        let uri;
        let time;

        let startDate;
        let endDate;

        if (this.props.routes.scene.sceneKey === "animeInfoPage") {
            // FOUCS 액션이 실행되었을 때 체크
            uri = 'http://' + this.props.routes.scene.l;

            time  = parseTime(this.props.routes.scene.t)

            startDate = parseDate(this.props.routes.scene.sd);
            endDate   = parseDate(this.props.routes.scene.ed);
        }

        const empty = (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>
                    자막이 없습니다
                </Text>
            </View>
        )

        const subtitle = (
            <View>
                <ListView dataSource={this.state.dataSource}
                          renderRow={(rowData) =>
                                        <Subtitle info={rowData}
                                                  isFetching={this.state.isFetching }/>
                                    }
                />
            </View>
        )

        return (
            <ScrollView style={styles.container}>

                <TouchableHighlight
                    style={styles.mainTitle}
                    onPress={() => Linking.openURL(uri)}>
                    <Text style={styles.titleText}>
                        { this.props.routes.scene.s }
                    </Text>
                </TouchableHighlight>


                <View style={styles.rowInfo}>
                    <View style={styles.infoContainer}>
                        <Icon size={25} name="clock-o" />
                        <Text style={styles.animeInfo}>
                            { time }
                        </Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <FaceIcon size={25} name="tag-faces" />
                        <Text style={styles.animeInfo}>
                            { this.props.routes.scene.g }
                        </Text>
                    </View>
                </View>


                <View style={styles.rowInfo}>
                    <View style={styles.infoContainer}>
                        <Icon size={25} name="calendar-check-o" />
                        <Text style={styles.animeInfo}>
                            { startDate }
                        </Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <Icon size={25} name="calendar-times-o" />
                        <Text style={styles.animeInfo}>
                            { endDate }
                        </Text>
                    </View>
                </View>

                { this.state.isEmpty ? empty : subtitle }
            </ScrollView>
        )
    }

    getSubtitle() {
        let subtitleData;

        this.setState({
            isFetching: true
        })

        fetch('http://www.anissia.net/anitime/cap?i=' + this.props.routes.scene.i)
        .then((res) => res.json())
        .then((json) => {
            if (json.length <= 0) {
                this.setState({
                    isEmpty: true
                })
            }

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(json),
                isFetching: false
            })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        paddingTop: 50
    },

    mainTitle: {
        backgroundColor: '#3498DB',

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 200
    },

    title: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    titleText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 23,
        flex: 1
    },

    rowInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },

    animeInfo: {
        flex: 1,
        textAlign: 'center',
        fontSize: 15
    },

    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default connect(({routes}) => ({routes}))(AnimeInfoPage);
