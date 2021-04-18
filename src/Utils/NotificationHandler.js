import {
  ACCOUNT_ACTIVATED_USER_ALIAS,
  KHATMA_OPENED_ALIAS,
  ACCOUNT_CREATED_ADMIN,
  YOUTUBE_LIVE_START_ALIAS,
  YOUTUBE_LIVE_FINISHED_ALIAS,
} from './Constants/Notifications';
import {isAdmin, isNewMember} from './Account';

const NotificationHandler = (navigationHandler, action, user) => {
  console.log('[NotificationHandler]', action);

  // console.log('[NotificationHandler] Handle notification action : ', action);
  switch (action) {
    case ACCOUNT_ACTIVATED_USER_ALIAS:
      navigationHandler.navigate('LoginScreen');
      return;
    case ACCOUNT_CREATED_ADMIN:
      if (user && isAdmin(user)) {
        navigationHandler.navigate('UserStack');
      }
      return;
    case KHATMA_OPENED_ALIAS:
      if (user && !isNewMember(user)) {
        navigationHandler.navigate('KoranStack');
      }
      return;
    case YOUTUBE_LIVE_START_ALIAS:
    case YOUTUBE_LIVE_FINISHED_ALIAS:
      if (user && !isNewMember(user)) {
        navigationHandler.navigate('HomeStack');
        navigationHandler.navigate('YouTubeStack');
      }
      return;
    default:
      if (user && !isNewMember(user)) {
        navigationHandler.navigate('HomeStack');
      }
  }
};

export default NotificationHandler;
