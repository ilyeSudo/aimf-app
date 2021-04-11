import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import axios from 'axios';
import NavigationService from '../Utils/NavigationService';
import {navigate} from '../Utils/Account';
import {getLiveVideo} from '../store/reducers/liveVideoRedux';
import FCMService from '../services/FCMService';
import {storeTokenDevice} from '../store/reducers/accountRedux';
import {
  ACCOUNT_ACTIVATED_USER_ALIAS,
  YOUTUBE_LIVE_FINISHED_ALIAS,
  YOUTUBE_LIVE_START_ALIAS,
} from '../Utils/Constants/Notifications';
import NotificationHandler from '../Utils/NotificationHandler';
import LocalNotificationService from '../services/LocalNotificationService';
import {logout} from '../store/reducers/authenticationRedux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    // console.log('[Loading] componentDidMount : ', this.props.account);
    if (this.props.account && this.props.account.access_token) {
      axios.defaults.headers.Authorization = `Bearer ${this.props.account.access_token}`;
    }
    NavigationService.setInstance(this.props.navigation);
    navigate(this.props.account, this.props.navigation, 'LoginScreen');

    this.fcmService = new FCMService();
    this.localNotificationService = new LocalNotificationService();

    this.fcmService.register(
      this.onRegister,
      this.onNotification,
      this.onOpenNotification,
    );
    this.localNotificationService.configure(this.onOpenNotification);
  }

  onRegister = (fcmToken) => {
    // console.log('[Loading] fcmToken : ', fcmToken);
    if (!this.props.fcmToken) {
      this.props.storeTokenDevice(fcmToken);
    }
  };

  onNotification = (notification) => {
    // console.log('[Loading] onNotification: ', notification);
    if (
      notification?.notification_alias ||
      notification?.data?.notification_alias
    ) {
      const action = notification.notification_alias
        ? notification.notification_alias
        : notification.data.notification_alias;

      if (action === ACCOUNT_ACTIVATED_USER_ALIAS) {
        this.props.logout();
      }

      if (
        action === YOUTUBE_LIVE_START_ALIAS ||
        action === YOUTUBE_LIVE_FINISHED_ALIAS
      ) {
        this.props.getLiveVideo(this.props.account);
      }
    }
  };

  onOpenNotification = (notification) => {
    // console.log('[Loading] onOpenNotification: ', notification);
    if (
      notification?.notification_alias ||
      notification?.data?.notification_alias
    ) {
      const action = notification.notification_alias
        ? notification.notification_alias
        : notification.data.notification_alias;

      if (action === ACCOUNT_ACTIVATED_USER_ALIAS) {
        this.props.logout();
      }

      NotificationHandler(this.props.navigation, action);

      if (!notification.foreground) {
        NotificationHandler(this.props.navigation, action);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.accountStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    getLiveVideo: (account) => dispatch(getLiveVideo(account)),
    storeTokenDevice: (fcmToken) => dispatch(storeTokenDevice(fcmToken)),
  };
};
Loading.propTypes = {
  account: PropTypes.object,
  navigation: PropTypes.object,
  getLiveVideo: PropTypes.func,
  storeTokenDevice: PropTypes.func,
  fcmToken: PropTypes.object,
  logout: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
