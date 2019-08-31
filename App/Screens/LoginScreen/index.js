import React, {Component} from "react";
import {View} from "react-native"
import {connect} from "react-redux";
import styles from "./style"
import {Image, Text} from 'react-native-elements';
import Images from "../../Themes/Images";
import EmailForm from "./components/EmailForm";
import PasswordForm from "./components/PasswordForm";
import DialogAlert from "../../Tools/DialogAlert";
import {saveUser} from "../../Redux/actions";
import {requestLoginFromApi} from "../../APIs";
import {Actions} from 'react-native-router-flux';
import LottieView from "lottie-react-native";

export class LoginScreen extends Component {
    state = {
        loginStep: 0, //consist of 0=> input email, 1=> input password, 2=> login process
        loginEmail: "",
        loginPassword: "",
        dialog: null
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <Image
                    source={Images.logo}
                    style={styles.logo}
                />


                {this.state.loginStep === 0 &&
                <EmailForm onEmailReceived={this.onEmailReceived}/>}

                {this.state.loginStep === 1 &&
                <PasswordForm onPasswordReceived={this.onPasswordReceived} onBackClick={this.onBackClick}/>}

                {this.state.loginStep === 2 && <>
                    <LottieView source={Images.loader} style={styles.loadingAnim} autoPlay loop/>

                    <Text>Connecting to Github servers...</Text>
                </>}
                {this.state.dialog}

            </View>
        )
    }


    onEmailReceived = async (email) => {
        //save valid email address into state
        this.setState({
            loginStep: 1, //go next page,
            loginEmail: email
        })
    }

    onPasswordReceived = async (password) => {
        //save password into state
        await this.setState({
            loginPassword: password
        })

        //do authentication
        await this.doLogin(this.state);
    }
    onBackClick = () => {
        this.setState({
            loginStep: 0
        })
    }

    onDialogOkPress = () => {
        this.setState({
            loginStep: 0,
            dialog: null
        })
    }

    async doLogin({loginEmail, loginPassword}) {

        try {

            this.setState({
                loginStep: 2
            });

            await requestLoginFromApi(
                loginEmail,
                loginPassword,
                this.onLoginFailed,
                this.onLoginSucceed
            );

        } catch (error) {
            console.log(error);
        }
    }

    onLoginFailed = () => {
        this.setState({
            dialog: <DialogAlert message="Authentication Failed! Please try again."
                                 onOkPress={this.onDialogOkPress}/>
        })
    }

    onLoginSucceed = async (json) => {
        await this.props.saveUser(json.login, this.state.loginEmail, this.state.loginPassword)
        Actions.reset('home');// send user to home page and prevent getting back to the login page
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        saveUser: (name, email, password) => {
            dispatch(saveUser(name, email, password))
        }
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(LoginScreen)
;
