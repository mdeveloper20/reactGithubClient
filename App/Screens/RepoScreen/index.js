import React, {Component} from "react";
import {View, FlatList} from "react-native"
import {connect} from "react-redux";
import styles from "./style"
import {Button, Image, Text} from 'react-native-elements';
import Images from "../../Themes/Images";
import {logoutUser} from "../../Redux/actions";
import {Actions} from 'react-native-router-flux';
import LottieView from 'lottie-react-native';
import PropTypes from "prop-types";
import {getCommits} from "../../APIs";
import Svg from "react-native-svg";
import Line from "react-native-svg/elements/Line";
import moment from "moment";

// TODO: pagination (fetch commits per page) is not implemented yet!
// for implementing pagination:
// 1- We should define onEndReached property of FlatList object like this:
// async onEndReached(info) {
//         if (this.state.currentPage < this.props.maxPage) {
//             await this.setState({
//                 loading: true,
//                 currentPage: this.state.currentPage + 1
//             });
//             await this.getCommits();//we should pass current page to this function and send it to server
//         }
//     }



class RepoScreen extends Component {


    state = {
        commits: null,
        error: false,
        loading: true//getting commits from server will run immediately after component loaded
    }

    async componentDidMount() {
        const repo = this.props.selectedRepo;
        await getCommits(this.props.user.email, this.props.user.password, repo, this.onRepoFetchSuccess, this.onRepoFetchFail);
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
                        <Text style={styles.headText}>Commits</Text>
                        <Text style={styles.repoName}>{this.props.selectedRepo}</Text>

                        {this.state.loading === false &&
                        <FlatList

                            data={this.state.commits}
                            renderItem={this.renderItem}
                            keyExtractor={(item) => item.sha}
                            ListEmptyComponent={() => <Text>No item found!</Text>}
                            initialNumToRender={7}
                            removeClippedSubviews={true}
                            onRefresh={this.handleRefresh}
                            refreshing={this.state.loading}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this.renderSeparator}


                        />}
                        {this.state.loading &&
                        <LottieView source={Images.loader} style={styles.loadingAnim} autoPlay loop/>
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

    renderSeparator = ({leadingItem, section}) => {
        return (
            <View style={styles.commitSeparator}>
                <Svg height="6" width="100%">
                    <Line
                        x1="5%"
                        y1="4"
                        x2="95%"
                        y2="4"
                        stroke="rgba(85,85,85,.6)"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeDasharray="1, 7"
                    />
                </Svg>
            </View>
        );
    };
    onLogoutClick = async () => {
        await this.props.logoutUser();
        Actions.reset('login');
    }

    onRepoFetchSuccess = (json) => {
        //start parsing json and filter data
        let commits = [];
        json.forEach(function (value) {
            let authorAvatar = "Unknown"
            let authorUsername = "Unknown"
            if (value.author != null) {
                authorAvatar = value.author.avatar_url;
                authorUsername = value.author.login;
            }

            const authorName = value.commit.author.name;
            const message = value.commit.message;
            const date = value.commit.author.date;

            const sha = value.sha;

            commits.push({
                authorAvatar,
                authorUsername,
                authorName,
                message,
                date,
                sha
            })

        })
        this.setState({commits, loading: false})
    }

    onRepoFetchFail = () => {
        console.log('fail')
        this.setState({loading: false})

    }


    handleRefresh = async () => {
        const repo = this.props.selectedRepo;
        await this.setState({loading: true, commits: null, error: false}, async () => {
            await getCommits(this.props.user.email, this.props.user.password, repo, this.onRepoFetchSuccess, this.onRepoFetchFail);
        })
    }

    renderItem = ({item, index}) => {
        console.log(item.authorAvatar);
        const commitDate = moment(new Date(item.date)).format('YYYY-M-D');

        return <View>
            <View style={styles.authorDetail}>
                <Image source={item.authorAvatar !== 'Unknown' ? {uri: item.authorAvatar} : Images.avatar}
                       style={styles.authorAvatar}
                />
                <View style={styles.authorDetailInner}>

                    <Text style={styles.authorName}>{item.authorName}</Text>
                    <Text style={styles.authorUsername}>({item.authorUsername}) - {commitDate}</Text>

                </View>

            </View>
            <Text  numberOfLines={7}>{item.message}</Text>
        </View>
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

RepoScreen.propTypes = {
    selectedRepo: PropTypes.string.isRequired
};
