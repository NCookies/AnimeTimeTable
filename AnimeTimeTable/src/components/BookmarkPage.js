import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    ListView
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

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
            })
        };
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            dataSource: this.state.dataSource.cloneWithRows(this.props.routes.scene.data)
        })
    }

    render() {
        // console.log(typeof this.props.routes.scene.data)

        console.log(this.state.dataSource)
        return (
            <View>
                <View style={{'height': 60}}></View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                                    <SampleInfo info={rowData}
                                                bookmark={this.props.routes.scene.data}
                                    />
                            }
                />
            </View>
        )
    }
}

export default connect(({routes}) => ({routes}))(BookmarkPage);
