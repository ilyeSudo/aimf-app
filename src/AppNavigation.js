import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {AuthStackNavigator} from './MainTabNavigator';
import axios from 'axios';
import {getLiveVideo} from './store/reducers/liveVideoRedux';
import {getAuthenticatedNavigator} from './Utils/Navigation';

const mapStateToProps = (state) => {
  const {video} = state.liveVideoStore;
  const {access_token, user} = state.accountStore;
  return {
    access_token,
    user,
    video,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getLiveVideo: () => dispatch(getLiveVideo()),
  };
};

const AppNavigation = ({user, access_token, video, getLiveVideo}) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(access_token);
    if (access_token) {
      axios.defaults.headers.Authorization = `Bearer ${access_token}`;
      if (!video) {
        getLiveVideo();
      }
    }
  }, [user, access_token, video, getLiveVideo]);
  const Main = getAuthenticatedNavigator(user, access_token);
  // create our app's navigation stack
  const switchNavigator = createSwitchNavigator(
    {
      AuthStackNavigator,
      Main,
    },
    {
      initialRouteName: 'AuthStackNavigator',
    },
  );

  const AppContainer = createAppContainer(switchNavigator);

  return (
    <>
      {token && <Main />}
      {!access_token && <AppContainer />}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
