import React, { Component, PropTypes } from 'react';
import {
    View,
    Text ,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Entypo'

class SampleInfo extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        let info = this.props.info
        let time = info["t"].slice(0, 2) + "시 " + info["t"].slice(2, 4) + "분"

        return (
            <View style={styles.listContainer}>

                <TouchableHighlight
                    style={styles.animeInfo}
                    onPress={() => Actions.animeInfoPage(this.props.info)}>

                    <View>
                        <Text style={styles.title}>{ info["s"] }</Text>
                        <Text style={styles.detail}>{ time + " | " + info["g"] }</Text>
                    </View>
                </TouchableHighlight>

                <View style={styles.bookmark}>
                    <Button>
                        <Icon size={25}
                            name="star-outlined"
                            onPress={() => Actions.addBookmark(this.props.info)} />
                    </Button>
                </View>

            </View>
        )
    }
}

//  onPress={Actions.bookmarkPage}

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

export default connect(({routes}) => ({routes}))(SampleInfo);
