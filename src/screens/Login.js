import React from 'react';
import {Text, TouchableOpacity, Image, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import SpinnerButton from 'react-native-spinner-button';
import ErrorModal from '../Components/ErrorModal';
import {CREDENTIALS_EMPTY_ERROR} from '../Utils/Constants';
import {dispatchErrorMessage} from '../store/reducers/errorMessageRedux';
import {login} from '../store/reducers/authenticationRedux';
import {navigate} from '../Utils/Account';
import RenderInput from '../Components/RenderInput';
import RenderPassword from '../Components/RenderPassoword';
import styles from './Login/css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidUpdate() {
    if (this.props.loadingLiveVideo === false) {
      navigate(
        this.props.account,
        this.props.navigation,
        'Login',
        this.props?.video?.isLive,
      );
    }
  }

  handleLogin = () => {
    const {email, password} = this.state;
    if (!email || !password) {
      this.props.dispatchErrorMessage(CREDENTIALS_EMPTY_ERROR);
      return;
    }

    this.props.login(email, password);
  };

  render() {
    const {email, password} = this.state;
    const logo = require('../../assets/images/app_icon_text.png');
    return (
      <>
        <ScrollView style={styles.bodyWrapper}>
          <Image
            style={{
              width: 200,
              height: 130,
              borderRadius: 9,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            source={logo}
          />
          <RenderInput
            keyboardType="email-address"
            onChange={(value) => this.setState({email: value})}
            value={email}
            placeholder="Adresse email"
            itemStyle={styles.inputItem}
          />
          <RenderPassword
            onChange={(value) => this.setState({password: value})}
            value={password}
            placeholder="Mot de passe"
            itemStyle={styles.inputItem}
          />
          <View style={styles.loginButtonContainer}>
            <SpinnerButton
              buttonStyle={styles.loginButton}
              isLoading={this.props.loading}
              onPress={this.handleLogin}
              spinnerType="SkypeIndicator">
              <Text style={styles.nextButtonText}>Connexion</Text>
            </SpinnerButton>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUp')}
            activeOpacity={0.6}>
            <Text style={styles.createAccount}>
              Vous n&apos;avez pas encore un compte?
            </Text>
          </TouchableOpacity>
        </ScrollView>
        {this.props.errorMessage && (
          <ErrorModal visible message={this.props.errorMessage} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {errorMessage} = state.errorMessageStore;
  const {loading} = state.authenticationStore;
  const {loading: loadingLiveVideo, video} = state.liveVideoStore;
  return {
    errorMessage,
    loading,
    loadingLiveVideo,
    video,
    account: state.accountStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(login(email, password));
    },
    dispatchErrorMessage: (errorMessage) => {
      dispatch(dispatchErrorMessage(errorMessage));
    },
  };
};

Login.propTypes = {
  errorMessage: PropTypes.string,
  dispatchErrorMessage: PropTypes.func,
  login: PropTypes.func,
  navigation: PropTypes.object,
  loading: PropTypes.bool,
  account: PropTypes.object,
  loadingLiveVideo: PropTypes.bool,
  video: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
