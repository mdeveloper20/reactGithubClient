import React, {Component} from "react";
import {View} from "react-native"
import {connect} from "react-redux";
import styles from "./style"
import {Image, Text} from 'react-native-elements';
import Images from "../../Themes/Images";
import EmailForm from "./components/EmailForm";
import PasswordForm from "./components/PasswordForm";
import base64 from "react-native-base64";
import {ROOT_URL} from "../../Config/apis";
import DialogAlert from "../../Tools/DialogAlert";
import {saveUser} from "../../Redux/actions";

class LoginScreen extends Component {
    state = {
        loginStep: 0, //consist of 0=> input email, 1=> input password, 2=> login process
        loginEmail: "",
        loginPassword: "",
        dialog: null
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={Images.logo}
                    style={styles.logo}
                />


                {this.state.loginStep === 0 &&
                <EmailForm onEmailReceived={this.onEmailReceived}/>}

                {this.state.loginStep === 1 &&
                <PasswordForm onPasswordReceived={this.onPasswordReceived} onBackClick={this.onBackClick}/>}

                {this.state.loginStep === 2 &&
                <Text>Connecting to Github servers...</Text>}
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
        await this.requrestLoginFromApi(this.state);
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

    async requrestLoginFromApi({loginEmail, loginPassword}) {

        try {

            this.setState({
                loginStep: 2
            });
            const authString = base64.encode(loginEmail + ":" + loginPassword);
            let response = await fetch(`${ROOT_URL}user`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + authString
                }
            });

            console.log(loginEmail)
            console.log(loginPassword)

            console.log(response)
            if (response.status === 200) {
                // login successful

                let json = await response.json();
                await this.props.saveUser({name: json.login, email: loginEmail, password: loginPassword})


                //await this.props.setUser(json);
                //Actions.replace('root');
            } else {
                // login failed

                this.setState({
                    dialog: <DialogAlert message="Authentication Failed! Please try again."
                                         onOkPress={this.onDialogOkPress}/>
                })

            }
        } catch (error) {
            console.log(error);
        }
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
