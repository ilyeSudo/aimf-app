import axios from 'axios';
import {
  ADMIN_ROLE,
  LIBRARIAN_ROLE,
  MEMBER_ROLE,
  SUPER_ADMIN_ROLE,
} from './Constants';

export const isSuperAdmin = (user) => {
  if (user && user.roles) {
    return !!user.roles.find((role) => role.name === SUPER_ADMIN_ROLE);
  }
  return false;
};

export const isAdmin = (user) => {
  if (user && user.roles) {
    return !!user.roles.find(
      (role) => role.name.substring(0, 6) === ADMIN_ROLE,
    );
  }
  return false;
};

export const isAssociationAdmin = (user) => {
  if (user && user.roles) {
    return !!user.roles.find((role) => role.name.substring(0, 6) === 'admin_');
  }
  return false;
};

export const isMember = (user) => {
  if (user && user.roles) {
    return !!user.roles.find((role) => role.name === MEMBER_ROLE);
  }
  return false;
};

export const isAuthorized = (user) => {
  return (
    isSuperAdmin(user) ||
    isAdmin(user) ||
    isLibrarian(user) ||
    isMember(user) ||
    isAssociationAdmin(user)
  );
};

export const isLibrarian = (user) => {
  if (user && user.roles) {
    return !!user.roles.find((role) => role.name === LIBRARIAN_ROLE);
  }
  return false;
};

export const canReserveBook = (user) => {
  return isSuperAdmin(user) || isAdmin(user) || isLibrarian(user);
};
export const navigate = (
  account,
  navigation,
  defaultNavigation = 'Login',
  youtube = false,
) => {
  if (account.user && account.access_token) {
    axios.defaults.headers.Authorization = `Bearer ${account.access_token}`;

    if (isAdmin(account.user) || isSuperAdmin(account.user)) {
      navigation.navigate(
        youtube
          ? 'adminUserWithYoutubeLiveTabNavigator'
          : 'adminUserTabNavigator',
      );
    } else if (isAssociationAdmin(account.user)) {
      navigation.navigate(
        youtube
          ? 'adminAssociationTabNavigator'
          : 'adminAssociationWithYoutubeLiveTabNavigator',
      );
    } else if (isMember(account.user) || isLibrarian(account.user)) {
      navigation.navigate(
        youtube
          ? 'activeUserWithYoutubeLiveTabNavigator'
          : 'activeUserTabNavigator',
      );
    } else {
      navigation.navigate('unActiveUserTabNavigator');
    }
    return;
  }
  navigation.navigate(defaultNavigation);
};
