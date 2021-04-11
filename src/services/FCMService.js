import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

export default class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.registerAppWithFCM();
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = (onRegister) => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          this.getToken(onRegister);
        } else {
          // User doesn't have permission
          this.requestPermission(onRegister);
        }
      })
      .catch(() => {
        // console.log('[FCMService] Permission rejected ', error);
      });
  };

  getToken = (onRegister) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          // console.log('[FCMService] User does not have a device token');
        }
      })
      .catch(() => {
        // console.log('[FCMService] getToken rejected ', error);
      });
  };

  requestPermission = (onRegister) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch(() => {
        // console.log('[FCMService] Request Permission rejected ', error);
      });
  };

  deleteToken = () => {
    // console.log('[FCMService] deleteToken ');
    messaging()
      .deleteToken()
      .catch(() => {
        // console.log('[FCMService] Delete token error ', error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // When a user tap on a push notification and the app is in background
    this.backgroundNotificationListener = messaging().onNotificationOpenedApp(
      async (remoteMessage) => {
        // console.log(
        //   '[FCMService] onNotificationOpenedApp Notification caused app to open from background state :',
        //   remoteMessage,
        // );
        if (remoteMessage) {
          onOpenNotification(remoteMessage);
          // this.removeDeliveredNotification(notification.notificationId)
        }
      },
    );

    // When the application is opened from a quit state.
    // When a user tap on a push notification and the app is CLOSED
    this.closedAppNotificationListener = messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          // console.log(
          //   '[FCMService] getInitialNotification Notification caused app to open from quit state:',
          //   remoteMessage,
          // );

          if (remoteMessage) {
            onOpenNotification(remoteMessage);
            //  this.removeDeliveredNotification(notification.notificationId)
          }
        }
      });

    // Foreground state messages
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      // console.log('[FCMService] A new FCM message arrived!', remoteMessage);
      if (remoteMessage) {
        // let notification = null;
        // if (Platform.OS === 'ios') {
        //   notification = remoteMessage.data.notification;
        // } else {
        //   notification = remoteMessage.notification;
        //   notification = {
        //     ...notification,
        //     notification_alias: remoteMessage.data.notification_alias,
        //   };
        // }
        onNotification(remoteMessage);
      }
    });

    // Triggered when have new token
    messaging().onTokenRefresh((fcmToken) => {
      // console.log('[FCMService] New token refresh: ', fcmToken);
      onRegister(fcmToken);
    });
  };

  unRegister = () => {
    this.messageListener();
  };
}
