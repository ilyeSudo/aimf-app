import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import axios from 'axios';
import NavigationService from '../Utils/NavigationService';
import {navigate} from '../Utils/Account';
import {getLiveVideo} from '../store/reducers/liveVideoRedux';
import Notifications from '../services/Notifications';
import FCMService from '../services/FCMService';
import {storeTokenDevice} from '../store/reducers/accountRedux';
import {
  ACTIVE_USER_ALIAS,
  YOUTUBE_LIVE_FINISHED_ALIAS,
  YOUTUBE_LIVE_START_ALIAS,
} from './../Utils/Constants/Notifications';
import NotificationHandler from './../Utils/NotificationHandler';
import LocalNotificationService from '../services/LocalNotificationService';
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
    //this.notification = new Notifications(this.onRegister.bind(this), null);

    if (this.props.account && this.props.account.access_token) {
      axios.defaults.headers.Authorization = `Bearer ${this.props.account.access_token}`;
      if (!this.props.video) {
        this.props.getLiveVideo();
      }
    }
    NavigationService.setInstance(this.props.navigation);
    navigate(
      this.props.account,
      this.props.navigation,
      'Login',
      this.props.video && this.props.video.youtube_id,
    );

    this.fcmService = new FCMService();
    this.localNotificationService = new LocalNotificationService();

    this.fcmService.registerAppWithFCM();
    this.fcmService.register(
      this.onRegister,
      this.onNotification,
      this.onOpenNotification,
    );
    this.localNotificationService.configure(this.onOpenNotification);
  }

  onRegister = (token) => {
    console.log('[App] token : ', token);
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
    if (
      notification?.notification_alias ||
      notification?.data?.notification_alias
    ) {
      const action = notification.notification_alias
        ? notification.notification_alias
        : notification.data.notification_alias;

      if (
        action === YOUTUBE_LIVE_START_ALIAS ||
        action === YOUTUBE_LIVE_FINISHED_ALIAS
      ) {
        this.props.getLiveVideo(this.props.account);
      }
    }
  };

  onOpenNotification = (notification) => {
    console.log('[App] onOpenNotification: ', notification);
    if (
      notification?.notification_alias ||
      notification?.data?.notification_alias
    ) {
      const action = notification.notification_alias
        ? notification.notification_alias
        : notification.data.notification_alias;

      if (action === ACTIVE_USER_ALIAS) {
        this.props.logout();
      }

      NotificationHandler(this.props.navigation, action);
      // if (
      //   action === YOUTUBE_LIVE_START_ALIAS ||
      //   action === YOUTUBE_LIVE_FINISHED_ALIAS
      // ) {
      //   this.props.getLiveVideo(this.props.account);
      // }

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
  const {video} = state.liveVideoStore;
  return {
    account: state.accountStore,
    video,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLiveVideo: (account) => dispatch(getLiveVideo(account)),
    storeTokenDevice: (tokenDevice) => dispatch(storeTokenDevice(tokenDevice)),
  };
};
Loading.propTypes = {
  account: PropTypes.object,
  navigation: PropTypes.object,
  video: PropTypes.object,
  getLiveVideo: PropTypes.func,
  storeTokenDevice: PropTypes.func,
  tokenDevice: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
