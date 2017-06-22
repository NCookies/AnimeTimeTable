import React, { Component, PropTypes } from 'react';
import {
    View,
    Text ,
    StyleSheet,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome'

class SampleInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isBookmark: false
        }
    }

    componentDidMount() {
        console.log(this.props.bookmark)

        if (this.props.bookmark !== null ||
            typeof this.props.bookmark !== 'undefined') {    // 즐겨찾기가 되어 있으면 UI에 반영
            for (let index = 0; index < this.props.bookmark.length; index++) {
                if (this.props.bookmark[index]["i"] === this.props.info["i"]) {
                    this.setState({
                        ...this.state,
                        isBookmark: true
                    })
                }
            }
        }
    }

    render() {
        let info = this.props.info
        let time = info["t"].slice(0, 2) + "시 " + info["t"].slice(2, 4) + "분"
        let cancled = info["a"] ? '' : '[결방]';

        return (
            <View style={styles.listContainer}>

                <TouchableHighlight
                    style={styles.animeInfo}
                    onPress={() => Actions.animeInfoPage(this.props.info)}>

                    <View>
                        <Text style={styles.title}>{ cancled + info["s"] }</Text>
                        <Text style={styles.detail}>{ time + " | " + info["g"] }</Text>
                    </View>
                </TouchableHighlight>

                <View style={styles.bookmark}>
                    <Button>
                        <Icon size={25}
                            name={this.state.isBookmark ? "star" : "star-o"}
                            onPress={() => this.setBookmark(this.props.info)}
                        />
                    </Button>
                </View>

            </View>
        )
    }

    setBookmark(bookmarkObj) {
        let bookmarkList;

        if (!this.state.isBookmark) {   // 새로운 북마크 추가
            AsyncStorage.getItem('@BOOKMARK', (err, result) => {
                if (result !== null) {
                    bookmarkList = JSON.parse(result);
                    bookmarkList.push(bookmarkObj);

                    AsyncStorage.setItem('@BOOKMARK', JSON.stringify(bookmarkList), () => {
                        AsyncStorage.getItem('@BOOKMARK', (err, result) => {
                            console.log(result);
                        })
                    })
                }
            });
        } else {    // 북마크 제거
            AsyncStorage.getItem('@BOOKMARK', (err, result) => {
                if (result === null) return err;    // 아무것도 없으면 에러 반환

                bookmarkList = JSON.parse(result);
                for (let index = 0; index < bookmarkList.length; index++) {
                    console.log(bookmarkList[index].i);
                    console.log(bookmarkObj.i);
                    if (bookmarkList[index].i === bookmarkObj.i) {  // id 값 비교
                        bookmarkList.splice(index, 1);
                        break;
                    }
                }

                AsyncStorage.setItem('@BOOKMARK', JSON.stringify(bookmarkList), () => {
                    AsyncStorage.getItem('@BOOKMARK', (err, result) => {
                        console.log(result);
                    })
                })
            });
        }

        this.setState({
            isBookmark: !this.state.isBookmark
        })
    }
}
// AsyncStorage.mergeItem('BOOKMARK', JSON.stringify(bookmarkObj));

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: '#BDC3C7'
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
