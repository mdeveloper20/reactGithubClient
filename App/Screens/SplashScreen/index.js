import React, {Component} from "react";
import {View} from "react-native"
import {connect} from "react-redux";
import styles from "./style"
import {Image, Text} from 'react-native-elements';
import Images from "../../Themes/Images";
import DialogAlert from "../../Tools/DialogAlert";
import {requrestLoginFromApi} from "../../APIs/loginRequest";
import {Actions} from 'react-native-router-flux';
import LottieView from "lottie-react-native";

class SplashScreen extends Component {


    async checkUser() {


        if (this.props.user.email && this.props.user.password) {
            try {
                console.log('check the user!')
                await requrestLoginFromApi(this.props.user.email, this.props.user.password, this.onLoginFailed, this.onLoginSucceed);


            } catch (error) {
                console.log(error);
            }
        } else {

            setTimeout(() => Actions.reset('login'), 2000)//make a delay to show splash screen
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.rehydrated !== prevProps.rehydrated) {
            this.checkUser();
        }
    }


    render() {

        return (
            <View style={styles.mainContainer}>
                <Image
                    source={Images.logo}
                    style={styles.logo}
                />

                <LottieView source={Images.loader} style={styles.loadingAnim} autoPlay loop/>

                <Text>Loading...</Text>

            </View>
        )
    }


    onDialogOkPress = () => {
        Actions.reset('login');
    };


    onLoginFailed = () => {
        this.setState({
            dialog: <DialogAlert message="Authentication Failed! Please try again."
                                 onOkPress={this.onDialogOkPress}/>
        })
    };


    onLoginSucceed = async (json) => {
        //go to home page
        Actions.reset('home');

    }

}

function mapStateToProps(state) {
    return {
        user: state.user,
        rehydrated: state.rehydrated,

    };
}

function mapDispatchToProps(dispatch) {
    return {};
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(SplashScreen)
;
