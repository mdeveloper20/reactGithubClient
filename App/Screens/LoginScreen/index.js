import React, {Component} from "react";
import {View} from "react-native"
import {connect} from "react-redux";
import styles from "./style"
import {Image, Text} from 'react-native-elements';
import Images from "../../Themes/Images";
import EmailForm from "./components/EmailForm";
import PasswordForm from "./components/PasswordForm";

class LoginScreen extends Component {
    state = {
        loginStep: 0, //consist of 0=> input email, 1=> input password, 2=> login process
        loginEmail: "",
        loginPassword: ""
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
        this.setState({
            loginStep: 2, //go next page
            loginPassword: password
        })
    }
    onBackClick = () => {
        this.setState({
            loginStep: 0
        })
    }

}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(LoginScreen)
;
