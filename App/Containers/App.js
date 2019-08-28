import React, {Component} from 'react';
import Home from './HomeScreen'
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

                        <Stack hideNavBar={true}  key="root">

                            <Scene key="home" component={Home}/>
                        </Stack>
                    </ThemeProvider>

                </RouterWithRedux>
            </Provider>
        )
    }
}

