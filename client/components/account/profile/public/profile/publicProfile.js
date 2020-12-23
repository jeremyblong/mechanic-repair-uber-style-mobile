import React, { Component, Fragment } from 'react';
import { View, Text, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Left, Title, Button, Right, Text as NativeText, ListItem, Item, Label, Input } from 'native-base';
import styles from './styles.js';
import ReadMore from 'react-native-read-more-text';
import RBSheet from "react-native-raw-bottom-sheet";
import Gallery from 'react-native-image-gallery';
import Config from 'react-native-config';
import { connect } from "react-redux";
import axios from "axios";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Dialog from "react-native-dialog";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const { width, height } = Dimensions.get("window");

const description = "I'm a traveling Software Engineer from Charlotte, NC. I drove cross country for work and am working on getting settled in. I'm very respectful, kind, compassionate and laid back. I hope you are able to overlook my tattoos and talk to me to understand who I really am aside from the tattoos. I'm very clean, quiet and overall a good human being. I try to be the best person I can be everyday and strive for excellence.";

class ViewPublicProfileHelper extends Component {
constructor (props) {
    super(props);

    this.state = {
        ready: false,
        images: [],
        showDialog: false,
        profilePicBase64: "",
        uri: ""
    }
}
    componentDidMount() {

        axios.post(`${Config.ngrok_url}/gather/general/info`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Found user!") {

                const { user } = res.data;

                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < user.profilePics.length; index++) {
                        const obj = user.profilePics[index];
                        
                        this.setState({
                            images: [{ source: { uri: obj.full_url } }, ...this.state.images]
                        }, () => {
                            if ((user.profilePics.length - 1) === index) {
                                resolve(user);
                            }
                        })
                    }
                })

                promiseee.then((dataaa) => {
                    this.setState({
                        ready: true,
                        user: dataaa
                    })
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ fontSize: 20, color: "darkblue", marginTop: 5}} onPress={handlePress}>
                Read more
            </Text>
        );
    }
 
    _renderRevealedFooter = (handlePress) => {
        return (
        <Text style={{ fontSize: 20, color: "darkblue", marginTop: 5}} onPress={handlePress}>
            Show less
        </Text>
        );
    }
 
    _handleTextReady = () => {
        console.log("text ready");
    }
    renderSlideContent = () => {
        if (this.state.ready === true) {
            return (
                <Fragment>
                    <ScrollView showVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 75 }} style={{ flex: 1 }}>
                        <Gallery
                            style={{ flex: 1, backgroundColor: 'black', maxHeight: 250, minHeight: 250 }}
                            images={this.state.images}
                        />
                        <View>
                            <TouchableOpacity style={styles.topRight} onPress={() => {
                                this.setState({
                                    showDialog: true
                                })
                            }}>
                                <Image source={require("../../../../../assets/icons/camera.png")} style={{ maxWidth: 40, maxHeight: 40 }} />
                            </TouchableOpacity>
                            <View style={{ margin: 20 }}>
                                <Text style={[styles.h6, { fontSize: 20, fontWeight: "bold", marginBottom: 20 }]}>Edit About Me</Text>
                                <Text style={styles.h6}>{description}</Text>
                            </View>
                            <View style={styles.hr} />
                            <View style={{ margin: 20 }}>
                                <Text style={styles.h3}>Optional Details</Text>
                            </View>
                            <ListItem style={styles.listItemSpecial}>
                                <Item stackedLabel>
                                    <Label>Location</Label>
                                    <Input style={styles.minWidthInput} placeholderTextColor={"grey"} placeholder={"Eg... Paris, FR / Brooklyn, NY / Chicago, IL"} />
                                </Item>
                                
                            </ListItem>
                            <ListItem style={styles.listItemSpecial}>
                                <Item stackedLabel>
                                    <Label>Work</Label>
                                    <Input style={styles.minWidthInput} placeholderTextColor={"grey"} placeholder={"Eg... Airbnb / Apple / Taco Stand"} />
                                </Item>
                                
                            </ListItem>
                            <ListItem style={styles.listItemSpecial}>
                                <Text style={styles.smallerTextSub}>Languages {"\n"}<Text style={styles.biggerTextSub}>English</Text></Text>
                                
                            </ListItem>
                        </View>
                    </ScrollView>
                </Fragment>
            );
        } else {
            return (
                <ScrollView>
                    <SkeletonPlaceholder>
                        <View style={styles.box} />
                        <View style={styles.skelatonRow} />
                        <View style={styles.skelatonRow} />
                        <View style={styles.skelatonRow} />
                        <View style={styles.skelatonRow} />
                        <View style={styles.skelatonRow} />
                        <View style={styles.skelatonRow} />
                        <View style={styles.skelatonRow} />
                    </SkeletonPlaceholder>
                </ScrollView>
            );
        }
    }
    completed = (values) => {
        console.log("values", values);
    }
    launchCameraHelper = () => {
        console.log("launchCameraHelper clicked.")
        launchCamera({
            mediaType: "photo",
            includeBase64: true,
            saveToPhotos: true,
            quality: 1
        }, this.completed);
    }
    launchImageLibraryHelper = () => {
        launchImageLibrary({
            mediaType: "photo",
            includeBase64: true,
            quality: 1
        }, this.completedTwo)
    }
    completedTwo = (values) => {
        console.log("completedTwo values", values);

        this.setState({
            profilePicBase64: values.base64,
            uri: values.uri,
            images: [{ source: { uri: `data:${values.type};base64,${values.base64}` } }, ...this.state.images],
            showDialog: false
        })
    }
    render() {
        console.log("this.state publicProfile", this.state);
        const review_count = Math.floor(Math.random() * 50) + 1;
        return (
            <Fragment>
                <Header style={{ width }}>
                    <Left style={{ flexDirection: "row", flex: 1 }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../../../assets/icons/go-back.png")} style={{ maxWidth: 25, maxHeight: 25 }} />
                        </Button>
                        <Title style={{ textAlign: "left", marginTop: 10 }}>Public Profile</Title>
                    </Left>
                    <Right style={styles.right}>
                        <Button onPress={() => {
                            this.RBSheet.open();
                        }} transparent>
                            <Image source={require("../../../../../assets/icons/pen.png")} style={styles.rightIcon} />
                        </Button>
                    </Right>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingTop: 25 }} style={styles.container}>
                    <View style={styles.marginSpace}>
                        <View style={{ flexDirection: "row", maxHeight: height * 0.16 }}>
                            <View>
                                <Text style={styles.innerTextOne}>Hi, I'm Jeremy</Text>
                                <Text style={styles.secondText}>Joined in Feburary, 2019</Text>
                            </View>
                            <View>
                                <Image source={require("../../../../../assets/images/me.jpg")} style={styles.profilePicture} />
                            </View>
                        </View>
                        <View style={styles.nextContainer}>
                            <Image source={require("../../../../../assets/icons/verified.png")} style={styles.verified} /><Text style={{ marginTop: 8, marginLeft: 10 }}>Identity Verified</Text>
                        </View>
                        <View style={[styles.nextContainer, { marginTop: 15 }]}>
                            <Image source={require("../../../../../assets/icons/flying.png")} style={styles.verified} /><Text style={{ marginTop: 8, marginLeft: 10 }}>{review_count} Reviews</Text>
                        </View>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.marginSpace}>
                        <Text style={styles.h3}>About</Text>
                        <Image source={require("../../../../../assets/icons/quotes-small.png")} style={styles.quotesIcon} />
                        <ReadMore
                            numberOfLines={3}
                            renderTruncatedFooter={this._renderTruncatedFooter}
                            renderRevealedFooter={this._renderRevealedFooter}
                            onReady={this._handleTextReady}
                        >
                            <Text style={styles.descriptionText}>{description}</Text>
                        </ReadMore>
                        <View style={styles.shortHr} />
                        <View style={styles.customRow}>
                            <Image source={require("../../../../../assets/icons/home.png")} style={styles.helperIcon} />
                            <Text style={styles.iconTextHelper}>Lives in Los Angeles, CA</Text>
                        </View>
                        <View style={styles.customRow}>
                            <Image source={require("../../../../../assets/icons/chat.png")} style={styles.helperIcon} />
                            <Text style={styles.iconTextHelper}>Speaks English</Text>
                        </View>
                        <View style={styles.customRow}>
                            <Image source={require("../../../../../assets/icons/suitcase.png")} style={styles.helperIcon} />
                            <Text style={styles.iconTextHelper}>Works at Software Engineer</Text>
                        </View>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.marginSpace}>
                        <Text style={styles.h3}>Jeremy Confirmed</Text>
                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.column}>
                                <View style={{ flexDirection: "row", marginTop: 8, marginBottom: 6 }}>
                                    <Image source={require("../../../../../assets/icons/checked.png")} style={styles.helperIcon} />
                                    <Text style={styles.spaceLeftText}>Identity</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 8, marginBottom: 6 }}>
                                    <Image source={require("../../../../../assets/icons/checked.png")} style={styles.helperIcon} />
                                    <Text style={styles.spaceLeftText}>Phone Number</Text>
                                </View>
                            </View>
                            <View style={styles.column}>
                                <View style={{ flexDirection: "row", marginTop: 8, marginBottom: 6 }}>
                                    <Image source={require("../../../../../assets/icons/checked.png")} style={styles.helperIcon} />
                                    <Text style={styles.spaceLeftText}>Email Address</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 8, marginBottom: 6 }}>
                                    <Image source={require("../../../../../assets/icons/checked.png")} style={styles.helperIcon} />
                                    <Text style={styles.spaceLeftText}>Payment Method</Text>
                                </View>
                            </View>
                            
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ fontSize: 14 }}><Text onPress={() => {
                                console.log("clicked!!!!");
                            }} style={{ fontSize: 14, color: "darkblue" }}>Learn More</Text> about how confirming account info helps keep the (Company Name) community secure.</Text>
                        </View>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.marginSpace}>
                        <Text style={styles.h3}>{review_count} Reviews</Text>
                    </View>
                </ScrollView>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={height}
                    openDuration={250}
                    customStyles={{
                        container: {
                        justifyContent: "center",
                        alignItems: "center"
                        }
                    }}
                >
                    <View>
                        <Dialog.Container onBackdropPress={() => {
                            this.setState({
                                showDialog: false
                            })
                        }} visible={this.state.showDialog}>
                        <Dialog.Title>Take Picture</Dialog.Title>
                        <Dialog.Description>
                            Take a new photo or select one from your existing photo library.
                        </Dialog.Description>
                        <Dialog.Button onPress={this.launchImageLibraryHelper} label="GALLERY" />
                        <Dialog.Button onPress={this.launchCameraHelper} label="CAMERA" />
                        </Dialog.Container>
                    </View>
                    <View style={styles.innerContainer}>
                        <Header style={{ width }}>
                            <Left style={{ flexDirection: "row", flex: 1 }}>
                                <Button onPress={() => {
                                    this.RBSheet.close();
                                }} transparent>
                                    <Image source={require("../../../../../assets/icons/x.png")} style={{ maxWidth: 25, maxHeight: 25 }} />
                                </Button>
                                <Title style={{ textAlign: "left", marginTop: 10 }}>Edit primary info</Title>
                            </Left>
                        </Header>
                        <View style={{ flex: 1 }}>
                            {this.renderSlideContent()}
                        </View>
                    </View>
                </RBSheet>
                
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    };
}
export default connect(mapStateToProps, {  })(ViewPublicProfileHelper);