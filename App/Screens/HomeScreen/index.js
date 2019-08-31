import React, {Component} from "react";
import {View} from "react-native"
import {connect} from "react-redux";
import styles from "./style"
import {Button, Image, Input, Text} from 'react-native-elements';
import Images from "../../Themes/Images";
import {logoutUser} from "../../Redux/actions";
import {Actions} from 'react-native-router-flux';
import DialogAlert from "../../Tools/DialogAlert";

export class HomeScreen extends Component {

    state = {
        repo: "facebook/react-native",
        dialog: null

    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <Image
                    source={Images.fullBack}
                    style={styles.fullBack}
                />

                <View style={styles.middleContainer}>

                    <View style={styles.innerContainer}>
                        <Text style={styles.headText}>Repositories</Text>

                        <Text style={styles.textLabel}>Repository name:</Text>
                        <Input
                            containerStyle={styles.fullInput}
                            placeholder='Your Github email address'
                            onChangeText={this.onRepoChange}
                            textContentType="username"
                            value={this.state.repo}
                        />

                        <Button
                            containerStyle={styles.fullWidthButtons}
                            buttonStyle={styles.searchButtonStyle}
                            title="Submit"
                            type="solid"
                            onPress={this.onSubmitClick}
                        />
                    </View>
                    <Button
                        containerStyle={styles.logoutButton}

                        title="Logout"
                        type="solid"
                        onPress={this.onLogoutClick}
                    />
                </View>

                {this.state.dialog}

            </View>
        )
    }

    onSubmitClick = () => {
        if(this.state.repo){
            Actions.repo({selectedRepo:this.state.repo});

        }else{
            this.setState({
                dialog: <DialogAlert message="Please enter repository name!"
                                     onOkPress={this.onDialogOkPress}/>
            })
        }
    }

    onRepoChange = (repo) => {
        this.setState({repo})
    }

    onLogoutClick = async () => {
        await this.props.logoutUser();
        Actions.reset('login');
    }

    onDialogOkPress = () => {
        this.setState({
            dialog: null
        })
    }

}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => {
            dispatch(logoutUser());
        }
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(HomeScreen)
;
