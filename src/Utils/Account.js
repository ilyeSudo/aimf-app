import axios from 'axios';
import {
  ADMIN_ROLE,
  LIBRARIAN_ROLE,
  MEMBER_ROLE,
  SUPER_ADMIN_ROLE,
  ASSOCIATION_ADMIN_ROLE,
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
      (role) =>
        role.name.substring(0, 6) === ADMIN_ROLE ||
        role.name === SUPER_ADMIN_ROLE,
    );
  }
  return false;
};

export const isAssociationAdmin = (user) => {
  if (user && user.roles) {
    return !!user.roles.find(
      (role) => role.name.substring(0, 6) === ASSOCIATION_ADMIN_ROLE,
    );
  }
  return false;
};

export const isSpecifiedAssociationAdmin = (user, associationName) => {
  if (user && user.roles) {
    return !!user.roles.find(
      (role) =>
        role.name.substring(0, 6) === ASSOCIATION_ADMIN_ROLE &&
        role.name.toUpperCase() ===
          `${ASSOCIATION_ADMIN_ROLE}${associationName}`.toUpperCase(),
    );
  }
  return false;
};

export const isMember = (user) => {
  if (user && user.roles) {
    return !!user.roles.find((role) => role.name === MEMBER_ROLE);
  }
  return false;
};

const isLibrarian = (user) => {
  if (user && user.roles) {
    return !!user.roles.find((role) => role.name === LIBRARIAN_ROLE);
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

export const canReserveBook = (user) => {
  return isSuperAdmin(user) || isAdmin(user) || isLibrarian(user);
};
export const navigate = (
  account,
  navigation,
  defaultNavigation = 'LoginScreen',
) => {
  // console.log('[Account] navigate : ', account);
  let screen = defaultNavigation;
  if (account.user && account.access_token) {
    axios.defaults.headers.Authorization = `Bearer ${account.access_token}`;
    switch (true) {
      case isAdmin(account.user) || isSuperAdmin(account.user):
        screen = 'adminUserTabNavigator';
        break;
      case isAssociationAdmin(account.user):
        screen = 'adminAssociationTabNavigator';
        break;
      case isMember(account.user) || isLibrarian(account.user):
        screen = 'activeUserTabNavigator';
        break;
      default:
        screen = 'unActiveUserTabNavigator';
    }
  }
  navigation.navigate(screen);
};
