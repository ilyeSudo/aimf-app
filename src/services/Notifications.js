import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export default class Notifications {
  configure = (onRegister, onNotification) => {
    console.log('[Notification] configure');

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      // (required) Called when a remote or local notification is opened or received,
      onRegister(token) {
        onRegister(token);
        console.log('####################loading');
        console.log('[Notification] onRegister: ', token);
      },
      // (required) Called when a remote or local notification is opened or received
      // onNotification, // this._onNotification,
      onNotification(notification) {
        // process the notification
        // required on iOS only
        onNotification(notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: '621874050263',

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  };

  localNotification = () => {
    PushNotification.localNotification({
      /* iOS and Android properties */
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
    });
  };
}
