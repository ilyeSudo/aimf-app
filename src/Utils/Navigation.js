import {
  activeUserTabNavigator,
  activeUserWithYoutubeLiveTabNavigator,
  adminAssociationTabNavigator,
  adminAssociationWithYoutubeLiveTabNavigator,
  adminUserTabNavigator,
  adminUserWithYoutubeLiveTabNavigator,
  unActiveUserTabNavigator,
} from '../MainTabNavigator';
import {createAppContainer} from 'react-navigation';
import {
  isAdmin,
  isAssociationAdmin,
  isLibrarian,
  isMember,
  isSuperAdmin,
} from './Account';

export const getAuthenticatedNavigator = (account, youtube = false) => {
  let live = !!youtube;
  if (account.user && account.access_token) {
    if (isAdmin(account.user) || isSuperAdmin(account.user)) {
      return createAppContainer(
        live ? adminUserWithYoutubeLiveTabNavigator : adminUserTabNavigator,
      );
    }
    if (isAssociationAdmin(account.user)) {
      return createAppContainer(
        live
          ? adminAssociationWithYoutubeLiveTabNavigator
          : adminAssociationTabNavigator,
      );
    }
    if (isMember(account.user) || isLibrarian(account.user)) {
      return createAppContainer(
        live ? activeUserWithYoutubeLiveTabNavigator : activeUserTabNavigator,
      );
    }
  }
  return createAppContainer(unActiveUserTabNavigator);
};
