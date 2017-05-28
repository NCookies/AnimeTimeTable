import React, { Component } from 'react';
import
{   View,
    Text,
    AsyncStorage,
    NetInfo,
    ListView }
    from 'react-native';
import { Actions } from 'react-native-router-flux';

import SampleInfo from './SampleInfo';
import Bookmark from './Bookmark'


export default class DailyAnime extends Component {

    constructor(props) {
        super(props);

        let source = [];

        console.log(this.props.daily)

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.genRows(this.props.daily)),
        };
    }

    genRows(daily) {
        let dataBlob = [];
        let jsonData

        try {
            jsonData = JSON.parse(daily);
        } catch(err) {
            console.log(err);
            return;
        }

        for (let i = 0; i < jsonData.length; i++) {
            dataBlob.push('Row ' + i + jsonData[i]["s"]);
        }

        console.log(dataBlob)
        return dataBlob;
    }
    render() {
        console.log(this.props.daily[0])

        return (
            <View style={{margin: 128}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <SampleInfo info={rowData}/>}
                />

                <Text>{JSON.stringify(this.props.daily)}</Text>
            </View>
        )
    }
}
