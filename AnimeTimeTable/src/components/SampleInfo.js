import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from 'react-native-button';

export default class SampleInfo extends Component {
    render() {
        return (
            <View>
                <Button onPress={Actions.animeInfoPage}>상세정보</Button>
                <Button onPress={Actions.bookmarkPage}>즐겨찾기</Button>
            </View>
        )
    }
}
