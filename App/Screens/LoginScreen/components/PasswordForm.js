import styles from "../style";
import {Button, Input} from "react-native-elements";
import {isPasswordValid} from "../../../Tools/validators";
import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class PasswordForm extends Component {
    state = {
        password: {
            error: " ",//one space has used to disable the button for the first time
            value: ""//to store password address
        }

    };

    render() {
        return (

            <>
                <Input
                    containerStyle={styles.input}
                    placeholder='Your Github password'
                    errorMessage={this.state.password.error}
                    onChangeText={this.onPasswordChange}
                    textContentType="password"
                    secureTextEntry
                />

                <Button
                    containerStyle={styles.fullWidthButtons}
                    title="Login"
                    type="solid"
                    onPress={this.onNextClick}
                    disabled={this.state.password.error !== ""}
                />

                <Button
                    containerStyle={styles.fullWidthButtons}
                    title="Back"
                    type="outline"
                    onPress={this.onBackClick}
                />
            </>
        )
    }

    onPasswordChange = (password) => {
        //validate email address and then enable next button
        if (isPasswordValid(password, 4, 20)) {
            this.setState({password: {error: "", value: password}})
        } else {
            this.setState({password: {error: "Password length must be between 4 to 20 characters", value: ""}})
        }
    }

    onNextClick = () => {
        //send email address to parent
        //email is valid here!
        this.props.onPasswordReceived(this.state.password.value);
    }

    onBackClick = () => {
        //send email address to parent
        //email is valid here!
        this.props.onBackClick();
    }

}

PasswordForm.propTypes = {
    onPasswordReceived: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired,
};

