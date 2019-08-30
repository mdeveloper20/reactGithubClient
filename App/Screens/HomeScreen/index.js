import React, {Component} from "react";
import {View} from "react-native"
import {connect} from "react-redux";
import styles from "./style"
import {Button, Image, Input, Text} from 'react-native-elements';
import Images from "../../Themes/Images";

class HomeScreen extends Component {

    state = {
        repo: "facebook/react-native"
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
                        onPress={this.onSubmitClick}
                    />
                </View>



            </View>
        )
    }

    onSubmitClick = () => {
        console.log()
    }

    onRepoChange = (repo) => {
        this.setState({repo})
    }


}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(HomeScreen)
;
