import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from 'react-native-button';

export default class BookmarkPage extends Component {
    render() {
        return (
            <View style={{margin: 128}}>
                <Button onPress={Actions.animeInfoPage}>상세정보</Button>
            </View>
        )
    }
}
