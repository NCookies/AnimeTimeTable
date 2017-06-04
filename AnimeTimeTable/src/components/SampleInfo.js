import React, { Component } from 'react';
import {
    View,
    Text ,
    StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Entypo'

export default class SampleInfo extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        let info = this.props.info
        let time = info["t"].slice(0, 2) + "시 " + info["t"].slice(2, 4) + "분"

        return (
            <View style={styles.listContainer}>

                <View style={styles.animeInfo}>
                    <Text style={styles.title}>{ info["s"] }</Text>
                    <Text style={styles.detail}>{ time + " | " + info["g"] }</Text>
                </View>

                <View style={styles.bookmark}>
                    <Button onPress={Actions.bookmarkPage}>
                        <Icon size={25} name="star-outlined" />
                    </Button>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        padding: 10
    },

    animeInfo: {
        flex: 3,
        flexDirection: 'column'
    },

    title: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        fontWeight: 'bold',
        fontSize: 17
    },

    detail: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },

    bookmark: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
