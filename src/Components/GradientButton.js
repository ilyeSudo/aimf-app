import React from 'react';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import {successColor} from '../Utils/colors';

const styles = {
  buttonStyle: {
    color: successColor,
    borderRadius: 4,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  linearGradient: {
    borderRadius: 4,
    marginHorizontal: 27,
  },
};

const GradientButton = (props) => {
  const {bgColor1, bgColor2, callback, style} = props;

  return (
    <LinearGradient
      colors={[bgColor1, bgColor2]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      locations={[0, 0.9]}
      style={{...styles.linearGradient, ...style}}>
      <TouchableOpacity style={styles.buttonStyle} onPress={callback}>
        {props.children}
      </TouchableOpacity>
    </LinearGradient>
  );
};

GradientButton.propTypes = {
  bgColor1: PropTypes.string,
  bgColor2: PropTypes.string,
  callback: PropTypes.func,
  style: PropTypes.object,
  children: PropTypes.array,
};

export default GradientButton;
