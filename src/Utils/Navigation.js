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

export const getAuthenticatedNavigator = (
  user,
  access_token,
  youtube = false,
) => {
  let live = !!youtube;
  if (user && access_token) {
    if (isAdmin(user) || isSuperAdmin(user)) {
      return createAppContainer(
        live ? adminUserWithYoutubeLiveTabNavigator : adminUserTabNavigator,
      );
    }
    if (isAssociationAdmin(user)) {
      return createAppContainer(
        live
          ? adminAssociationWithYoutubeLiveTabNavigator
          : adminAssociationTabNavigator,
      );
    }
    if (isMember(user) || isLibrarian(user)) {
      return createAppContainer(
        live ? activeUserWithYoutubeLiveTabNavigator : activeUserTabNavigator,
      );
    }
  }
  return createAppContainer(unActiveUserTabNavigator);
};
