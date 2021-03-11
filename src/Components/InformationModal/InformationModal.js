import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {Button, Icon} from 'native-base';
import * as PropTypes from 'prop-types';
import styles from './css';

const InformationModal = (props) => {
  const {setVisible} = props;

  return (
    <Modal animationType="slide" transparent visible={props.visible}>
      <View
        style={{
          position: 'absolute',
          right: '5%',
          left: '5%',
          top: '30%',
          width: '90%',
          backgroundColor: '#FFF',
          alignItems: 'center',
          height: 'auto',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#cbcbcb',
          paddingBottom: 4,
        }}>
        <View
          style={{
            height: 35,
            backgroundColor: '#ebebeb',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            color: '#525252',
            marginBottom: 30,
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
            borderWidth: 1,
            borderColor: '#cbcbcb',
          }}>
          <Text style={{marginLeft: 15, marginTop: 5, fontSize: 15}}>
            {props.title}
          </Text>
          <TouchableHighlight onPress={() => setVisible(false)}>
            <Icon
              name="close"
              type="AntDesign"
              style={{color: '#949494', fontSize: 20, margin: 5}}
            />
          </TouchableHighlight>
        </View>
        <View style={{paddingHorizontal: 10}}>{props.children}</View>
        {props.onConfirm && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Button
              rounded
              danger
              style={styles.button}
              onPress={() => {
                setVisible(false);
                props.onConfirm();
              }}>
              <Text style={styles.buttonText}>Confirmer</Text>
            </Button>
            <Button
              rounded
              danger
              style={{...styles.button, backgroundColor: '#757575'}}
              onPress={() => setVisible(false)}>
              <Text style={styles.buttonText}>Annuler</Text>
            </Button>
          </View>
        )}
      </View>
    </Modal>
  );
};

InformationModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  setVisible: PropTypes.func,
  onConfirm: PropTypes.func,
  children: PropTypes.array,
};

export default InformationModal;
