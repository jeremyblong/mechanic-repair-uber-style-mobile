import React, { useState, Fragment } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import styles from "./styles.js";
import { Button, Text as NativeText } from "native-base";
import { authenticated, finishedSignup } from "../../../actions/signup/auth.js";
import { connect } from "react-redux";
import axios from "axios";
import Config from "react-native-config";
import { sendbirdLogin } from "../../../actions/sendbird/user.js";
import messaging from '@react-native-firebase/messaging';

const CreateAccountTypeHelper = (props) => {
    const continueToNextPage = (selection) => {
        console.log("continueToNextPage");

        requestUserPermission(selection);
    }
    const requestUserPermission = async (selection) => {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
        if (enabled) {
          getFcmToken(selection) //<---- Add this
          console.log('Authorization status:', authStatus);
        } else {
            const { previous } = props;

            axios.post(`${Config.ngrok_url}/register/user`, {
                address: previous.address,
                authyID: previous.authyID,
                birthdate: previous.birthdate,
                gender: previous.gender,
                fullName: previous.name,
                password: previous.password,
                unformatted: previous.unformatted ? previous.unformatted : null,
                phoneNumber: previous.phoneNumber ? previous.phoneNumber : "",
                email: previous.email ? previous.email : "",
                wholeAddress: previous.wholeAddress,
                accountType: selection
            }).then((res) => {
                if (res.data.message === "Successfully registered new user!") {
                    console.log(res.data);

                    const { data } = res.data;

                    props.authenticated(data);

                    props.sendbirdLogin({ userId: data.unique_id, nickname: data.fullName });

                    props.finishedSignup(true);

                    setTimeout(() => {
                        props.props.navigation.push("homepage-main");
                    },  500);
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })

            props.authenticated({
                ...props.previous, accountType: selection, page: 8
            })
        }
    }
    const requestUserPermissionCustom = async (selection) => {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
        if (enabled) {
          getFcmTokenCustom(selection) //<---- Add this
          console.log('Authorization status:', authStatus);
        } else {
            const { previous } = props;

            axios.post(`${Config.ngrok_url}/register/user/customer`, {
                address: previous.address,
                authyID: previous.authyID,
                birthdate: previous.birthdate,
                gender: previous.gender,
                fullName: previous.name,
                password: previous.password,
                unformatted: previous.unformatted ? previous.unformatted : null,
                phoneNumber: previous.phoneNumber ? previous.phoneNumber : "",
                email: previous.email ? previous.email : "",
                wholeAddress: previous.wholeAddress,
                accountType: selection
            }).then((res) => {
                if (res.data.message === "Successfully registered new user!") {
                    console.log(res.data);

                    const { data } = res.data;

                    props.authenticated(data);

                    props.sendbirdLogin({ userId: data.unique_id, nickname: data.fullName });

                    props.finishedSignup(true);

                    setTimeout(() => {
                        props.props.navigation.push("homepage-main");
                    },  500);
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })

            props.authenticated({
                ...props.previous, accountType: selection, page: 8
            })
        }
    }
    const getFcmTokenCustom = async (selection) => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log(fcmToken);
            console.log("Your Firebase Token is:", fcmToken);

            const { previous } = props;

            axios.post(`${Config.ngrok_url}/register/user/customer`, {
                address: previous.address,
                authyID: previous.authyID,
                birthdate: previous.birthdate,
                gender: previous.gender,
                fullName: previous.name,
                password: previous.password,
                unformatted: previous.unformatted ? previous.unformatted : null,
                phoneNumber: previous.phoneNumber ? previous.phoneNumber : "",
                email: previous.email ? previous.email : "",
                wholeAddress: previous.wholeAddress,
                accountType: selection,
                firebasePushNotificationToken: fcmToken
            }).then((res) => {
                if (res.data.message === "Successfully registered new user!") {
                    console.log(res.data);

                    const { data } = res.data;

                    props.authenticated(data);

                    props.sendbirdLogin({ userId: data.unique_id, nickname: data.fullName });

                    props.finishedSignup(true);

                    setTimeout(() => {
                        props.props.navigation.push("homepage-main");
                    },  500);
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })

            props.authenticated({
                ...props.previous, accountType: selection, page: 8
            })
        } else {
            console.log("Failed", "No token received");
        }
    }
    const registerAsCustomer = () => {

        requestUserPermissionCustom("client");
    }
    const getFcmToken = async (selection) => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log(fcmToken);
            console.log("Your Firebase Token is:", fcmToken);

            const { previous } = props;

            axios.post(`${Config.ngrok_url}/register/user`, {
                address: previous.address,
                authyID: previous.authyID,
                birthdate: previous.birthdate,
                gender: previous.gender,
                fullName: previous.name,
                password: previous.password,
                unformatted: previous.unformatted ? previous.unformatted : null,
                phoneNumber: previous.phoneNumber ? previous.phoneNumber : "",
                email: previous.email ? previous.email : "",
                wholeAddress: previous.wholeAddress,
                accountType: selection,
                firebasePushNotificationToken: fcmToken
            }).then((res) => {
                if (res.data.message === "Successfully registered new user!") {
                    console.log(res.data);

                    const { data } = res.data;

                    props.authenticated(data);

                    props.sendbirdLogin({ userId: data.unique_id, nickname: data.fullName });

                    props.finishedSignup(true);

                    setTimeout(() => {
                        props.props.navigation.push("homepage-main");
                    },  500);
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })

            props.authenticated({
                ...props.previous, accountType: selection, page: 8
            })
        } else {
            console.log("Failed", "No token received");
        }
    }
    const redirecToNextPageDriver = (selection) => {
        console.log("redirecToNextPageDriver clicked");

        props.authenticated({
            ...props.previous,
                accountType: selection,
                page: 6
        });

        setTimeout(() => {
            props.props.navigation.navigate("associate-to-tow-company");
        }, 500);
    }
    const mechanicMoveNextPage = () => {
        console.log("mechanicMoveNextPage clicked");

        props.authenticated({
            ...props.previous,
                accountType: "mechanic",
                page: 7
        });

        setTimeout(() => {
            props.props.navigation.navigate("mechanic-select-pricing-plan");
        }, 500);
    }
    return (
        <Fragment>
            <ImageBackground source={require("../../../assets/images/white-wood.jpg")} style={styles.container}>
                <View style={styles.backBackground}>
                    <Image source={require("../../../assets/icons/profile.png")} style={styles.accountImage} />
                    <Text style={styles.mainText}>Are you a mechanic OR looking to get work done?</Text>
                    <View style={styles.center}>
                        <Button bordered onPress={() => {
                            continueToNextPage("mechanic");
                        }} style={styles.submitBtn}>
                            <NativeText style={{ color: "black" }}>I'm a mechanic</NativeText>
                        </Button>
                        <Button bordered dark onPress={() => {
                            registerAsCustomer();
                        }} style={styles.submitBtn}>
                            <NativeText style={{ color: "black" }}>I need a repair OR roadside assistance</NativeText>
                        </Button>
                        <Button bordered onPress={() => {
                            // continueToNextPage("tow-truck-driver");
                            redirecToNextPageDriver("tow-truck-driver");
                        }} style={styles.submitBtn}>
                            <NativeText style={{ color: "black" }}>I'm a tow truck driver</NativeText>
                        </Button>
                        <Button bordered dark onPress={() => {
                            continueToNextPage("tow-truck-company");
                        }} style={styles.submitBtn}>
                            <NativeText style={{ color: "black" }}>I'm a tow truck company (businesses only)</NativeText>
                        </Button>
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity onPress={() => {
                            props.props.navigation.navigate("location-create");
                        }}>
                            <Text style={styles.goBack}>Go Back...</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </ImageBackground>
        </Fragment>
    );
}
const mapStateToProps = state => {
    return {
        previous: state.auth.authenticated
    }
}
export default connect(mapStateToProps, { authenticated, finishedSignup, sendbirdLogin })(CreateAccountTypeHelper);
