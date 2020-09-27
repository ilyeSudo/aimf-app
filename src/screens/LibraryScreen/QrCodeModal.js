import React from 'react';
import {Text, Modal, TouchableHighlight, View} from 'react-native';
import {Icon} from 'native-base';
import * as PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode-svg';

const QrCodeModal = ({label, qrCodeString, visible, onClose}) => {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: '#FFF',
          alignItems: 'center',
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          minHeight: 200,
          borderWidth: 1,
          borderColor: '#d7d7d7',
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <TouchableHighlight onPress={onClose}>
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
          {label}
        </Text>
        <QRCode value={qrCodeString} />
      </View>
    </Modal>
  );
};

QrCodeModal.propTypes = {
  qrCodeString: PropTypes.string,
  visible: PropTypes.bool,
};
export default QrCodeModal;
