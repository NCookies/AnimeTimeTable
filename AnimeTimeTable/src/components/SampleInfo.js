import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from 'react-native-button';

export default class SampleInfo extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        let info = this.props.info
        let time = info["t"].slice(0, 2) + "시 " + info["t"].slice(2, 4) + "분"

        return (
            <View>
                <Text>{ info["s"] }</Text>
                <Text>{ time + " | " + info["g"] }</Text>

                <Button onPress={Actions.bookmarkPage}>북마크</Button>
            </View>
        )
    }
}
