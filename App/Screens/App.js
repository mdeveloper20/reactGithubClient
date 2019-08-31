import React, {Component} from 'react';
import LoginScreen from './LoginScreen'
import SplashScreen from './SplashScreen'
import HomeScreen from './HomeScreen'
import RepoScreen from './RepoScreen'
import {Router, Scene, Stack} from "react-native-router-flux";
import {connect, Provider} from "react-redux";
import store from "../Redux/store";
import {ThemeProvider} from "react-native-elements";

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
export default class App extends Component {

    render() {
        const RouterWithRedux = connect()(Router);

        return (
            <Provider store={store}>
                <RouterWithRedux>
                    <ThemeProvider >
                        <Scene hideNavBar={true}  key="home" component={RepoScreen} />

                        <Scene hideNavBar={true} key="splash" component={SplashScreen} initial/>
                        <Scene hideNavBar={true} key="login" component={LoginScreen} />

                    </ThemeProvider>

                </RouterWithRedux>
            </Provider>
        )
    }
}

