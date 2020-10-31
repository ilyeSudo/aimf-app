import React, {Component} from 'react';
import {View} from 'react-native';
import IconForms, {GRADIENT, OUTLINE} from './IconForms';
import PropTypes from 'prop-types';

class CustomIcon extends React.PureComponent {
  getGradient: Function;
  getOutline: Function;

  renderIcon() {
    switch (this.props.iconForm.form) {
      case OUTLINE:
        return this.getOutline();
      case GRADIENT:
        return this.getGradient();
      default:
        return undefined;
    }
  }

  render() {
    return <View>{this.renderIcon()}</View>;
  }
}

CustomIcon.propTypes = {
  iconForm: IconForms,
  color1: PropTypes.string,
  color2: PropTypes.string,
};

export default CustomIcon;
