import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import {Icon} from 'native-base';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../config/icons/selection.json';

import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import KoranScreen from './screens/KoranScreen';
import AddKhatma from './screens/KoranScreen/AddKhatma';
import Khatma from './screens/KoranScreen/Khatma';
import AccountScreen from './screens/AccountScreen';
import UserScreen from './screens/UserScreen';
import UnaccessibleScreen from './screens/UnaccessibleScreen';
import YouTubeScreen from './screens/YouTubeSceen';
import LibraryScreen from './screens/LibraryScreen';
import BookDetails from './screens/LibraryScreen/BookDetails';
import BookReservation from './screens/LibraryScreen/BookReservation';
import MyReservations from './screens/LibraryScreen/MyReservations';
import BookFavoriteList from './screens/LibraryScreen/BookFavoriteList';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig);
// ----------------------------------------------HomeScreen-----------------------------------------------------
const HomeStack = createStackNavigator({
  Timeline: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Accueil',
  tabBarIcon: ({focused}) => (
    <CustomIcon name="minaret" size={25} color="#000" />
  ),
};

const disableHomeStack = createStackNavigator({
  Timeline: UnaccessibleScreen,
});

disableHomeStack.navigationOptions = {
  tabBarLabel: 'Accueil',
  tabBarIcon: ({focused}) => (
    <CustomIcon style={{opacity: 0.5}} name="minaret" size={25} color="#000" />
  ),
};

// ----------------------------------------------PostWorkflowScreen-----------------------------------------------------
const PostWorkflowStack = createStackNavigator({
  PostWorkflow: PostScreen,
});

PostWorkflowStack.navigationOptions = {
  tabBarLabel: 'Post',
  tabBarIcon: ({focused}) => (
    <Icon
      type="AntDesign"
      name="addfile"
      style={{fontSize: 23, marginBottom: -3}}
      color={focused ? '#2f95dc' : '#ccc'}
    />
  ),
};

// ----------------------------------------------KoranScreen-----------------------------------------------------
const navOptionHandler = (nafigation) => ({
  header: null,
});

const KoranStack = createStackNavigator({
  KoranTimeLine: {
    screen: KoranScreen,
    navigationOptions: navOptionHandler,
  },
  AddKhatma: {
    screen: AddKhatma,
    navigationOptions: navOptionHandler,
  },
  Khatma: {
    screen: Khatma,
    navigationOptions: navOptionHandler,
  },
});

KoranStack.navigationOptions = {
  tabBarLabel: 'Khetma',
  tabBarIcon: ({focused}) => <CustomIcon name="coran" size={25} color="#000" />,
};

const disableKoranStack = createStackNavigator({
  Koran: UnaccessibleScreen,
});

disableKoranStack.navigationOptions = {
  tabBarLabel: 'Khetma',
  tabBarIcon: ({focused}) => (
    <CustomIcon name="coran" style={{opacity: 0.5}} size={25} color="#000" />
  ),
};

// ----------------------------------------------LibraryScreen-----------------------------------------------------

const libraryStack = createStackNavigator({
  LibraryTimeLine: {
    screen: LibraryScreen,
  },
  BookDetails: {
    screen: BookDetails,
  },
  BookReservation: {
    screen: BookReservation,
  },
  BookFavoriteList: {
    screen: BookFavoriteList,
  },
  MyReservations: {
    screen: MyReservations,
  },
});

libraryStack.navigationOptions = {
  tabBarLabel: 'Bibliothèque',
  tabBarIcon: ({focused}) => (
    <Icon
      type="FontAwesome"
      name="book"
      color={focused ? '#2f95dc' : '#ccc'}
      style={{fontSize: 28, marginBottom: -3}}
    />
  ),
};

const disableLibraryStack = createStackNavigator({
  Timeline: UnaccessibleScreen,
});

disableLibraryStack.navigationOptions = {
  tabBarLabel: 'Bibliothèque',
  tabBarIcon: ({focused}) => (
    <Icon
      type="FontAwesome"
      name="book"
      color="#000"
      style={{fontSize: 35, marginBottom: -3, opacity: 0.5}}
    />
  ),
};
// ----------------------------------------------YouTubeScreen-----------------------------------------------------
const YouTubeStack = createStackNavigator({
  YouTube: YouTubeScreen,
});

YouTubeStack.navigationOptions = {
  tabBarLabel: 'Direct',
  tabBarIcon: ({focused}) => (
    <Icon
      type="SimpleLineIcons"
      name="social-youtube"
      style={{fontSize: 30, marginBottom: -3}}
      color={focused ? '#2f95dc' : '#ccc'}
    />
  ),
};

const disableYouTubeStack = createStackNavigator({
  Youtube: UnaccessibleScreen,
});

disableYouTubeStack.navigationOptions = {
  tabBarLabel: 'Direct',
  tabBarIcon: ({focused}) => (
    <Icon
      type="SimpleLineIcons"
      name="social-youtube"
      style={{opacity: 0.5}}
      color="#000"
    />
  ),
};

// ----------------------------------------------AccountScreen-----------------------------------------------------
const AccountStack = createStackNavigator({
  Account: AccountScreen,
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Compte',
  tabBarIcon: ({focused}) => (
    <Icon
      type="EvilIcons"
      name="user"
      color={focused ? '#2f95dc' : '#ccc'}
      style={{fontSize: 35, marginBottom: -3}}
    />
  ),
};

// ----------------------------------------------UserScreen-----------------------------------------------------
const UserStack = createStackNavigator({
  User: UserScreen,
});

UserStack.navigationOptions = {
  tabBarLabel: 'User',
  tabBarIcon: ({focused}) => (
    <Icon
      type="FontAwesome5"
      name="user-check"
      color={focused ? '#2f95dc' : '#ccc'}
      style={{marginBottom: -3, fontSize: 18}}
    />
  ),
};

// ##################################################### Tab navigators ###############################################

// ----------------------------------------------Admin User without Youtube Live-----------------------------------
export const adminUserTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    KoranStack,
    libraryStack,
    PostWorkflowStack,
    disableYouTubeStack,
    UserStack,
    AccountStack,
  },
  {
    defaultNavigationOptions: {
      tabBarOnPress: ({navigation, defaultHandler}) => {
        if (navigation.state.routeName === 'disableYouTubeStack') {
          return null;
        }
        defaultHandler();
      },
    },
    initialRouteName: 'HomeStack',
  },
);

// ----------------------------------------------Admin User with Youtube Live-----------------------------------
export const adminUserWithYoutubeLiveTabNavigator = createBottomTabNavigator({
  HomeStack,
  KoranStack,
  libraryStack,
  PostWorkflowStack,
  YouTubeStack,
  UserStack,
  AccountStack,
});

// ----------------------------------------------Association Admin without Youtube Live-----------------------------------
export const adminAssociationTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    KoranStack,
    PostWorkflowStack,
    disableYouTubeStack,
    AccountStack,
  },
  {
    defaultNavigationOptions: {
      tabBarOnPress: ({navigation, defaultHandler}) => {
        if (navigation.state.routeName === 'disableYouTubeStack') {
          return null;
        }
        defaultHandler();
      },
    },
    initialRouteName: 'HomeStack',
  },
);

// ----------------------------------------------Association Admin with Youtube Live-----------------------------------
export const adminAssociationWithYoutubeLiveTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    KoranStack,
    PostWorkflowStack,
    YouTubeStack,
    AccountStack,
  },
);

// ----------------------------------------------Active User With Youtube Live-----------------------------------
export const activeUserWithYoutubeLiveTabNavigator = createBottomTabNavigator({
  HomeStack,
  KoranStack,
  libraryStack,
  YouTubeStack,
  AccountStack,
});

// ----------------------------------------------Active User without Youtube Live-----------------------------------
export const activeUserTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    KoranStack,
    libraryStack,
    disableYouTubeStack,
    AccountStack,
  },
  {
    defaultNavigationOptions: {
      tabBarOnPress: ({navigation, defaultHandler}) => {
        if (navigation.state.routeName === 'disableYouTubeStack') {
          return null;
        }
        defaultHandler();
      },
    },
    initialRouteName: 'AccountStack',
  },
);

// ----------------------------------------------UnActive User------------------------------------------------------
export const unActiveUserTabNavigator = createBottomTabNavigator(
  {
    disableHomeStack,
    disableKoranStack,
    disableLibraryStack,
    disableYouTubeStack,
    AccountStack,
  },
  {
    defaultNavigationOptions: {
      tabBarOnPress: ({navigation, defaultHandler}) => {
        if (
          navigation.state.routeName === 'disableHomeStack' ||
          navigation.state.routeName === 'disableKoranStack' ||
          navigation.state.routeName === 'disableYouTubeStack' ||
          navigation.state.routeName === 'disableLibraryStack'
        ) {
          return null;
        }
        defaultHandler();
      },
    },
    initialRouteName: 'AccountStack',
  },
);

// ---------------------------------------------- Anonymous User ----------------------------------------------------
export const AuthStackNavigator = createStackNavigator({
  Login: Login,
  SignUp: SignUp,
});
