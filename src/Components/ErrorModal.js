import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {dispatchErrorMessage} from '../store/reducers/errorMessageRedux';

const ErrorModal = (props) => {
  return (
    <Modal animationType="slide" transparent visible={props.visible}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: '#FFF',
          alignItems: 'center',
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          minHeight: 130,
          borderWidth: 1,
          borderColor: '#d7d7d7',
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <TouchableHighlight
          onPress={() => {
            props.dispatchErrorMessage(null);
          }}>
          <Icon
            name="close-circle"
            style={{color: '#f26060', marginTop: -16, fontSize: 35}}
          />
        </TouchableHighlight>

        <Text
          style={{
            color: '#f26060',
            fontSize: 17,
            fontWeight: 'bold',
            marginBottom: 30,
          }}>
          Erreur
        </Text>
        <Text style={{color: '#5d5d5d', fontSize: 15}}>{props.message}</Text>
      </View>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchErrorMessage: (errorMessage) =>
      dispatch(dispatchErrorMessage(errorMessage)),
  };
};

ErrorModal.propTypes = {
  visible: PropTypes.bool,
  dispatchErrorMessage: PropTypes.func,
  message: PropTypes.string,
};
export default connect(null, mapDispatchToProps)(ErrorModal);
