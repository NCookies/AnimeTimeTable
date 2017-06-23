import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    Linking
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import Subtitle from './Subtitle';

import Icon from 'react-native-vector-icons/FontAwesome';
import FaceIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class AnimeInfoPage extends Component {

    static propTypes = {
        routes: PropTypes.object
    };

    render() {
        let uri;
        let time;

        let startDate;
        let endDate;

        if (this.props.routes.scene.sceneKey === "animeInfoPage") {
            // FOUCS 액션이 실행되었을 때 체크
            uri = 'http://' + this.props.routes.scene.l;
            time  = this.props.routes.scene.t.slice(0, 2) + "시 "
            + this.props.routes.scene.t.slice(2, 4) + "분"

            startDate = this.props.routes.scene.sd.slice(0, 4) + "년 "
            + this.props.routes.scene.sd.slice(4, 6) + "월 "
            + this.props.routes.scene.sd.slice(6, 8) + "일";

            endDate   = this.props.routes.scene.ed.slice(0, 4) + "년 "
            + this.props.routes.scene.ed.slice(4, 6) + "월 "
            + this.props.routes.scene.ed.slice(6, 8) + "일";
        }

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

            </ScrollView>
        )
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
