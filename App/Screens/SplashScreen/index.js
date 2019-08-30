import React, {Component} from "react";
import {View} from "react-native"
import {connect} from "react-redux";
import styles from "./style"
import {Image, Text} from 'react-native-elements';
import Images from "../../Themes/Images";
import DialogAlert from "../../Tools/DialogAlert";
import {requrestLoginFromApi} from "../../APIs/loginRequest";
import {Actions} from 'react-native-router-flux';

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

            Actions.login();
        }
    }

    render() {
        if(this.props.rehydrated){
            this.checkUser();
        }
        return (
            <View style={styles.mainContainer}>
                <Image
                    source={Images.logo}
                    style={styles.logo}
                />

                <Text>Loading...</Text>

            </View>
        )
    }


    onDialogOkPress = () => {
        Actions.login();
    };


    onLoginFailed = () => {
        this.setState({
            dialog: <DialogAlert message="Authentication Failed! Please try again."
                                 onOkPress={this.onDialogOkPress}/>
        })
    };


    onLoginSucceed = async (json) => {
        //go to home page
        Actions.replace('root');

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
