import {View} from "react-native";
import styles from "../style";
import {Button, Input} from "react-native-elements";
import {isEmailValid} from "../../../Tools/validators";
import React,{Component} from "react";
import PropTypes from 'prop-types';

export default class EmailForm extends Component {
    state = {
        email: {
            error: " ",//one space has used to disable the button for the first time
            value: ""//to store email address
        }

    };

    render() {
        return (

            <>
                <Input
                    containerStyle={styles.input}
                    placeholder='Your Github email address'
                    errorMessage={this.state.email.error}
                    onChangeText={this.onEmailChange}
                />

                <Button
                    containerStyle={styles.fullWidthButtons}
                    title="Next"
                    type="solid"
                    onPress={this.onNextClick}
                    disabled={this.state.email.error !== ""}
                />
            </>
        )
    }

    onEmailChange = (email) => {
        //validate email address and then enable next button
        if (isEmailValid(email)) {
            this.setState({email: {error: "", value: email}})
        } else {
            this.setState({email: {error: "Enter a valid email address!", value: ""}})
        }
    }
    onNextClick = () => {
        //send email address to parent
        //email is valid here!
        this.props.onEmailReceived(this.state.email.value);
    }


}

EmailForm.propTypes = {
    onEmailReceived: PropTypes.func.isRequired
};

