import {
  ACCOUNT_ACTIVATED_USER_ALIAS,
  KHATMA_OPENED_ALIAS,
  ACCOUNT_CREATED_ADMIN,
  YOUTUBE_LIVE_START_ALIAS,
  YOUTUBE_LIVE_FINISHED_ALIAS,
} from './Constants/Notifications';

const NotificationHandler = (navigationHandler, action) => {
  // console.log('[NotificationHandler] Handle notification action : ', action);
  switch (action) {
    case ACCOUNT_ACTIVATED_USER_ALIAS:
      navigationHandler.navigate('LoginScreen');
      return;
    case ACCOUNT_CREATED_ADMIN:
      navigationHandler.navigate('UserStack');
      return;
    case KHATMA_OPENED_ALIAS:
      navigationHandler.navigate('KoranStack');
      return;
    case YOUTUBE_LIVE_START_ALIAS:
    case YOUTUBE_LIVE_FINISHED_ALIAS:
      navigationHandler.navigate('HomeStack');
      navigationHandler.navigate('YouTubeStack');
      return;
    default:
      navigationHandler.navigate('HomeStack');
  }
};

export default NotificationHandler;
