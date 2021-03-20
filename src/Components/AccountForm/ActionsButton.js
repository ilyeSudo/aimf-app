import React from 'react';
import SpinnerButton from 'react-native-spinner-button';
import {Text, TouchableOpacity} from 'react-native';
import * as PropTypes from 'prop-types';
import styles from './css';
import {
  CREATE_ACCOUNT_ACTION,
  UPDATE_ACCOUNT_ACTION,
} from '../../Utils/Constants';

const ActionsButton = (props) => {
  const spinnerButtonStyle = {
    ...styles.registerButton,
    marginBottom: props.action === UPDATE_ACCOUNT_ACTION ? 100 : 0,
  };
  return (
    <>
      <SpinnerButton
        buttonStyle={spinnerButtonStyle}
        onPress={() => props.onValidate()}
        indicatorCount={10}
        spinnerType="SkypeIndicator">
        <Text style={styles.nextButtonText}>
          {props.action === CREATE_ACCOUNT_ACTION ? 'Continuer' : 'Valider'}
        </Text>
      </SpinnerButton>

      {props.action === CREATE_ACCOUNT_ACTION ? (
        <TouchableOpacity
          onPress={() => props.navigation.navigate('LoginScreen')}
          activeOpacity={0.6}
          style={styles.loginLink}>
          <Text>Vous êtes déjà inscrit? Cliquez ici</Text>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

ActionsButton.propTypes = {
  navigation: PropTypes.object,
  action: PropTypes.string,
  onValidate: PropTypes.func,
};

export default ActionsButton;
