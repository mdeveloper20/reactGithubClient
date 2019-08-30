import React, {Component} from "react";
import {View} from "react-native";
import Dialog from "react-native-dialog";
import PropTypes from "prop-types";

export default class DialogAlert extends Component {


    render() {
        return (
            <View>

                <Dialog.Container visible={true}>
                    <Dialog.Title>Alert</Dialog.Title>
                    <Dialog.Description>
                        {this.props.message}
                    </Dialog.Description>
                    <Dialog.Button label="OK" onPress={this.props.onOkPress}/>
                </Dialog.Container>
            </View>
        );
    }
}

DialogAlert.propTypes = {
    message: PropTypes.string.isRequired,
    onOkPress: PropTypes.func.isRequired
};
