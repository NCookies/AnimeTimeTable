import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import PageOne from './components/PageOne';
import PageTwo from './components/PageTwo';

import TabView from './components/TabView';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="pageOne" component={PageOne} title="PageOne" initial={true} />
                    <Scene key="pageTwo" component={PageTwo} title="PageTwo" />

                    <Scene key="tab3" component={TabView} title="Tab #1" hideTabBar />
                    <Scene key="tab3" component={TabView} title="Tab #2" hideTabBar />
                    <Scene key="tab3" component={TabView} title="Tab #3" hideTabBar />
                    <Scene key="tab4" component={TabView} title="Tab #4" hideNavBar />
                    <Scene key="tab5" component={TabView} title="Tab #5" hideTabBar />
                </Scene>
            </Router>
        )
    }
}
    
