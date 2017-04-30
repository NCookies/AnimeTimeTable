import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

import SampleInfo from './SampleInfo';
import Bookmark from './Bookmark'


export default class DailyAnime extends Component {

    async getMoviesFromApi() {
        let animeData;

        try {
            let response = await fetch('http://www.anissia.net/anitime/list?w=0');
            let animeData = await response.json();

            return animeData;
        } catch(error) {
            console.error(error);
        }
    }

    async componentDidMount() {
        var animeData = await this.getMoviesFromApi();
        console.log(animeData);

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
