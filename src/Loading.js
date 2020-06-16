import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import axios from "axios";
import NavigationService from "./Utils/NavigationService";
import { getLiveVideo } from "./store/reducers/liveVideoRedux";
import { fcmService } from "./services/FCMService";
import { localNotificationService } from "./services/LocalNotificationService";
import { storeTokenDevice } from "./store/reducers/accountRedux";
import { logout } from "./store/reducers/authenticationRedux";
import Notifications from "./services/Notifications";
import {
  ACTIVE_USER,
  END_LIVE,
  NEW_LIVE,
} from "./Utils/Constants/Notifications";
import NotificationHandler from "./Utils/NotificationHandler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fcmService = null;
    this.localNotificationService = null;

  }

  componentDidMount() {
    NavigationService.setInstance(this.props.navigation);
    this.notification = new Notifications(
      this.onRegister.bind(this),
      this.onNotification.bind(this)
    );

    if (this.props.account && this.props.account.access_token) {
      axios.defaults.headers.Authorization = `Bearer ${this.props.account.access_token}`;
      this.props.getLiveVideo(this.props.account);
    } else {
      this.props.navigation.navigate("Login");
    }

    NavigationService.setInstance(this.props.navigation);
    navigate(
      this.props.account,
      this.props.navigation,
      "Login",
      this.props.video && this.props.video.youtube_id
    );

    this.fcmService = fcmService;
    this.localNotificationService = localNotificationService;

    this.fcmService.registerAppWithFCM();
    this.fcmService.register(this.onRegister, this.onNotification, this.onOpenNotification);
    this.localNotificationService.configure(this.onOpenNotification);
    
  }

  onRegister = (token) => {
    if (!this.props.tokenDevice) {
      this.props.storeTokenDevice(token);
    }
  };

  onNotification = (notification) => {
      console.log('[App] onNotification: ', notification);
      const options = {
        soundName: 'default',
        playSound: true,
      };

      this.localNotificationService.showNotification(
        0,
        notification.title,
        notification.body,
        notification,
        options,
      );
  };

  onOpenNotification = (notification) => {
    console.log('[App] onOpenNotification: ', notification);
    const action = notification.action
      ? notification.action
      : notification.data.action;

    if (action === ACTIVE_USER) {
      this.props.logout();
    }

    NotificationHandler(this.props.navigation, action);
    if (action === NEW_LIVE || action === END_LIVE) {
      this.props.getLiveVideo(this.props.account);
    }

    if (!notification.foreground) {
      NotificationHandler(this.props.navigation, action);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Chargement</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { tokenDevice } = state.accountStore;
  return {
    account: state.accountStore,
    tokenDevice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLiveVideo: (account) => dispatch(getLiveVideo(account)),
    storeTokenDevice: (tokenDevice) => dispatch(storeTokenDevice(tokenDevice)),
    logout: () => dispatch(logout()),
  };
};
Loading.propTypes = {
  account: PropTypes.object,
  navigation: PropTypes.object,
  getLiveVideo: PropTypes.func,
  storeTokenDevice: PropTypes.func,
  tokenDevice: PropTypes.object,
  logout: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
