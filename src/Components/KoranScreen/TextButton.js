import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {purple} from '../../Utils/colors';

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: purple,
  },
});
function TextButton({children, onPress, style = {}}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

TextButton.propTypes = {
  children: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
};
export default TextButton;
