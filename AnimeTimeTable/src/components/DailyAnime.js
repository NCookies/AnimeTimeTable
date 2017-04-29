import React, { Component } from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';

import SampleInfo from './SampleInfo';
import Bookmark from './Bookmark'



export default class DailyAnime extends Component {

    async getMoviesFromApi() {
        try {
            let response = await fetch('http://www.anissia.net/anitime/list?w=0');



        } catch(error) {
            console.error(error);
        }
    }

    componentDidMount() {
        // this.getMoviesFromApi()
        // .then((data) => { ToastAndroid.show(JSON.stringify(data), ToastAndroid.SHORT) })

        let data = this.getMoviesFromApi();
        // ToastAndroid.show(JSON.stringify(data), ToastAndroid.SHORT);
        console.log(data);
    }

    render() {
        return (
            <View style={{margin: 128}}>
                <SampleInfo />
                <Bookmark />
            </View>
        )
    }
}
