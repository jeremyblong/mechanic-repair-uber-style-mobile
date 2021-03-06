import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Platform, Dimensions } from "react-native";
import { Header, Left, Body, Right, Button, Title, Text as NativeText, Subtitle } from 'native-base';
import styles from "./styles.js";
import { connect } from "react-redux";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import { TabView, TabBar } from 'react-native-tab-view';
import RNIap, {
    Product,
    ProductPurchase,
    requestPurchase,
    PurchaseError,
    getProducts,
    acknowledgePurchaseAndroid,
    purchaseErrorListener,
    purchaseUpdatedListener,
} from 'react-native-iap';
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../toastConfig.js";
import axios from "axios";
import { Config } from "react-native-config";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Dialog from "react-native-dialog";


const { height, width } = Dimensions.get("window");

const itemSkus = Platform.select({
    ios: [
     '203948092009029',
     '234987282',
     '2409583883888373',
     '23435948383',
     '28988892983838',
     '11118234877373'
    ],
    android: []
});

class PromoteAccountMainHelper extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        boostMechanic: "",
        productList: [],
        boostTowTruckCompany: "",
        receipt: "",
        routes: [
            { key: 'mechanic', title: 'Boost - Mechanic Profile' },
            { key: 'tow-truck-company', title: 'Boost - Tow Company' },
            { key: "clients", title: "Booost - Client Listing" }
        ],
        index: 0,
        availableItemsMessage: "",
        data: [],
        user: null,
        showExisting: false,
        showExistingTwo: false
    }
}
    getItemsMechanicBoost = async (passedState) => {
        try {
            console.log('itemSkus[0]', itemSkus[0]);
            const products = await getProducts(itemSkus);
            console.log('Products[0]', products);
            if (products) {
                this.setState({
                    productList: products
                }, () => {
                    switch (passedState) {
                        case "1-boost": 
                            this.requestPurchaseMechanicBoost(itemSkus[1]);
                            break;
                        case "3-boosts": 
                            this.requestPurchaseMechanicBoost(itemSkus[3]);
                            break;
                        case "5-boosts": 
                            this.requestPurchaseMechanicBoost(itemSkus[0]);
                            break;
                        default:
                            break;
                    }
                })
            }
        } catch (err) {
             console.log('getItemsMechanicBoost || purchase error => ', err);
        }
    };
    getItemsTowCompanyBoost = async (passedState) => {
        try {
            console.log('itemSkus[0]', itemSkus[0]);
            const products = await getProducts(itemSkus);
            console.log('Products[0]', products);
            if (products) {
                this.setState({
                    productList: products
                }, () => {
                    switch (passedState) {
                        case "1-boost": 
                            this.requestPurchaseTowTruckCompanyBoost(itemSkus[2]);
                            break;
                        case "2-boosts": 
                            this.requestPurchaseTowTruckCompanyBoost(itemSkus[5]);
                            break;
                        case "3-boosts": 
                            this.requestPurchaseTowTruckCompanyBoost(itemSkus[4]);
                            break;
                        default:
                            break;
                    }
                })
            }
        } catch (err) {
             console.log('getItemsMechanicBoost || purchase error => ', err);
        }
    };
    async componentDidMount() {
        console.log(itemSkus[0])
        try {
          const result = await RNIap.initConnection();
          console.log('connection is => ', result);
          await RNIap.consumeAllItemsAndroid();
        } catch (err) {
          console.log('error in cdm => ', err);
        }

        axios.post(`${Config.ngrok_url}/gather/general/info`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Found user!") {
                console.log("RES.data:", res.data);

                const { user } = res.data;

                this.setState({
                    user
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    getAvailablePurchases = async () => {
        try {
          const purchases = await RNIap.getAvailablePurchases();

          console.info('Available purchases => ', purchases);

          if (purchases && purchases.length > 0) {
            this.setState({
              availableItemsMessage: `Got ${purchases.length} items.`,
              receipt: purchases[0].transactionReceipt,
            });
          }
        } catch (err) {
          console.warn(err.code, err.message);
          console.log('getAvailablePurchases error => ', err);
        }
    };
    requestPurchaseMechanicBoost = async (sku) => {
        try {
            requestPurchase(sku).then((result) => {
                console.log("Result mechanic boost.", result);
                
                const { boostMechanic } = this.state;

                axios.post(`${Config.ngrok_url}/successful/boost/purchase/mechanic/listing`, {
                    boost: boostMechanic,
                    id: this.props.unique_id
                }).then((res) => {
                    if (res.data.message === "No existing boost and boost was activated!") {
                        console.log(res.data);

                        this.setState({
                            boostMechanic: ""
                        }, () => {
                            Toast.show({
                                type: 'success',
                                position: 'top',
                                text1: 'Successfully purchased boost(s) and activated promotion!',
                                text2: "Boost(s) were successfully activated/purchased and we're credited to your account!",
                                visibilityTime: 4500
                            });
                        })
                    } else if (res.data.message === "User account is already boosted and you cannot double boost!") {

                        this.setState({
                            boostMechanic: ""
                        }, () => {
                            Toast.show({
                                type: 'error',
                                position: 'top',
                                text1: `You are ALREADY boosted - Can't double boost.`,
                                text2: "You've already boosted your account BUT your credits were SUCCESSFULLY added!",
                                visibilityTime: 4500
                            });
                        })
                    } else {
                        console.log("err", res.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log("Critical purchase err", err);
            })
        } catch (err) {
          console.log('requestPurchase error => ', err);
        }
    };
    requestPurchaseTowTruckCompanyBoost = async (sku) => {
        console.log("TRY requestPurchaseTowTruckCompanyBoost");
        try {
          requestPurchase(sku).then((result) => {
                console.log("Result tow truck co.", result);

                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Successfully purchased BOOST for 3 days! ????',
                    text2: "You've successfully purchased a boost and your profile is now active for 3 days!",
                    visibilityTime: 4500
                });

                this.purchaseConfirmedTowTruck();
          }).catch((err) => {
              console.log("Critical purchase err", err);
          })
        } catch (err) {
          console.log('requestPurchase error => ', err);
        }
    };
    purchaseConfirmedTowTruck = () => {
        console.log("purchaseConfirmedTowTruck clicked");

        const { boostTowTruckCompany } = this.state;

        axios.post(`${Config.ngrok_url}/successful/boost/purchase/tow/company`, {
            boost: boostTowTruckCompany,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Completed logic!") {
                console.log(res.data);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    useExistingBoost = () => {
        axios.post(`${Config.ngrok_url}/boost/mechanic/using/existing/boost`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "No existing boost and boost was activated!") {
                console.log(res.data);

                this.setState({
                    showExisting: false
                }, () => {
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: 'Successfully activated existing boost!',
                        text2: "Existing boost was activated and subtracted from your account...",
                        visibilityTime: 4500
                    });
                })
                
            } else if (res.data.message === "User account is already boosted and you cannot double boost!") {

                this.setState({
                    showExisting: false
                }, () => {
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: `You are ALREADY boosted - Can't double boost.`,
                        text2: "You've already boosted your account and you cannot double boost.",
                        visibilityTime: 4500
                    });
                })
            } else if (res.data.message === "You do not have any boosts to promote your account with, please purchase some and try again.") {

                this.setState({
                    showExisting: false
                }, () => {
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: `You do NOT have any boosts avaliable!.`,
                        text2: "Your account does NOT have any avaliable boosts - please purchase some and try again.",
                        visibilityTime: 4500
                    });
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderScene = ({ route }) => {
        const { boostTowTruckCompany, boostMechanic, user } = this.state;

        switch (route.key) {
        case 'mechanic':
            if (user.accountType === "mechanic") {
                return (
                    <View style={styles.containerView}>
                        <View style={{ margin: 20 }}>
                        <AwesomeButtonBlue style={{ marginTop: 25, marginBottom: 20 }} type={"secondary"} onPress={() => {
                           this.setState({
                               showExisting: true
                           })
                        }} stretch={true}>Use an existing boost</AwesomeButtonBlue>
                        </View>
                        <View style={styles.box}>
                                <View style={styles.margin}>
                                    <Text style={styles.mainText}>Be shown on the front page as a "Premier Mechanic"</Text>
                                    <View style={styles.hr} />
                                    <View style={styles.centered}>
                                        <Image source={require("../../assets/icons/lightning.png")} style={styles.circle} />
                                    </View>
                                    <Text style={styles.middleText}>Skip the line</Text>
                                    <Text style={[styles.middleSmallerText, { marginTop: 10 }]}>Be a top profile in your area for 3 days to get more traction.</Text>
                                    <View style={styles.row}>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                boostMechanic: "1-boost"
                                            })
                                        }} style={boostMechanic === "1-boost" ? [styles.column, { borderTopColor: "black", borderTopWidth: 10, borderBottomColor: "black", borderBottomWidth: 10 }] : [styles.column, { borderTopColor: "blue", borderTopWidth: 10, borderBottomColor: "blue", borderBottomWidth: 10 }]}>
                                            <Text style={styles.boostText}>1 {"\n"} Boost</Text>
                                            <View />
                                            <Text style={styles.priceText}>$24.99/ea</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                boostMechanic: "3-boosts"
                                            })
                                        }} style={boostMechanic === "3-boosts" ? [styles.column, { height: 200, marginTop: 0, borderTopColor: "black", borderTopWidth: 10, borderBottomColor: "black", borderBottomWidth: 10 }] : [styles.column, { height: 200, marginTop: 0, borderTopColor: "#8884FF", borderTopWidth: 10, borderBottomColor: "#8884FF", borderBottomWidth: 10 }]}>
                                            <Text style={styles.boostText}>3 {"\n"} Boosts</Text>
                                            <View />
                                            <Text style={styles.priceText}>$22.49/ea</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                boostMechanic: "5-boosts"
                                            })
                                        }} style={boostMechanic === "5-boosts" ? [styles.column, { borderTopColor: "black", borderTopWidth: 10, borderBottomColor: "black", borderBottomWidth: 10 }] : [styles.column, { borderTopColor: "blue", borderTopWidth: 10, borderBottomColor: "blue", borderBottomWidth: 10 }]}>
                                            <Text style={styles.boostText}>5 {"\n"} Boosts</Text>
                                            <View />
                                            <Text style={styles.priceText}>$19.99/ea</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {typeof boostMechanic !== "undefined" && boostMechanic.length > 0 ? <Fragment><AwesomeButtonBlue style={{ marginTop: 25, marginBottom: 20 }} type={"secondary"} onPress={() => {
                                    this.getItemsMechanicBoost(boostMechanic);
                                }} stretch={true}>Boost My Profile!</AwesomeButtonBlue>
                                <View style={[styles.hr, { marginBottom: -10 }]} /></Fragment> : null}
                            </View>
                    </View>
                );
            } else {
                return (
                    <View style={styles.margin}>
                        <Text style={styles.noAccessText}>You do not have permission to view this page. Only <Text style={{ fontStyle: "italic", color: "darkblue" }}>mechanics</Text> have access to this page.</Text>
                    </View>
                );
            }
        case 'tow-truck-company':
            if (user.accountType === "tow-truck-company") {
                return (
                    <View style={styles.containerView}>
                        <View style={{ margin: 20 }}>
                            <Text style={{ fontSize: 18, textAlign: "center" }}>Please make sure any active drivers have COMPLETED their <Text style={{ fontWeight: "bold" }}>"stripe onboarding"</Text> process - otherwise they will not be shown when boosted.</Text>
                            <AwesomeButtonBlue style={{ marginTop: 25, marginBottom: 20 }} type={"secondary"} onPress={() => {
                            this.setState({
                                showExistingTwo: true
                            })
                            }} stretch={true}>Use an existing boost</AwesomeButtonBlue>
                        </View>
                        <View style={styles.box}>
                                <View style={styles.margin}>
                                    <Text style={styles.mainText}>Be shown on the front page as a "Premier Tow Truck Company"</Text>
                                    <View style={styles.hr} />
                                    
                                    <View style={styles.centered}>
                                        <Image source={require("../../assets/icons/lightning.png")} style={styles.circle} />
                                    </View>
                                    <Text style={styles.middleText}>Skip the line</Text>
                                    <Text style={[styles.middleSmallerText, { marginTop: 10 }]}>Be a top profile in your area for 3 days to get more traction.</Text>
                                    <View style={styles.row}>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                boostTowTruckCompany: "1-boost"
                                            })
                                        }} style={boostTowTruckCompany === "1-boost" ? [styles.column, { borderTopColor: "black", borderTopWidth: 10, borderBottomColor: "black", borderBottomWidth: 10 }] : [styles.column, { borderTopColor: "blue", borderTopWidth: 10, borderBottomColor: "blue", borderBottomWidth: 10 }]}>
                                            <Text style={styles.boostText}>1 {"\n"} Boost</Text>
                                            <View />
                                            <Text style={styles.priceText}>$34.99/ea</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                boostTowTruckCompany: "2-boosts"
                                            })
                                        }} style={boostTowTruckCompany === "2-boosts" ? [styles.column, { height: 200, marginTop: 0, borderTopColor: "black", borderTopWidth: 10, borderBottomColor: "black", borderBottomWidth: 10 }] : [styles.column, { height: 200, marginTop: 0, borderTopColor: "#8884FF", borderTopWidth: 10, borderBottomColor: "#8884FF", borderBottomWidth: 10 }]}>
                                            <Text style={styles.boostText}>2 {"\n"} Boosts</Text>
                                            <View />
                                            <Text style={styles.priceText}>$32.49/ea</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                boostTowTruckCompany: "3-boosts"
                                            })
                                        }} style={boostTowTruckCompany === "3-boosts" ? [styles.column, { borderTopColor: "black", borderTopWidth: 10, borderBottomColor: "black", borderBottomWidth: 10 }] : [styles.column, { borderTopColor: "blue", borderTopWidth: 10, borderBottomColor: "blue", borderBottomWidth: 10 }]}>
                                            <Text style={styles.boostText}>3 {"\n"} Boosts</Text>
                                            <View />
                                            <Text style={styles.priceText}>$29.99/ea</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {typeof boostTowTruckCompany !== "undefined" && boostTowTruckCompany.length > 0 ? <Fragment><AwesomeButtonBlue style={{ marginTop: 25, marginBottom: 20 }} type={"secondary"} onPress={() => {
                                    this.getItemsTowCompanyBoost(boostTowTruckCompany);
                                }} stretch={true}>Boost My Profile!</AwesomeButtonBlue>
                                <View style={[styles.hr, { marginBottom: -10 }]} /></Fragment> : null}
                            </View>
                    </View>
                );
            } else {
                return (
                    <View style={styles.margin}>
                        <Text style={styles.noAccessText}>You do not have permission to view this page. Only <Text style={{ fontStyle: "italic", color: "darkblue" }}>tow truck companies</Text> have access to this section.</Text>
                    </View>
                );
            }
        default:
            return null;
        }
    };
    useExistingBoostTowDriver = () => {
        console.log("useExistingBoost tow driver");

        axios.post(`${Config.ngrok_url}/boost/tow/driver/using/existing/boost`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Completed logic!") {
                console.log(res.data);

                this.setState({
                    showExistingTwo: false
                }, () => {
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: `Successfully promoted your tow truck drivers!.`,
                        text2: "Successfully promoted any drivers that weren't already boosted!.",
                        visibilityTime: 4500
                    });
                })
            } else if (res.data.message === "Successfully promoted applicable drivers!") {
                console.log("err", res.data);

                this.setState({
                    showExistingTwo: false
                }, () => {
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: `Successfully promoted your tow truck drivers!.`,
                        text2: "Successfully promoted any drivers that weren't already boosted!.",
                        visibilityTime: 4500
                    });
                })
            } else if (res.data.message === "You do not have any boosts to promote your account with, please purchase some and try again.") {

                this.setState({
                    showExistingTwo: false
                }, () => {
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: `You do NOT have any remaining boosts!.`,
                        text2: "Please purchase more boosts before attempting to boost your company.",
                        visibilityTime: 4500
                    });
                })
                
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderTabBar(props) {
        return (
            <TabBar
                style={{backgroundColor: '#FFFFFF' }}
                labelStyle={{color: 'black', fontSize: 16, fontWeight: 'bold'}}
                {...props}
                indicatorStyle={{backgroundColor: 'blue', height: 2.5}}
            />
        );
    }
        
        
    render() {
        console.log("this.state. IAP - IN APP PURCHASE STATE", this.state);

        const { user } = this.state;
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Promote</Title>
                        <Subtitle>Promote your account!</Subtitle>
                    </Body>
                    <Right>
                    
                    </Right>
                </Header>
                <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
                <View>
                    <Dialog.Container visible={this.state.showExisting}>
                    <Dialog.Title>Are you sure you'd like to boost your account?</Dialog.Title>
                    <Dialog.Description>
                        Please confirm if you'd like to boost your account, You cannot undo this action.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showExisting: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.useExistingBoost();
                    }} label="BOOST ME!" />
                    </Dialog.Container>
                </View>
                <View>
                    <Dialog.Container visible={this.state.showExistingTwo}>
                    <Dialog.Title>Are you sure you'd like to boost your account?</Dialog.Title>
                    <Dialog.Description>
                        Please confirm if you'd like to boost your account, You cannot undo this action.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showExistingTwo: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.useExistingBoostTowDriver();
                    }} label="BOOST ME!" />
                    </Dialog.Container>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
                    {user !== null ? <TabView 
                        renderTabBar={this.renderTabBar}
                        tabBarPosition={"top"}
                        navigationState={{ index: this.state.index, routes: this.state.routes }}
                        onIndexChange={(index) => {
                            this.setState({ 
                                index,
                                boostTowTruckCompany: "",
                                boostMechanic: ""
                            })
                        }}
                        renderScene={this.renderScene}
                    /> :  <Fragment>
                        <SkeletonPlaceholder>
                            <View style={styles.boxPlaceholder}>

                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 10 }} />
                        <SkeletonPlaceholder>
                            <View style={{ flexDirection: "row", width }}>
                                <View style={styles.columnTwo}>

                                </View>
                                <View style={[styles.columnThree, { minHeight: 225 }]}>
                                    
                                </View>
                                <View style={styles.columnTwo}>
                                    
                                </View>
                            </View>
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 10 }} />
                        <SkeletonPlaceholder>
                            <View style={styles.boxPlaceholder}>

                            </View>
                        </SkeletonPlaceholder></Fragment>}
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, { })(PromoteAccountMainHelper);