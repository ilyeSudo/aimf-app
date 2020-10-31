import React from 'react';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {successColor} from '../Utils/colors';
import PropTypes from 'prop-types';

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

GradientButton.propTypes = {
  bgColor1: PropTypes.string,
  bgColor2: PropTypes.string,
  callback: PropTypes.Function,
  style: PropTypes.object,
};

export default GradientButton;
