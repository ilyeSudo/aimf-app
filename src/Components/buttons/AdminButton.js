import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'native-base';
import * as PropTypes from 'prop-types';
import BookClosedIcon from '../icons/book/BookClosedIcon';

const styles = StyleSheet.create({
  topButtonContainer: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row-reverse',
  },
  coloredButton: {
    backgroundColor: '#CB8347',
    shadowOffset: {width: 4, height: 4},
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 5,
    borderRadius: 3,
    elevation: 7,
    paddingVertical: 3,
    paddingHorizontal: 7,
    height: 35,
  },
  colorButtonText: {
    marginHorizontal: 5,
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 13,
  },
});
const AdminButton = ({textButton, onPress}) => {
  return (
    <View
      style={{
        ...styles.topButtonContainer,
      }}>
      <Button
        transparent
        style={{...styles.coloredButton}}
        onPress={() => onPress()}>
        <BookClosedIcon color="#fff" />
        <Text style={styles.colorButtonText}>{textButton}</Text>
      </Button>
    </View>
  );
};

AdminButton.propTypes = {
  onPress: PropTypes.func,
  textButton: PropTypes.string,
};
export default AdminButton;
