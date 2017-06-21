import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    WebView,
    Linking
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Subtitle from './Subtitle';

class AnimeInfoPage extends Component {

    static propTypes = {
        routes: PropTypes.object
    };

    render() {
        const uri = 'http://' + this.props.routes.scene.l
        return (
            <View style={{margin: 128}}>
                <TouchableHighlight
                    onPress={() => Linking.openURL(uri)}>
                    <Text>공식회사 사이트</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

export default connect(({routes}) => ({routes}))(AnimeInfoPage);
