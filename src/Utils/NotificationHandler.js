import {
  ACTIVE_USER_ALIAS,
  ARTICLE_PUBLISHED_ALIAS,
  KHATMA_OPENED_ALIAS,
  NEW_USER_ALIAS,
  YOUTUBE_LIVE_START_ALIAS,
} from './Constants/Notifications';

const NotificationHandler = (navigationHandler, action) => {
  switch (action) {
    case ACTIVE_USER_ALIAS:
      navigationHandler.navigate('Login');
      return;
    case NEW_USER_ALIAS:
      navigationHandler.navigate('UserStack');
      return;
    case KHATMA_OPENED_ALIAS:
      navigationHandler.navigate('KoranStack');
      return;
    case ARTICLE_PUBLISHED_ALIAS:
      navigationHandler.navigate('HomeStack');
      break;
    case YOUTUBE_LIVE_START_ALIAS:
      //todo correct youtube notification bug
      navigationHandler.navigate('adminUserWithYoutubeLiveTabNavigator');
      break;
    default:
  }
};

export default NotificationHandler;
