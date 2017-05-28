import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from 'react-native-button';

export default class SampleInfo extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        // let info = JSON.parse(this.props.info);
        // let list = info.map((data, index) => {
        //     return (
        //         <Button onPress={Actions.animeInfoPage}>
        //             <Text>{data["s"]}</Text>
        //             <Text>{data["g"]}</Text>
        //         </Button>
        //     )
        // })
        // console.log(this.props.info[0]);

        return (
            <View>
                <Text>{this.props.info}</Text>

                <Button onPress={Actions.bookmarkPage}>d</Button>
            </View>
        )
    }
}
