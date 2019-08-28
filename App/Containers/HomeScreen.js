import React,{Component} from "react";
import {Text,View} from "react-native"
import {connect} from "react-redux";
import styles from "./Styles/HomeStyle"
class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Home Page!</Text>

            </View>
        )
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
(HomeScreen)
;
