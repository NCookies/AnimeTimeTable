import React, { Component } from 'react';
import {
    View,
    Text,
    Linking
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'apsl-react-native-button';

import parseDate from '../lib/parseDate';


export default class Subtitle extends Component {

    render() {

        let info = this.props.info;
        let tmp;
        let times;

        if ( !isNaN(info["s"]) ) {
            tmp = parseInt(info["s"]).toString();

            if (info["s"][4] !== "0") {
                //  애니메이션의 화수가 4.5화 등일 때
                times = tmp.slice(0, tmp.length - 1) + '.'
                + tmp[tmp.length - 1] + '화';

            } else {
                times = tmp.slice(0, tmp.length - 1) + "화"
            }
        } else {
            // 자막의 화수가 문자열로 되어있을 때(BD, EX, PIC, OVA, OAD 등)
            tiems = info["s"]
        }
        
        return (
            <View>
                <Button isLoading={this.props.isFetching}
                        onPress={() => Linking.openURL('http://' + info["a"]) } >
                        <Text>{ times }</Text>
                        <View>
                            <Text>{ info["n"] }</Text>
                            <Text>{ parseDate(info["d"]) }</Text>
                        </View>
                </Button>
            </View>
        )
    }


}
