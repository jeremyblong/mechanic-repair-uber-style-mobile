import React, { Component, Fragment } from 'react';
import { View, Dimensions, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { connect } from "react-redux";
import axios from "axios";
import { navigationRef } from "./RootNavigation.js";
import { Config } from "react-native-config";
import IntroSlider from "./components/intro/intro.js";
import SignupPageOnePage from "./pages/signup/index.js";
import VerifyCodeEmailPage from "./pages/signup/verifyEmailCode/verify.js";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateNamePasswordPage from "./pages/signup/createNamePassword/create.js";
import CreateBirthdayPage from "./pages/signup/createBirthday/create.js";
import GenderSelectionPage from "./pages/signup/gender/select.js";
import LocationCreatePage from "./pages/signup/location/index.js";
import CreateAccountTypePage from "./pages/signup/accountType/mechanicOrClient.js";
import HomepageMainPage from "./pages/homepage/index.js";
import ProfileMainPage from "./pages/account/profile/main.js";
import EditPersonalInfoPage from "./pages/account/personal/mainInfo/info.js";
import VerfiyPhoneNumberPage from "./pages/signup/phone/verify.js";
import SigninPage from "./pages/signin/signin.js";
import EmergencyContactHomePage from "./pages/account/emergency/contact/index.js";
import PaymentMainPage from "./pages/account/payments/index.js";
import EditPaymentMethodsPage from "./pages/account/payments/paymentMethods/index.js";
import PaymentCardAddNewPage from "./pages/account/payments/create/paymentCardCreate.js";
import AddCardPage from "./pages/account/payments/create/addCard.js";
import IndividualCreditDebitCardPage from "./pages/account/payments/paymentMethods/individual/index.js";
import CreditsHomepagePage from "./pages/account/payments/credits/index.js";
import ViewPublicProfilePage from "./pages/account/profile/public/profile/publicProfile.js";
import MessagingConversationsPage from "./pages/messaging/conversations/index.js";
import IndividualBrokenVehiclePage from "./pages/listings/vehicles/individual/index.js";
import MapViewAllListingsPage from "./pages/listings/main.js";
import GetLocation from 'react-native-get-location';
import { gatherLocationOnLoad } from "./actions/location/location.js";
import MechanicListingPage from "./pages/listings/mechanics/mechanicListing.js";
import HomepageListingsCreatePage from "./pages/listings/create/clients/create/main/index.js";
import PreviewStepsBrokenVehicleListingPage from "./pages/listings/create/clients/create/preview/index.js";
import PageOneVehicleFormPage from "./pages/listings/create/clients/create/one/index.js";
import LocationDetailsListVehiclePage from "./pages/listings/create/clients/create/location/index.js";
import UploadPhotosVehicleListingPage from "./pages/listings/create/clients/create/photos/index.js";
import AvailablityCreationPage from "./pages/listings/create/clients/create/avaliability/index.js";
import PricingAdjustmentPage from "./pages/listings/create/clients/create/pricing/index.js";
import NotificationsPage from "./pages/notifications/index.js";
import CategoriesMainPage from "./pages/categories/index.js";
import IndividualMessagingPage from "./pages/messaging/individual/individual.js";
import PreviewListingViewPage from "./pages/listings/create/preview/preview.js";
import io from 'socket.io-client';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { checkToNavigatePushNotification } from "./actions/push-notifications/push.js";
import ProposalsListPage from "./pages/proposals/list/index.js";
import IndividualProposalViewPage from "./pages/proposals/individual/individual.js";
import ActiveJobsMainPage from "./pages/activeRepairs/main/index.js";
import ViewIndividualJobPage from "./pages/activeRepairs/individual/viewJob.js";
import ManageActiveRepairPage from "./pages/activeRepairs/manage/manageActiveRepair.js";
import PaypalMenuPage from "./pages/account/payments/paypal/paypalMenu.js";
import ApprovalWebLinkPage from "./pages/activeRepairs/webViews/approvalWebLink.js";
import UserInactivity from 'react-native-user-inactivity';
import { authenticated, finishedSignup } from "./actions/signup/auth.js";
import { sendbirdLogin } from "./actions/sendbird/user.js";
import { switchAccountType } from "./actions/accountType/type.js";
import Unauthorized from "./components/unauthorized.js";
import _ from "lodash";
import OrderDetailsPaypalPaymentPage from "./pages/activeRepairs/orderDetails/details.js";
import RoadsideAssistanceLandingPage from "./pages/roadsideAssistance/main/roadsideLanding.js";
import CreateListingMainPage from "./pages/roadsideAssistance/createListing/main/index.js";
import RoadsideAssistanceAddressPage from "./pages/roadsideAssistance/createListing/create/address/address.js";
import PreviewRoadsideAssistancePage from "./pages/roadsideAssistance/createListing/create/preview/preview.js";
import CredentialsCreatePage from "./pages/roadsideAssistance/createListing/create/credentials/creds.js";
import ManageListingsRoadsideAssistancePage from "./pages/roadsideAssistance/manage/main.js";
import RoadsideAssistanceInsuranceFormPage from "./pages/roadsideAssistance/createListing/create/insurance/index.js";
import GeneralInfoRoadsideAssistanceCreatePage from "./pages/roadsideAssistance/createListing/create/general/generalInfo.js";
import PricingRoadsideAssistanceListingPage from "./pages/roadsideAssistance/createListing/create/pricing/pricing.js";
import TowVehicleDetailsRoadsideAssistancePage from "./pages/roadsideAssistance/createListing/create/towTruckInfo/towVehicle.js";
import BackgroundGeolocation from "react-native-background-geolocation";
import StartTwoServicesOnePage from "./pages/roadsideAssistance/initiateTow/startTow/startOne.js";
import AssociateDriverPage from "./pages/signup/associate/associateDriver.js";
import TowCompanyManageDriversPage from "./pages/towCompany/manage/index.js";
import WaitingRoomRoadsideAssistancePage from "./pages/roadsideAssistance/initiateTow/waitingRoom/wait.js";
import TowTruckDriverHomepagePage from "./pages/towTruckDriver/homepage/index.js";
import ListQueuePage from "./pages/towTruckDriver/listQueue/listQueue.js";
import ManageActiveJobClaimPage from "./pages/towTruckDriver/activeClaim/active.js";
import ActiveProposalRoadsideAssistanceInProgressPage from "./pages/roadsideAssistance/active/activeClaim.js";
import IndividualListingTowCompanyPage from "./pages/roadsideAssistance/individual/index.js";
import ManageActiveJobRoadsideAssistanceManageJobPage from "./pages/towTruckDriver/manage/manageActiveJob.js";
import ManageUponArrivalDeparturePage from "./pages/roadsideAssistance/manage/manageUponArrival/manageUponArrival.js";
import AssociateWithTowCompanyPage from "./pages/towTruckDriver/associateTowCo/associate.js";
import Modal from 'react-native-modal';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import ReviewRoadsideAssistanceAgentPage from "./pages/roadsideAssistance/review/reviewRoadsideAgent/review.js";
import ReviewRoadsideAssistanceClientPage from "./pages/towTruckDriver/reviewClient/reviewClient.js";
import SubscriptionPlansSelectionPage from "./pages/signup/subscriptionPlans/subscription.js";
import VerifyAndValidateAccountStripePage from "./pages/account/verify/verifyAccount.js";
import ReviewMechanicFixedVehiclePage from "./pages/activeRepairs/reviews/mechanic/review.js";
import ReviewClientFixedVehicleHelper from "./pages/activeRepairs/reviews/client/review.js";
import PayoutsHomepagePage from "./pages/account/payments/payouts/index.js";
import PayoutMethodAddNewPayoutPage from "./pages/account/payments/payouts/addNew/addNewPayoutMethod.js";
import BankTransferBeginPage from "./pages/account/payments/payouts/addNew/bankTransfer/index.js";
import BankAccountInfoPage from "./pages/account/payments/payouts/addNew/bankInfo/index.js";
import PayoutsManageOptionsMainPage from "./pages/account/payments/payouts/options/main.js";
import PaymentAnalyticsDashboardPage from "./pages/account/payments/payouts/analytics/index.js";
import ReferralSystemMainPage from "./pages/referral/main.js";
import PromoteAccountMainPage from "./pages/promote/main.js";
import LeaveFeedbackMechanic2DayPage from "./pages/account/feedback/leaveFeedback.js";
import SearchMechanicsPage from "./pages/mechanics/main/searchMechanics.js";
import PromotionsMainHomepagePage from "./pages/promotions/main/main.js";
import DriversHomepagePage from "./pages/drivers/main/index.js";
import MapView, { Marker } from 'react-native-maps';
import { saveUsersLocation } from "./actions/location/location.js";
import geodist from "geodist";
import NoTowConfirmOnSitePage from "./pages/towTruckDriver/noTowRequiredComplete/confirm.js";
import AdditionalMechanicInformationMainPage from "./pages/account/additionalMechanicInfo/main.js";

const { width, height } = Dimensions.get("window");

const Stack = createStackNavigator();

const socket = io(Config.ngrok_url, {transports: ['websocket', 'polling', 'flashsocket']});


class App extends Component {
constructor(props) {
  super(props);
  

  this.state = {
    count: 0,
    showModalOne: false,
    interval: 0,
    company_informtion: null,
    selected: null,
    fullName: "",
    ready: false,
    price: 0,
    lengthInMeters: 0,
    tow_driver_id: "",
    showCompletionModal: false,
    fullUserName: "",
    showAlertCustom: false,
    user: null,
    tow_destination_full: null,
    user_current_location: null,
    tow_needed: false,
    requestee: "",
    showResponseModal: false,
    listing: null,
    is_tow_required: false,
    tow_destination_full_other_user: null,
    user_current_location_other_user: null,
    distanceInMeters: 0,
    tow_driver_id_roadside: "",
    service_required: null,
    tow_required: null,
    roadside_service: null
  }
}

  getStartingPage = () => {
    console.log("this.props.finsihed", this.props.finished);
    if (this.props.finished === true) {
      return "homepage-main";
    } else {
      if (this.props.page) {
        switch (this.props.page) {
          case 1:
            return "homepage-main";
            break;
          case 2: 
            return "email-verifcation-code";
            break;
          case 3: 
            return "create-name-password";
            break;
          case 4: 
            return "create-birthday";
            break;
          case 5: 
            return "gender-selection";
            break;
          case 6: 
            return "location-create";
            break;
          case 7: 
            return "mechanic-or-client";
            break;
          case 8: 
            return "homepage-main";
            break;
          default:
            return "homepage";
            break;
        }
      } else {
        return "intro";
      }
    }
  }
  handleWalkingUpdate = (location) => {
    console.log("walking", location);
  }
  handleDrivingLocationUpdate = (location) => {
    console.log("handleDrivingLocationUpdate", location);

    axios.post(`${Config.ngrok_url}/update/location/geo`, {
      id: this.props.unique_id,
      location
    }).then((res) => {
      if (res.data.message === "Successfully updated location") {
        console.log(res.data);

        this.setState({
          count: 0
        })
      } else {
        console.log("err", res.data);
        this.setState({
          count: 0
        })
      }
    }).catch((err) => {
      console.log(err);

      this.setState({
        count: 0
      })
    })

    if (this.state.count >= 10) {
      this.setState({
        count: 0
      })
    }
  }
  //  componentWillUnmount() {
  //     BackgroundGeolocation.removeListeners();
  // }
  onLocation = (location) => {
    console.log('[location] -', location);

    console.log(location.coords.speed);

    if (this.props.unique_id !== null) {
      this.setState((prevState, props) => ({
        count: prevState.count + 1
      }), () => {
        if (this.state.count >= 10) {
          this.setState({
            count: 0
          })
        } else {
          if (location.coords.speed < 4) {
            // run only every 12 cycles
            console.log("run only every 4 cycles")
            if (this.state.count === 4) {

              this.props.saveUsersLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              })

              this.handleDrivingLocationUpdate(location);
            }
          } else if (4 <= location.coords.speed && location.coords.speed <= 9) {
            // run only every 9 cycles
              console.log("run only every 5 cycles")
            if (this.state.count === 5) {

              this.props.saveUsersLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              })

              this.handleDrivingLocationUpdate(location);
            }
          } else if (10 <= location.coords.speed && location.coords.speed <= 15) {
            console.log("run only every 6 cycles")
            if (this.state.count === 6) {

              this.props.saveUsersLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              })

              this.handleDrivingLocationUpdate(location);
            }
            // run only every 8 cycles
          } else if (16 <= location.coords.speed && location.coords.speed <= 25) {
            console.log("run only every 7 cycles")
            // run only every 6 cycles
            if (this.state.count === 7) {

              this.props.saveUsersLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              })

              this.handleDrivingLocationUpdate(location);
            }
          } else {
            console.log("run only every 8 cycles", this.state.count);
    
            if (this.state.count === 8) {

              this.props.saveUsersLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              })

              this.handleDrivingLocationUpdate(location);
            }
            // run only every 4 cycles
          }
        }
      });
    }
  }
  onError = (error) => {
    console.warn('[location] ERROR -', error);
  }
  onActivityChange = (event) => {
    console.log('[activitychange] -', event);  // eg: 'on_foot', 'still', 'in_vehicle'

    switch (event.activity) {
      case "still": 
        // do nothing
        this.setState({
          interval: 0
        })
        break;
      case "on_foot":
        this.setState({
          interval: 8
        })
        break;
      case "in_vehicle": 
        this.setState({
          interval: 4
        })
      default:
        break;
    }
  }
  onProviderChange = (provider) => {
    console.log('[providerchange] -', provider.enabled, provider.status);
  }
  onMotionChange = (event) => {
    console.log('[motionchange] -', event.isMoving, event.location);
  }
  async componentDidMount () {

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.onLocation(this.onLocation, this.onError);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.onMotionChange(this.onMotionChange);

    // This event fires when a change in motion activity is detected
    BackgroundGeolocation.onActivityChange(this.onActivityChange);

    // This event fires when the user toggles location-services authorization
    BackgroundGeolocation.onProviderChange(this.onProviderChange);

    ////
    // 2.  Execute #ready method (required)
    //
    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: 'http://yourserver.com/locations',
      batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
      headers: {              // <-- Optional HTTP headers
        "X-FOO": "bar"
      },
      params: {               // <-- Optional HTTP params
        "auth_token": "maybe_your_server_authenticates_via_token_YES?"
      }
    }, (state) => {
      
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        ////
        // 3. Start tracking!
        //
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });

    const fcmToken = await messaging().getToken();

    /* Success */
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("Notification when app is on foreground", remoteMessage);

      Toast.show({
        text1: remoteMessage.notification.title,
        text2: remoteMessage.notification.body,
        visibilityTime: 6500,
        type: "success"
      });
    });

    /* Success */
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage);

      // this.props.navigation.navigate(remoteMessage.data.dl);
      this.props.checkToNavigatePushNotification({
        redirect: true,
        route: remoteMessage.data.dl
      })
    });

    /* Success */
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage);
      }
    });
    
    GetLocation.getCurrentPosition({
			enableHighAccuracy: true,
			timeout: 15000,
		})
		.then(location => {
			console.log("location :", location);

			this.props.gatherLocationOnLoad(location);
		})
		.catch(error => {
			const { code, message } = error;
			console.warn(code, message);
		})
  }
  calculateRouteLogic = () => {
    if (typeof this.props.authenticateddd !== "undefined" && this.props.authenticateddd !== null && Object.keys(this.props.authenticateddd).length > 0 && !_.has(this.props.authenticateddd, "page")) {
      return true;
    } else {
      return false;
    }
  }
  
  renderSockets = () => {
    socket.on("delivered", (data) => {
        if (data.delivered === true && data.user_id === this.props.unique_id) {

            console.log("delivered!!!!!");

            this.setState({
              showModalOne: true
            })
        }
    })
    socket.on("arrived", (data) => {
      if (data.approved === true && data.user_id === this.props.unique_id) {

          console.log("approved!!!!!");

          this.navigationRef.navigate("settings-active-roadside-assistance-manage");
      }
    })
    socket.on("complete", (data) => {
      if (data.complete === true && data.user_id === this.props.unique_id) {

          console.log("completed!!!!!");

          this.setState({
            showModalTwo: true
          })
      }
  })
  socket.on("redirect", (data) => {
    if (data.redirect === true && data.user_id === this.props.unique_id) {
      this.navigationRef.navigate("review-roadside-assistance-agent", null);
    }
  })
  socket.on("redirect-agent", (data) => {
    if (data.redirect === true && data.user_id === this.props.unique_id) {
      this.navigationRef.navigate("review-roadside-assistance-client", null);
    }
  })
  socket.on("start", (data) => {
    if (data.started === true && data.user_id === this.props.unique_id) {
      this.navigationRef.navigate("tow-activated-map-view", null);
    }
  })
  socket.on("start-personalized", (data) => {
    if (data.user_id === this.props.unique_id) {
      this.navigationRef.navigate("tow-activated-map-view", null);
    }
  })
  socket.on("completed-repair-client", (data) => {
    if (data.approved === true && data.user_id === this.props.unique_id) {
      this.navigationRef.navigate("broken-vehicle-review-client", { agreement: data.item });
    }
  })
  socket.on("completed-repair-mechanic", (data) => {
    if (data.approved === true && data.user_id === this.props.unique_id) {
      this.navigationRef.navigate("broken-vehicle-review-mechanic", { agreement: data.item });
    }
  })
  socket.on("no-tow-end", (data) => {
    if (data.user_id === this.props.unique_id && data.approved === true) {
      console.log("no tow - data", data);

      this.navigationRef.navigate("complete-trip-no-tow", null);
    }
  })
  socket.on("tow-rates", (data) => {
    if (data.other_user === this.props.unique_id) {
      console.log("MATCH", data);

      if (data.tow_needed === true) {
        if (_.has(data.user_current_location, "accuracy")) {
          this.setState({
            listing: data.listing,
            showResponseModal: true,
            is_tow_required: data.tow_needed,
            tow_destination_full_other_user: data.tow_destination_full,
            user_current_location_other_user: data.user_current_location,
            distanceInMeters: geodist({ lat: data.user_current_location.latitude, lon: data.user_current_location.longitude }, { lat: data.tow_destination_full.position.lat, lon: data.tow_destination_full.position.lon }, { unit: "meters" }),
            tow_driver_id_roadside: data.tow_driver_id
          })
        } else {
          this.setState({
            listing: data.listing,
            showResponseModal: true,
            is_tow_required: data.tow_needed,
            tow_destination_full_other_user: data.tow_destination_full,
            user_current_location_other_user: data.user_current_location,
            distanceInMeters: geodist({ lat: data.tow_destination_full.position.lat, lon: data.tow_destination_full.position.lon }, { lat: data.user_current_location.position.lat, lon: data.user_current_location.position.lon }, { unit: "meters" }),
            tow_driver_id_roadside: data.tow_driver_id
          })
        }
      } else {
        this.setState({
          listing: data.listing,
          showResponseModal: true,
          is_tow_required: data.tow_needed,
          user_current_location_other_user: data.user_current_location,
          tow_driver_id_roadside: data.tow_driver_id,
          service_required: data.service_required
        })
      }
    }
  })
  socket.on("start-specific-tow", (data) => {
    if (data.receiver === this.props.unique_id) {

      console.log("start-specific-tow DATA", data);

      this.setState({
        showAlertCustom: true,
        user: data.user,
        requestee: data.requestee,
        tow_destination_full: data.tow_destination_full,
        user_current_location: data.user_current_location,
        tow_needed: data.tow_needed,
        service_required: data.service_required
      })
    }
  })
  socket.on("completed-partial", (data) => {
    if (data.notify === true && data.user_id === this.props.unique_id) {
      this.setState({
        showCompletionModal: true,
        fullUserName: data.fullName
      })
    }
  })
  socket.on("invite", (data) => {
    if (data.user_id === this.props.unique_id) {
      console.log("data data data", data);

      setTimeout(() => {
        this.setState({
          selected: data.selected,
          fullName: data.fullName,
          lengthInMeters: data.lengthInMeters,
          company_informtion: data.company_informtion,
          tow_driver_id: data.tow_driver_id,
          showProposalModal: true,
          roadside_service: data.selected.roadside_service_required,
          ready: true,
          tow_required: data.selected.tow_required
        })
      }, 2000);
    }
  })
  socket.on("fire-off", (data) => {
    if (data.approved === true && data.user_id === this.props.unique_id) {
      this.navigationRef.navigate("driver-has-arrived-manage-listing-depatarture", null);
    }
  })
}
  calculateReadiness = () => {
    const { ready } = this.state;
    
    if (ready === true) {
      return true;
    } else {
      return false;
    }
  }
  renderModalContent = () => {
    const { selected, company_informtion } = this.state;

    if (selected.tow_required === false) {
      switch (selected.roadside_service_required) {
          case "door-unlocking":
              return (
                <Fragment>
                  <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${company_informtion.services.unlock_locked_door_cost}</Text>
                </Fragment>
              );
              break;
          case "gas-delivery":
            return (
              <Fragment>
                <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${company_informtion.services.gas_delivery_cost}</Text>
              </Fragment>
            );
            break;
          case "tire-change": 
            return (
              <Fragment>
                <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${company_informtion.services.change_tire_cost}</Text>
              </Fragment>
            );
            break;
          case "stuck-vehicle":
            return (
              <Fragment>
                <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${company_informtion.services.remove_stuck_vehicle}</Text>
              </Fragment>
            );
            break;
          case "jump-start":
            return (
              <Fragment>
                <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${company_informtion.services.jumpstart_cost}</Text>
              </Fragment>
            );
            break;
          default:
              break;
      }
    } else {
      return (
        <Fragment>
          <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${company_informtion.standard_tow_fees.tow_price} flat rate</Text>
          <Text style={{ textAlign: "center" }}>+ Plus +</Text>
          <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${((this.state.lengthInMeters / 1609.34) * company_informtion.standard_tow_fees.per_mile_fee).toFixed(2)} in milage</Text>
        </Fragment>
      );
    }
  }
  renderModalContentCustomOne = () => {
    const { is_tow_required, service_required, listing } = this.state;

    if (listing !== null) {

      console.log("LISTING RAN!");

      if (is_tow_required === false) {
        switch (service_required) {
            case "door-unlocking":
                return (
                  <Fragment>
                    <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${listing.services.unlock_locked_door_cost}</Text>
                  </Fragment>
                );
                break;
            case "gas-delivery":
              return (
                <Fragment>
                  <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${listing.services.gas_delivery_cost}</Text>
                </Fragment>
              );
              break;
            case "tire-change": 
              return (
                <Fragment>
                  <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${listing.services.change_tire_cost}</Text>
                </Fragment>
              );
              break;
            case "stuck-vehicle":
              return (
                <Fragment>
                  <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${listing.services.remove_stuck_vehicle}</Text>
                </Fragment>
              );
              break;
            case "jump-start":
              return (
                <Fragment>
                  <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${listing.services.jumpstart_cost}</Text>
                </Fragment>
              );
              break;
            default:
                break;
        }
      } else {
        return (
          <Fragment>
            <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${listing.standard_tow_fees.tow_price} flat rate</Text>
            <Text style={{ textAlign: "center" }}>+ Plus +</Text>
            <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${((this.state.distanceInMeters / 1609.34) * listing.standard_tow_fees.per_mile_fee).toFixed(2)} in milage</Text>
          </Fragment>
        );
      }
    } else {
      console.log("listing is null.");
    }
  }
  handleRedirectAndProcessPriceCalc = () => {
    const { lengthInMeters, company_informtion, selected, fullName, tow_driver_id, roadside_service } = this.state;

    console.log("handleRedirectAndProcessPriceCalc clicked");

    axios.post(`${Config.ngrok_url}/start/active/job/roadside/assistance/accepted/proposal`, {
      length_in_meters: lengthInMeters,
      company_informtion,
      selected,
      fullName,
      tow_driver_id,
      client_id: this.props.unique_id,
      tow_required: this.state.tow_required,
      roadside_service
    }).then((res) => {
      if (res.data.message === "Successfully executed logic!") {
        console.log(res.data);

        socket.emit("started-active-tow", {
            started: true,
            user_id: tow_driver_id
        })

        setTimeout(() => {
          this.navigationRef.navigate("in-progress-roadside-assistance");
        }, 1000)
      } else {
        console.log(res.data);
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  declineOffer = () => {
    console.log("declineOffer clicked");

    axios.post(`${Config.ngrok_url}/decline/roadside/assistance/offer`, {
      client_id: this.props.unique_id,
      tow_driver_id: this.state.tow_driver_id
    }).then((res) => {
      if (res.data.message === "Successfully declined offer!") {
        console.log(res.data);
      } else {
        console.log(res.data);
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  calculateReadinessUser = () => {
    const { user } = this.state;

    if (user !== null) {
      return true;
    } else {
      return false;
    }
  }
  handleRedirectAndProcessPriceCalcRoadside = () => {
    console.log("handleRedirectAndProcessPriceCalcRoadside clicked.");

    axios.post(`${Config.ngrok_url}/gather/associated/company/rates`, {
      id: this.props.company_id,
      company_name: this.props.company_name
    }).then((res) => {
      if (res.data.message === "Successfully located tow company rates!") {
        console.log(res.data);

        const { listing } = res.data;

        socket.emit("send-tow-rates", {
            listing,
            other_user: this.state.requestee,
            tow_needed: this.state.tow_needed,
            requestee: this.state.requestee,
            tow_destination_full: this.state.tow_destination_full,
            user_current_location: this.state.user_current_location,
            tow_driver_id: this.props.unique_id,
            service_required: this.state.service_required
        });
      } else {
        console.log("err", res.data);
      }
    }).catch((err) => {
      console.log(err);
    })

    // axios.post(`${Config.ngrok_url}/start/roadside/assistance/claim/two`, {
    //   length_in_meters: lengthInMeters,
    //   company_informtion,
    //   selected,
    //   fullName,
    //   tow_driver_id,
    //   client_id: this.props.unique_id
    // }).then((res) => {
    //   if (res.data.message === "Successfully executed logic!") {
    //     console.log(res.data);

    //     socket.emit("started-active-tow", {
    //         started: true,
    //         user_id: user.unique_id
    //     })

    //     setTimeout(() => {
    //       this.navigationRef.navigate("in-progress-roadside-assistance");
    //     }, 1000)
    //   } else {
    //     console.log(res.data);
    //   }
    // }).catch((err) => {
    //   console.log(err);
    // })

    // setTimeout(() => {
    //   this.navigationRef.navigate("in-progress-roadside-assistance");
    // }, 1000)
  }
  declineOfferTowRoadside = () => {
    console.log("declineOfferTowRoadside clicked.");
  }
  renderInternalContent = () => {
    const { listing, is_tow_required } = this.state;

    if (listing !== null) {
      return (
        <Fragment>
          <Text style={styles.postDescription}>
              Changing a tire: <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>${listing.services.change_tire_cost}{"\n"}</Text>
              Gas Delivery: <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>${listing.services.gas_delivery_cost}{"\n"}</Text>
              Jumpstart: <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>${listing.services.jumpstart_cost}{"\n"}</Text>
              Remove Stuck Vehicle: <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>${listing.services.remove_stuck_vehicle}{"\n"}</Text>
              Unlock Door(s): <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>${listing.services.unlock_locked_door_cost}{"\n"}</Text>
          </Text>
          
          <View style={styles.hr} />
          {is_tow_required === true ? <Fragment><Text style={styles.postTitle}>
              Standard Flat Rate {"\n"}<Text style={{ color: "darkblue", fontWeight: "bold" }}>${listing.standard_tow_fees.tow_price.toString()}</Text>
          </Text>
          <View style={styles.hr} />
          <Text style={styles.postTitle}>
              Price Per Mile {"\n"}<Text style={{ color: "darkblue", fontWeight: "bold" }}>${listing.standard_tow_fees.per_mile_fee.toString()}</Text> 
          </Text>
          <View style={styles.hr} /></Fragment> : null}

          <Text style={styles.date}>
            Joined {listing.date}
          </Text>

          <View style={styles.profile}>
            <Image style={styles.avatar}
              source={{uri: listing.company_image }}/>

            <Text style={styles.name}>
                <Text style={{ textDecorationLine: "underline" }}>Driver</Text> {"\n"}{"Jeremy Blong"}
            </Text>
          </View>
        </Fragment>
      );
    }
  }
  renderModalContentCustom = () => {

    const { user, tow_destination_full, user_current_location, tow_needed } = this.state;
    if (tow_needed === true) {
      if (_.has(user_current_location, "position")) {
        return (
          <Fragment>
              <MapView
                style={{ width: "100%", height: 225, minHeight: 225, marginTop: 15 }}
                initialRegion={{
                  latitude: user_current_location.position.lat,
                  longitude: user_current_location.position.lon,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              > 
                <Marker 
                  coordinate={{ latitude: user_current_location.position.lat, longitude: user_current_location.position.lon }} title={"Requesting user's location..."} description={"The requesting user is located here."} />
              </MapView>  
              <View style={styles.hr} />
              <Text style={{ fontSize: 18 }}><Text style={{ fontWeight: "bold", fontSize: 18 }}>User requires tow or just roadside assistance?</Text> {tow_needed === true ? "Requires-tow" : "No tow needed - just roadside assistance."}</Text>
              <Text style={{ fontSize: 18 }}><Text style={{ fontWeight: "bold", fontSize: 18 }}>Tow Destination</Text>: {tow_destination_full.address.freeformAddress}</Text>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
              <MapView
                style={{ width: "100%", height: 225, minHeight: 225, marginTop: 15 }}
                initialRegion={{
                  latitude: user.current_location.coords.latitude,
                  longitude: user.current_location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              > 
                <Marker 
                  coordinate={{ latitude: user.current_location.coords.latitude, longitude: user.current_location.coords.longitude }} title={"Requesting user's location..."} description={"The requesting user is located here."} />
              </MapView>  
              <View style={styles.hr} />
              <Text style={{ fontSize: 18 }}><Text style={{ fontWeight: "bold", fontSize: 18 }}>User requires tow or just roadside assistance?</Text> {tow_needed === true ? "Requires-tow" : "No tow needed - just roadside assistance."}</Text>
              <Text style={{ fontSize: 18 }}><Text style={{ fontWeight: "bold", fontSize: 18 }}>Tow Destination</Text>: {tow_destination_full.address.freeformAddress}</Text>
          </Fragment>
        );
      }
    } else {
      if (_.has(user_current_location, "position")) {
        return (
          <Fragment>
              <MapView
                style={{ width: "100%", height: 225, minHeight: 225, marginTop: 15 }}
                initialRegion={{
                  latitude: user_current_location.position.lat,
                  longitude: user_current_location.position.lon,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              > 
                <Marker 
                  coordinate={{ latitude: user_current_location.position.lat, longitude: user_current_location.position.lon }} title={"Requesting user's location..."} description={"The requesting user is located here."} />
              </MapView>  
              <View style={styles.hr} />
              <Text style={{ fontSize: 18 }}><Text style={{ fontWeight: "bold", fontSize: 18 }}>User requires tow or just roadside assistance?</Text> {tow_needed === true ? "Requires-tow" : "No tow needed - just roadside assistance."}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>This request does NOT required a tow - just roadside assistance</Text>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
              <MapView
                style={{ width: "100%", height: 225, minHeight: 225, marginTop: 15 }}
                initialRegion={{
                  latitude: user.current_location.coords.latitude,
                  longitude: user.current_location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              > 
                <Marker 
                  coordinate={{ latitude: user.current_location.coords.latitude, longitude: user.current_location.coords.longitude }} title={"Requesting user's location..."} description={"The requesting user is located here."} />
              </MapView>  
              <View style={styles.hr} />
              <Text style={{ fontSize: 18 }}><Text style={{ fontWeight: "bold", fontSize: 18 }}>User requires tow or just roadside assistance?</Text> {tow_needed === true ? "Requires-tow" : "No tow needed - just roadside assistance."}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>This request does NOT required a tow - just roadside assistance</Text>
          </Fragment>
        );
      }
    }
  }
  confirmTowAndStart = () => {
    console.log("confirmTowAndStart clicked");

    const { listing, distanceInMeters, tow_destination_full_other_user, user_current_location_other_user, is_tow_required, tow_driver_id_roadside } = this.state;

    axios.post(`${Config.ngrok_url}/start/roadside/assistance/claim/two`, {
      milage_price: ((distanceInMeters / 1609.34) * listing.standard_tow_fees.per_mile_fee).toFixed(2),
      flat_rate: listing.standard_tow_fees.tow_price,
      company_informtion: listing,
      tow_destination_full: tow_destination_full_other_user,
      current_location: user_current_location_other_user,
      is_tow_required,
      client_id: this.props.unique_id,
      tow_driver_id: tow_driver_id_roadside,
      fullName: this.props.fullName
    }).then((res) => {
      if (res.data.message === "Successfully executed logic!") {
        console.log(res.data);

        socket.emit("started-active-tow-personalized", {
          user_id: tow_driver_id_roadside
        })

        setTimeout(() => {
          this.navigationRef.navigate("in-progress-roadside-assistance");
        }, 2000);
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  render () {
    console.log("this.state APP.js", this.state);
    const { selected, company_informtion, user, listing } = this.state;
    return (
      <>
        <View style={{ flex: 1 }}> 
        <UserInactivity
						timeForInactivity={3600000}
						onAction={isActive => { 
							console.log("isActive", isActive); 

              if (isActive === false) {
                if (typeof this.props.authenticateddd !== 'undefined' && this.props.authenticateddd !== null && Object.keys(this.props.authenticateddd).length > 0) {
                  console.log("signout.");

                  this.props.authenticated({});
                  // this.props.finishedSignup(false);
                  this.props.sendbirdLogin({ userId: null, nickname: null });
                  this.props.switchAccountType({
                      type: "CLIENT"
                  })
                } else {
                  console.log("already logged out.");
                }
              } 
						}}
            style={{ flex: 1 }}
					>
          <NavigationContainer ref={(ref) => this.navigationRef = ref}> 
            <Stack.Navigator screenOptions={{
                headerShown: false
              }} initialRouteName={this.getStartingPage()}>
              <Stack.Screen name="intro" component={IntroSlider} />
              <Stack.Screen name="homepage" component={SignupPageOnePage} />
              <Stack.Screen name="email-verification-code" component={VerifyCodeEmailPage} />
              <Stack.Screen name="phone-number-verification-code" component={VerfiyPhoneNumberPage} />
              <Stack.Screen name="create-name-password" component={CreateNamePasswordPage} />
              <Stack.Screen name="create-birthday" component={CreateBirthdayPage} />
              <Stack.Screen name="gender-selection" component={GenderSelectionPage} />
              <Stack.Screen name="location-create" component={LocationCreatePage} />
              <Stack.Screen name="mechanic-or-client" component={CreateAccountTypePage} />
              <Stack.Screen name="homepage-main" component={HomepageMainPage} />
              <Stack.Screen name="profile-main" component={ProfileMainPage} />
              <Stack.Screen name="personal-info" component={EditPersonalInfoPage} />
              <Stack.Screen name="sign-in" component={SigninPage} />
              <Stack.Screen name="emergency-contact-home" component={EmergencyContactHomePage} />
              <Stack.Screen name="payments-main" component={PaymentMainPage} />
              <Stack.Screen name="payments-cards" component={EditPaymentMethodsPage} />
              <Stack.Screen name="add-payment-card" component={PaymentCardAddNewPage} />
              <Stack.Screen name="create-payment" component={AddCardPage} /> 
              <Stack.Screen name="view-individual-card-info" component={IndividualCreditDebitCardPage} />
              <Stack.Screen name="credits-coupons" component={CreditsHomepagePage} />
              <Stack.Screen name="view-public-profile-page" component={ViewPublicProfilePage} />
              <Stack.Screen name="chat-conversations" component={this.calculateRouteLogic() ? MessagingConversationsPage : Unauthorized} />
              <Stack.Screen name="individual-broken-listing" component={IndividualBrokenVehiclePage} />
              <Stack.Screen name="broken-vehicles-map" component={MapViewAllListingsPage} />
              <Stack.Screen name="mechanic-for-hire-individual" component={MechanicListingPage} />
              <Stack.Screen name="providers-listing-homepage" component={HomepageListingsCreatePage} />
              <Stack.Screen name="list-vehicle-start" component={PreviewStepsBrokenVehicleListingPage} />
              <Stack.Screen name="create-vehicle-listing-one" component={PageOneVehicleFormPage} />
              <Stack.Screen name="create-vehicle-listing-two" component={LocationDetailsListVehiclePage} />
              <Stack.Screen name="create-vehicle-listing-three" component={UploadPhotosVehicleListingPage} />
              <Stack.Screen name="create-vehicle-listing-four" component={AvailablityCreationPage} />
              <Stack.Screen name="create-vehicle-listing-five" component={PricingAdjustmentPage} />
              <Stack.Screen name="notifications" component={NotificationsPage} />
              <Stack.Screen name="categories-main" component={CategoriesMainPage} />
              <Stack.Screen name="messages-individual" component={IndividualMessagingPage} />
              <Stack.Screen name="view-preview-listing-vehicle" component={PreviewListingViewPage} />
              <Stack.Screen name="proposals" component={ProposalsListPage} />
              <Stack.Screen name="proposals-individual-view" component={IndividualProposalViewPage} />
              <Stack.Screen name="active-jobs" component={this.calculateRouteLogic() ? ActiveJobsMainPage : Unauthorized} />
              <Stack.Screen name="view-individual-agreement" component={ViewIndividualJobPage} />
              <Stack.Screen name="edit-manage-listing-booked" component={ManageActiveRepairPage} />
              <Stack.Screen name="create-payment-paypal" component={PaypalMenuPage} />
              <Stack.Screen name="paypal-web-view-one" component={ApprovalWebLinkPage} />
              <Stack.Screen name="paypal-view-order-details" component={OrderDetailsPaypalPaymentPage} />
              <Stack.Screen name="roadside-assistance-main-landing" component={RoadsideAssistanceLandingPage} />
              <Stack.Screen name="advertise-roadside-assistance-main" component={CreateListingMainPage} />
              <Stack.Screen name="advertise-create-address" component={RoadsideAssistanceAddressPage} />
              <Stack.Screen name="advertise-create-address-preview" component={PreviewRoadsideAssistancePage} />
              <Stack.Screen name="roadside-assistance-create-credentials" component={CredentialsCreatePage} />
              <Stack.Screen name="roadside-assistance-display-listings" component={ManageListingsRoadsideAssistancePage} />
              <Stack.Screen name="roadside-assistance-insurance-details" component={RoadsideAssistanceInsuranceFormPage} />
              <Stack.Screen name="roadside-assistance-general-data" component={GeneralInfoRoadsideAssistanceCreatePage} />
              <Stack.Screen name="roadside-assistance-pricing" component={PricingRoadsideAssistanceListingPage} />
              <Stack.Screen name="roadside-assistance-vehicle-information-tow" component={TowVehicleDetailsRoadsideAssistancePage} />
              <Stack.Screen name="initialize-tow-two" component={StartTwoServicesOnePage} />
              <Stack.Screen name="associate-to-tow-company" component={AssociateDriverPage} />
              <Stack.Screen name="manage-tow-drivers" component={TowCompanyManageDriversPage} />
              <Stack.Screen name="waiting-room-roadside-assistance" component={WaitingRoomRoadsideAssistancePage} />
              <Stack.Screen name="tow-truck-driver-online-homepage" component={TowTruckDriverHomepagePage} />
              <Stack.Screen name="list-roadside-assistance-queue" component={ListQueuePage} />
              <Stack.Screen name="tow-activated-map-view" component={ManageActiveJobClaimPage} />
              <Stack.Screen name="in-progress-roadside-assistance" component={ActiveProposalRoadsideAssistanceInProgressPage} />
              <Stack.Screen name="individual-listing-tow-company" component={IndividualListingTowCompanyPage} />
              <Stack.Screen name="settings-active-roadside-assistance-manage" component={ManageActiveJobRoadsideAssistanceManageJobPage} />
              <Stack.Screen name="driver-has-arrived-manage-listing-depatarture" component={ManageUponArrivalDeparturePage} />
              <Stack.Screen name="associate-with-tow-company" component={AssociateWithTowCompanyPage} />
              <Stack.Screen name="review-roadside-assistance-agent" component={ReviewRoadsideAssistanceAgentPage} />
              <Stack.Screen name="review-roadside-assistance-client" component={ReviewRoadsideAssistanceClientPage} />
              <Stack.Screen name="mechanic-select-pricing-plan" component={SubscriptionPlansSelectionPage} />
              <Stack.Screen name="verify-validate-account-stripe" component={VerifyAndValidateAccountStripePage} />
              <Stack.Screen name="broken-vehicle-review-mechanic" component={ReviewMechanicFixedVehiclePage} />
              <Stack.Screen name="broken-vehicle-review-client" component={ReviewClientFixedVehicleHelper} />
              <Stack.Screen name="payouts-main-homepage" component={PayoutsHomepagePage} />
              <Stack.Screen name="add-payout-method-new" component={PayoutMethodAddNewPayoutPage} />
              <Stack.Screen name="bank-account-start-verifcation" component={BankTransferBeginPage} />
              <Stack.Screen name="add-bank-account-payout-information" component={BankAccountInfoPage} />
              <Stack.Screen name="manage-payout-options-menu-main" component={PayoutsManageOptionsMainPage} />
              <Stack.Screen name="payout-analytics-data" component={PaymentAnalyticsDashboardPage} />
              <Stack.Screen name="referral-system-main" component={ReferralSystemMainPage} />
              <Stack.Screen name="promote-account-main" component={PromoteAccountMainPage} />
              <Stack.Screen name="leave-feedback-company" component={LeaveFeedbackMechanic2DayPage} />
              <Stack.Screen name="mechanics-main-search" component={SearchMechanicsPage} />
              <Stack.Screen name="promotions-homepage-main" component={PromotionsMainHomepagePage} />
              <Stack.Screen name="tow-truck-drivers-request" component={DriversHomepagePage} />
              <Stack.Screen name="complete-trip-no-tow" component={NoTowConfirmOnSitePage} />
              <Stack.Screen name="create-mechanic-profile-info-main" component={AdditionalMechanicInformationMainPage} />
            </Stack.Navigator>
          </NavigationContainer>
          {this.calculateReadiness() ? <Modal isVisible={this.state.showProposalModal}>
          <View style={{ flex: 1, backgroundColor: "white", width: width * 0.90, maxHeight: height - 25, minHeight: height - 25, justifyContent: "center", alignItems: "center", alignContent: "center", padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50, maxWidth: width * 0.85 }} style={{ borderWidth: 2, borderColor: "darkgrey", marginBottom: 25 }}>
              <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                       You have a new offer from {company_informtion.company_name}
                    </Text>
                </View>

                <View style={styles.postContent}>
                    <Text style={styles.postTitle}>
                        Services Fee's - Specific Tasks
                    </Text>

                    <Text style={styles.postDescription}>
                        Changing a tire: <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{company_informtion.services.change_tire_cost}{"\n"}</Text>
                        Gas Delivery: <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{company_informtion.services.gas_delivery_cost}{"\n"}</Text>
                        Jumpstart: <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{company_informtion.services.jumpstart_cost}{"\n"}</Text>
                        Remove Stuck Vehicle: <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{company_informtion.services.remove_stuck_vehicle}{"\n"}</Text>
                        Unlock Door(s): <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{company_informtion.services.unlock_locked_door_cost}{"\n"}</Text>
                    </Text>
                    <View style={styles.hr} />
                    <Text style={styles.postTitle}>
                        Standard Flat Rate {"\n"}<Text style={{ color: "darkblue", fontWeight: "bold" }}>${company_informtion.standard_tow_fees.tow_price.toString()}</Text>
                    </Text>
                    <View style={styles.hr} />
                    <Text style={styles.postTitle}>
                        Price Per Mile {"\n"}<Text style={{ color: "darkblue", fontWeight: "bold" }}>${company_informtion.standard_tow_fees.per_mile_fee.toString()}</Text> 
                    </Text>
                    <View style={styles.hr} />

                    <Text style={styles.date}>
                      Joined {company_informtion.date}
                    </Text>

                    <View style={styles.profile}>
                      <Image style={styles.avatar}
                        source={{uri: company_informtion.company_image }}/>

                      <Text style={styles.name}>
                          <Text style={{ textDecorationLine: "underline" }}>Driver</Text> {"\n"}{this.state.fullName}
                      </Text>
                    </View>
                    <View style={styles.hr} />
                      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 26 }}>You'll pay....</Text>
                      {this.renderModalContent()}
                    <View style={styles.hr} />
                    <AwesomeButtonBlue type={"primary"} textColor={"white"} stretch={true} onPress={() => {
                      this.setState({
                        showProposalModal: false,
                        ready: false
                      }, () => {
                        this.handleRedirectAndProcessPriceCalc();
                      })
                    }}>Accept Offer & Redirect</AwesomeButtonBlue>
                    <View style={styles.hr} />
                    <AwesomeButtonBlue type={"secondary"} stretch={true} onPress={() => {
                      this.setState({
                        showProposalModal: false,
                        ready: false
                      }, () => {
                        this.declineOffer();
                      })
                    }} textColor={"black"}>Decline Offer</AwesomeButtonBlue>
                    <View style={{ borderBottomColor: "lightgrey", borderBottomWidth: 2, marginBottom: 15, marginTop: 15 }} />
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal> : null}
        
        {this.calculateReadinessUser() ? <Modal isVisible={this.state.showAlertCustom}>
          <View style={{ flex: 1, backgroundColor: "white", width: width * 0.90, maxHeight: height - 25, minHeight: height - 25, justifyContent: "center", alignItems: "center", alignContent: "center", padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50, maxWidth: width * 0.85 }} style={{ borderWidth: 2, borderColor: "darkgrey", marginBottom: 25 }}>
              <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                       You have a new tow request from {user.fullName}
                    </Text>
                </View>

                <View style={styles.postContent}>
                    <Text style={styles.postTitle}>
                        They are requesting a tow from you specifically...
                    </Text>

                    <Text style={[styles.date, { fontSize: 18 }]}>
                      {user.fullName} has {user.review_count} review(s)
                    </Text>

                    <View style={styles.profile}>
                      <Image style={styles.avatar}
                        source={{ uri: user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1].full_url : Config.not_available }}/>

                      <Text style={styles.name}>
                          <Text style={{ textDecorationLine: "underline" }}>Requesting user</Text> {"\n"}{user.fullName}
                      </Text>
                    </View>
                    <View style={styles.hr} />
                      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}>The requesting user is located around the destination below. {"\n"} More specific locations will be given upon booking...</Text>
                      <View style={styles.hr} />
                      {this.renderModalContentCustom()}
                    <View style={styles.hr} />
                    <AwesomeButtonBlue type={"primary"} textColor={"white"} stretch={true} onPress={() => {
                      this.setState({
                        showAlertCustom: false
                      }, () => {
                        this.handleRedirectAndProcessPriceCalcRoadside();
                      })
                    }}>Confirm tow & send rates</AwesomeButtonBlue>
                    <View style={styles.hr} />
                    <AwesomeButtonBlue type={"secondary"} stretch={true} onPress={() => {
                      this.setState({
                        showAlertCustom: false
                      }, () => {
                        this.declineOfferTowRoadside();
                      })
                    }} textColor={"black"}>Decline Offer</AwesomeButtonBlue>
                    <View style={{ borderBottomColor: "lightgrey", borderBottomWidth: 2, marginBottom: 15, marginTop: 15 }} />
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal> : null}
        <View>
          <Modal style={{ width: width * 0.90 }} isVisible={this.state.showResponseModal}>
            <ScrollView contentContainerStyle={{ paddingBottom: 50, paddingTop: 15, justifyContent: "center", alignItems: "center", padding: 10 }} style={{ backgroundColor: "white", width: "100%", maxHeight: 550, minHeight: 550, alignContent: "center" }}>
            <View style={{ minWidth: "90%" }}>
                    <Text style={styles.postTitle}>
                        Services Fee's - Specific Tasks
                    </Text>
                    {this.renderInternalContent()}
                    <View style={styles.hr} />
                    <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 26 }}>You'll pay....</Text>
                    {this.renderModalContentCustomOne()}
                    <View style={styles.hr} />
                    <AwesomeButtonBlue type={"primary"} textColor={"white"} width={width * 0.85} onPress={() => {
                      this.setState({
                        showResponseModal: false
                      }, () => {
                        this.confirmTowAndStart();
                      })
                    }}>Accept Offer & Redirect</AwesomeButtonBlue>
                    <View style={styles.hr} />
                    <AwesomeButtonBlue type={"secondary"} width={width * 0.85} onPress={() => {
                      this.setState({
                        showResponseModal: false
                      })
                    }} textColor={"black"}>Decline Offer</AwesomeButtonBlue>
                    <View style={{ borderBottomColor: "lightgrey", borderBottomWidth: 2, marginBottom: 15, marginTop: 15 }} />
                </View>
            </ScrollView>
          </Modal>
        </View>
          {this.renderSockets()}
          <Modal isVisible={this.state.showModalOne}>
          <View style={{ flex: 1, backgroundColor: "white", width: width * 0.90, maxHeight: 500, justifyContent: "center", alignItems: "center", alignContent: "center", padding: 20 }}>
            <Image source={require("./assets/icons/gps-2.png")} style={{ maxWidth: 75, maxHeight: 75 }} />
            <Text style={{ marginBottom: 25, fontWeight: "bold", textAlign: "center", fontSize: 18, marginTop: 15 }}>You roadside assistance agent marked your trip as complete! Please verify and confirm this change.</Text>
            <View style={{ borderBottomColor: "lightgrey", borderBottomWidth: 2, marginBottom: 15, marginTop: 15 }} />
            <AwesomeButtonBlue type={"secondary"} width={width * 0.75} onPress={() => {
              this.setState({
                showModalOne: false
              })
            }} textColor={"black"}>Close/exit</AwesomeButtonBlue>
            <View style={{ borderBottomColor: "lightgrey", borderBottomWidth: 2, marginBottom: 15, marginTop: 15 }} />
            <AwesomeButtonBlue type={"primary"} textColor={"white"} onPress={() => {
              this.setState({
                showModalOne: false
              }, () => {
                this.navigationRef.navigate('driver-has-arrived-manage-listing-depatarture', null);
              })
            }} width={width * 0.75}>Redirect to page</AwesomeButtonBlue>
          </View>
        </Modal>
        <Modal isVisible={this.state.showModalTwo}>
          <View style={{ flex: 1, backgroundColor: "white", width: width * 0.90, maxHeight: 500, justifyContent: "center", alignItems: "center", alignContent: "center", padding: 20 }}>
            <Image source={require("./assets/icons/completed.png")} style={{ maxWidth: 75, maxHeight: 75 }} />
            <Text style={{ marginBottom: 25, fontWeight: "bold", textAlign: "center", fontSize: 18, marginTop: 15 }}>The agent for the roadside assistance/tow job you're actively assigned to marked the trip as "complete". Please confirm on your half to finish and finalize the trip! You can find these actions in the "roadside assistance" section of this app...</Text>
            <View style={{ borderBottomColor: "lightgrey", borderBottomWidth: 2, marginBottom: 15, marginTop: 15 }} />
            <AwesomeButtonBlue type={"secondary"} width={width * 0.75} onPress={() => {
              this.setState({
                showModalTwo: false
              })
            }} textColor={"black"}>Close/exit</AwesomeButtonBlue>
            <View style={{ borderBottomColor: "lightgrey", borderBottomWidth: 2, marginBottom: 15, marginTop: 15 }} />
            <AwesomeButtonBlue type={"primary"} textColor={"white"} onPress={() => {
              this.setState({
                showModalTwo: false
              }, () => {
                this.navigationRef.navigate('driver-has-arrived-manage-listing-depatarture', null);
              })
            }} width={width * 0.75}>Redirect to page</AwesomeButtonBlue>
          </View>
        </Modal>
        <Modal isVisible={this.state.showCompletionModal}>
          <View style={{ flex: 1, backgroundColor: "white", width: width * 0.90, maxHeight: 500, justifyContent: "center", alignItems: "center", alignContent: "center", padding: 20 }}>
            <Image source={require("./assets/icons/completed.png")} style={{ maxWidth: 75, maxHeight: 75 }} />
            <Text style={{ marginBottom: 25, fontWeight: "bold", textAlign: "center", fontSize: 18, marginTop: 15 }}>The OTHER USER ({this.state.fullUserName}) on a job you're connected to marked their half of the job complete. You should now go and mark the job as complete if the job was completed. This change can be found in the "Active Repair Jobs" Category from your account quick links page...</Text>
            <View style={{ borderBottomColor: "lightgrey", borderBottomWidth: 2, marginBottom: 15, marginTop: 15 }} />
            <AwesomeButtonBlue type={"secondary"} stretch={true} onPress={() => {
              this.setState({
                showCompletionModal: false
              })
            }} textColor={"black"}>Close/exit</AwesomeButtonBlue>
            <View style={{ borderBottomColor: "lightgrey", borderBottomWidth: 2, marginBottom: 15, marginTop: 15 }} />
            <AwesomeButtonBlue type={"primary"} textColor={"white"} onPress={() => {
              this.setState({
                showCompletionModal: false
              }, () => {
                this.navigationRef.navigate("active-jobs");
              })
            }} stretch={true}>Redirect to page</AwesomeButtonBlue>
          </View>
        </Modal>
          <Toast ref={(ref) => Toast.setRef(ref)} />
          </UserInactivity>
        </View> 
      </>
    );
 }
};
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  header:{
    padding:30,
    alignItems: 'center',
    backgroundColor: "darkblue",
  },
  headerTitle:{
    fontSize:30,
    color:"white",
    fontWeight:'bold',
    marginTop:10,
  },
  name:{
    fontSize:22,
    color:"darkblue",
    fontWeight:'600',
  },
  postContent: {
    flex: 1,
    padding:30,
  },
  postTitle:{
    fontSize:26,
    fontWeight:'600',
  },
  postDescription:{
    fontSize:20,
    marginTop:10,
  },
  tags:{
    color: '#00BFFF',
    marginTop:10,
  },
  date:{
    color: '#696969',
    marginTop:10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 4,
    borderColor: "darkblue",
  },
  profile:{
    flexDirection: 'row',
    marginTop:20
  },
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  hr: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
    marginTop: 15, 
    marginBottom: 15 
  },
  shareButtonText:{
    color: "darkblue",
    fontSize:20,
  }
});
const mapStateToProps = (state) => {
  console.log("STATE!!!!:", state);
  if (typeof state.auth.authenticated !== "undefined") {
    if (Object.keys(state.auth.authenticated).length === 0) {
        return {
          finished: state.auth.finished,
          unique_id: null,
          authenticateddd: null,
          company_id: state.auth.authenticated.company_id,
          company_name: state.auth.authenticated.company_name,
          fullName: state.auth.authenticated.fullName
        }
    } else {
        return {
          page: state.auth.authenticated.page,
          finished: state.auth.finished,
          unique_id: state.auth.authenticated.unique_id,
          authenticateddd: state.auth.authenticated,
          company_id: state.auth.authenticated.company_id,
          company_name: state.auth.authenticated.company_name,
          fullName: state.auth.authenticated.fullName
        }
    } 
  } else {
    return {
      unique_id: null,
      authenticateddd: null,
      company_id: null,
      company_name: null,
      fullName: null
    }
  }
}
export default connect(mapStateToProps, { gatherLocationOnLoad, switchAccountType, checkToNavigatePushNotification, authenticated, finishedSignup, sendbirdLogin, saveUsersLocation })(App);