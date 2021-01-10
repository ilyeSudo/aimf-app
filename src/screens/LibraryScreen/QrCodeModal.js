import React from 'react';
import {Text, Modal, View, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import * as PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode-svg';
import {mainColor} from '../../Utils/colors';

const QrCodeModal = ({label, qrCodeString, visible, onClose}) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#FFF',
            alignItems: 'center',
            borderRadius: 20,
            minHeight: 200,
            borderWidth: 1,
            borderColor: '#d7d7d7',
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: 35,
              height: 35,
              borderRadius: 50,
              marginTop: -38,
            }}>
            <TouchableOpacity onPress={onClose}>
              <Icon
                name="close-circle"
                style={{
                  color: mainColor,
                  fontSize: 35,
                  marginTop: -2,
                  marginLeft: 1,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 17,
              textAlign: 'center',
              fontWeight: 'bold',
              marginBottom: 30,
            }}>
            {label}
          </Text>
          <View style={{borderColor: mainColor, borderWidth: 2, padding: 5}}>
            <QRCode value={qrCodeString} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

QrCodeModal.propTypes = {
  label: PropTypes.string,
  qrCodeString: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};
export default QrCodeModal;
