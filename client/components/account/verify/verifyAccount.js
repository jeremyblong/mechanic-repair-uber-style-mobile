import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import styles from './styles.js';
import { Header, Left, Body, Right, Button, Title, Text as NativeText } from 'native-base';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import axios from "axios";
import { Config } from "react-native-config";
import { connect } from "react-redux";
import { WebView } from 'react-native-webview';
import ProgressiveImage from "../../../components/progressiveImage.js";
import _ from "lodash";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";



const { height, width } = Dimensions.get("window");


class VerifyAndValidateAccountStripeHelper extends Component {
constructor(props) {
    super(props);


    this.state = {
        url: "",
        ready: false,
        completed: false,
        uploaded_content: false,
        user: null
    }
}
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/general/info`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Found user!") {

                const { user } = res.data;

                if (_.has(user, "completed_stripe_onboarding") && user.completed_stripe_onboarding === true) {
                    this.setState({
                        user,
                        ready: true
                    })    
                } else {
                    this.setState({
                        user
                    })
                }
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handleVerificationProcess = () => {
        console.log("handleVerificationProcess clicked.");

        axios.post(`${Config.ngrok_url}/onboarding/stripe`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Gathered flow link!") {
                console.log(res.data);

                const { accountLink } = res.data;

                this.setState({
                    url: accountLink.url,
                    ready: true
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    renderInitial = () => {
        const { user } = this.state;

        if (user !== null) {
            return (
                <Fragment>
                    <Text style={styles.textOne}>We will need to take you through the verifcation process in order to SEND or RECIEVE funds.</Text>
                    <View style={styles.hr} />
                    <AwesomeButtonBlue textColor={"black"} stretch={true} onPress={this.handleVerificationProcess} type={"secondary"}>Start Verfication Process</AwesomeButtonBlue>
                    <View style={styles.hr} />
                    <Text style={[styles.textOne, { marginBottom: 20 }]}>We use STRIPE for our payment gateway. Stripe requires verifcation of all acounts before sending or receiving funds. It is a quick and effortless mandatory process.</Text>
                    <ProgressiveImage
                        source={require("../../../assets/images/stripe.png")}
                        style={styles.stripe}
                        height={200}
                        width={width - 40}
                    />
                </Fragment> 
            ); 
        } else {
            return (
                <Fragment>
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: width * 0.40, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }} />
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: width * 0.40, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }} />
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: width * 0.40, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }} />
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: width * 0.40, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }} />
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: width * 0.40, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }} />
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: width * 0.40, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }} />
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: width * 0.40, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }} />
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: width * 0.60, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: width * 0.40, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }} />
                    </SkeletonPlaceholder>
                </Fragment>
            );
        }
    }
    completed = () => {
        console.log("Completed ran....");

        axios.post(`${Config.ngrok_url}/mark/stripe/onboarding/complete`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Marked complete!") {
                console.log(res.data);

                this.setState({
                    completed: true
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    renderWebView = () => {
        const { completed, user } = this.state;

        if (completed === false && !_.has(user, "completed_stripe_onboarding")) {
            return (
                <Fragment>
                    <WebView onNavigationStateChange={(e) => {
                        console.warn("current state is ", JSON.stringify(e, null, 2));
    
                        if (e.url === "https://www.google.com/" || e.url === "https://www.google.com") {

                            if (this.state.uploaded_content === false) {
    
                                this.completed();

                                this.setState({
                                    uploaded_content: true
                                })
                            }
                        }
                    }} onLoadEnd={()=>{
                    /* add you work that you want to do after loading is done. */
                    }} ref={(webView) => this.webView = webView} style={styles.webview} containerStyle={styles.containerStyle} source={{ uri: this.state.url }} />
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                        <Text style={styles.textOne}>You have <Text style={{ fontWeight: "bold", color: "blue" }}>SUCCESSFULLY</Text> completed your stripe account verfication.</Text>
                        <View style={styles.hr} />
                        <Text style={[styles.textOne, { marginBottom: 20 }]}>You may now <Text style={{ fontWeight: "bold", color: "blue" }}>ACCEPT PAYMENTS</Text> and <Text style={{ fontWeight: "bold", color: "blue" }}>CASH-OUT</Text> "PAYOUTS" to your account!</Text>
                        <ProgressiveImage
                            source={require("../../../assets/images/stripe.png")}
                            style={styles.stripe}
                            height={200}
                            width={width - 40}
                        />
                </Fragment>
            );
        }
    }
    render() {
        const { ready, completed } = this.state;

        console.log("Verify account state", this.state);
        return (
            <Fragment>
                 <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.push("homepage-main");
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Verify Account</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <NativeText>Cancel</NativeText>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container}>
                    <View style={styles.margin}>
                        {ready === false ? this.renderInitial() : this.renderWebView()}
                    </View>
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, { })(VerifyAndValidateAccountStripeHelper);