import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import SampleInfo from './SampleInfo';
import Bookmark from './Bookmark'

export default class DailyAnime extends Component {
    render() {
        return (
            <View style={{margin: 128}}>
                <SampleInfo />
                <Bookmark />
            </View>
        )
    }
}
