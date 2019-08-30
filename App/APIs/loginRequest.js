import base64 from "react-native-base64";
import {ROOT_URL} from "../Config/apis";

export async function requrestLoginFromApi(loginEmail, loginPassword, onLoginFailed, onLoginSucceed) {


    const authString = base64.encode(loginEmail + ":" + loginPassword);
    let response = await fetch(`${ROOT_URL}user`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + authString
        }
    });

    if (response.status === 200) {
        // login successful

        let json = await response.json();
        onLoginSucceed(json)


        //await this.props.setUser(json);
        //Actions.replace('root');
    } else {
        // login failed
        onLoginFailed()


    }

}