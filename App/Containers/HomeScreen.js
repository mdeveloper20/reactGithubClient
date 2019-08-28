import React, {Component} from "react";
import {Text, View} from "react-native"
import {connect} from "react-redux";
import styles from "./Styles/HomeStyle"
import {Image} from 'react-native-elements';
import Images from "../Themes/Images";
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';


class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={Images.logo}
                    style={styles.logo}
                />
                <Text> Github Client V1</Text>
                <Input
                    inputContainerStyle={styles.input}
                    placeholder='Your github email here'
                />
                <Button
                    containerStyle={styles.fullWidthButtons}
                    title="Next"
                    type="solid"
                    onPress={()=>console.log('aaaa')}
                />
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
