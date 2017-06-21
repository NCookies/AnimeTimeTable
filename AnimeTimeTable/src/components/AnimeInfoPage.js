import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import DetailInfo from './DetailInfo';
import Subtitle from './Subtitle';

class AnimeInfoPage extends Component {

    static propTypes = {
        routes: PropTypes.object
    };

    render() {
        console.log(JSON.stringify(this.props.routes))
        return (
            <View style={{margin: 128}}>
                <DetailInfo />
                <Subtitle />
            </View>
        )
    }
}

export default connect(({routes}) => ({routes}))(AnimeInfoPage);
