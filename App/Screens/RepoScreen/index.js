import React, {Component} from "react";
import {View} from "react-native"
import {connect} from "react-redux";
import styles from "./style"
import {Button, Image, Input, Text} from 'react-native-elements';
import Images from "../../Themes/Images";
import {logoutUser} from "../../Redux/actions";
import {Actions} from 'react-native-router-flux';
import LottieView from 'lottie-react-native';

class RepoScreen extends Component {


    state = {
        commits: null
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
                        {this.state.commits &&
                        <View style={styles.innerContainer}>
                            <Text style={styles.headText}>Commits</Text>
                        </View>}
                        {this.state.commits == null && <LottieView source={Images.loader} style={styles.loadingAnim} autoPlay loop />
                        }


                    </View>
                    <Button
                        containerStyle={styles.logoutButton}

                        title="Logout"
                        type="solid"
                        onPress={this.onLogoutClick}
                    />
                </View>


            </View>
        )
    }


    onLogoutClick = async () => {
        await this.props.logoutUser();
        Actions.reset('login');
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
(RepoScreen)
;
