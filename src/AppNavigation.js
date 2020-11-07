import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {adminUserTabNavigator, AuthStackNavigator} from './MainTabNavigator';
import axios from 'axios';
import {getLiveVideo} from './store/reducers/liveVideoRedux';
import {getAuthenticatedNavigator} from './Utils/Navigation';

const mapStateToProps = (state) => {
  const {video} = state.liveVideoStore;
  return {
    account: state.accountStore,
    video,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getLiveVideo: () => dispatch(getLiveVideo()),
  };
};

const AppNavigation = ({account, video, getLiveVideo}) => {
  // console.log('##############" video  : ', video);
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(account?.access_token);
    if (account && account.access_token) {
      axios.defaults.headers.Authorization = `Bearer ${account.access_token}`;
      if (!video) {
        getLiveVideo();
      }
    }
  }, [account, video, getLiveVideo]);
  const Main = getAuthenticatedNavigator(account);
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
      {!account?.access_token && <AppContainer />}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
