import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import Button from 'react-native-button';

import SampleInfo from './SampleInfo';


class BookmarkPage extends Component {

    static propTypes = {
        routes: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            bookmark: {}
        };
    }

    componentDidMount() {
        this.getBookmarks();
        // this.setState({
        //     ...this.state,
        //     dataSource: this.state.dataSource.cloneWithRows(this.props.routes.scene.data)
        // })
    }

    render() {
        console.log(this.state.bookmark)

        return (
            <View>
                <View style={{'height': 55}}></View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                                    <SampleInfo info={rowData} />
                            }
                />
            </View>
        )
    }

    getBookmarks() {
        AsyncStorage.getItem('@BOOKMARK', (err, result) => {
            this.setState({
                ...this.state,
                dataSource: this.state.dataSource.cloneWithRows(JSON.parse(result)),
                bookmark: JSON.parse(result)
            })
        });
    }
}

export default connect(({routes}) => ({routes}))(BookmarkPage);
