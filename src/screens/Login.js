import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Item, Input} from 'native-base';
import SpinnerButton from 'react-native-spinner-button';
import ErrorModal from '../Components/ErrorModal';
import {CREDENTIALS_EMPTY_ERROR} from '../Utils/Constants';
import {dispatchErrorMessage} from '../store/reducers/errorMessageRedux';
import {login} from '../store/reducers/authenticationRedux';
import {navigate} from '../Utils/Account';
import RenderInput from '../Components/RenderInput';
import RenderPassword from '../Components/RenderPassoword';

const styles = StyleSheet.create({
  bodyWrapper: {
    height: 550,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  createAccount: {
    textAlign: 'center',
  },
  inputItem: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 0,
    paddingHorizontal: 10,
    width: 300,
    borderRadius: 10,
  },
  input: {
    fontSize: 15,
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 150,
    borderRadius: 10,
    backgroundColor: '#cb8347',
  },
  nextButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

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
    const logo = require('../../assets/images/logo_transparent.png');
    return (
      <>
        <View style={styles.bodyWrapper}>
          <Image style={{width: 120, height: 120}} source={logo} />
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
          <SpinnerButton
            buttonStyle={styles.loginButton}
            isLoading={this.props.loading}
            onPress={this.handleLogin}
            spinnerType="SkypeIndicator">
            <Text style={styles.nextButtonText}>Connexion</Text>
          </SpinnerButton>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUp')}
            style={styles.touchable}
            activeOpacity={0.6}>
            <Text style={styles.createAccount}>
              Vous n&apos;avez pas encore un compte?
            </Text>
          </TouchableOpacity>
        </View>
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
