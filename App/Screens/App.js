import React, {Component} from 'react';
import LoginScreen from './LoginScreen'
import SplashScreen from './SplashScreen'
import HomeScreen from './HomeScreen'
import RepoScreen from './RepoScreen'

import {Router, Scene} from "react-native-router-flux";
import {connect, Provider} from "react-redux";
import store from "../Redux/store";
import {ThemeProvider} from "react-native-elements";
import codePush from "react-native-code-push";
import firebase from 'react-native-firebase';

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {

    componentDidMount() {
        codePush.sync({
            installMode: codePush.InstallMode.IMMEDIATE
        })
        this.checkPermission();
        this.createNotificationListeners(); 


    }

    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
    }

    
async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }
  
  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
  

    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
      }

    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
      }

    render() {
        const RouterWithRedux = connect()(Router);

        return (
            <Provider store={store}>
                <RouterWithRedux>
                    <ThemeProvider >
                        <Scene hideNavBar={true}  key="home" component={HomeScreen} />
                        <Scene hideNavBar={true}  key="repo" component={RepoScreen} />

                        <Scene hideNavBar={true} key="splash" component={SplashScreen} initial/>
                        <Scene hideNavBar={true} key="login" component={LoginScreen} />

                    </ThemeProvider>

                </RouterWithRedux>
            </Provider>
        )
    }
}

let codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
    installMode:codePush.InstallMode.IMMEDIATE
}

export default App= codePush(codePushOptions)(App)