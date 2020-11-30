import React from 'react';
import {View} from 'react-native';
import IconForms, {GRADIENT, OUTLINE} from './IconForms';

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
};

export default CustomIcon;
