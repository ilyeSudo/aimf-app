import React from 'react';
import Svg, {Defs, LinearGradient, Path, Stop} from 'react-native-svg';

import PropTypes from 'prop-types';
import {View} from 'react-native';
import {FILLED, GRADIENT, OUTLINE} from './IconForms';

class HeartIcon extends React.PureComponent {
  getGradient = (size = 15) => {
    return (
      <Svg
        width={size}
        height={size * 0.88}
        viewBox="0 0 17 15"
        xmlns="http://www.w3.org/2000/svg">
        <Defs>
          <LinearGradient
            id="paint0_linear"
            x1="8.5"
            y1="0"
            x2="4"
            y2="18"
            gradientUnits="userSpaceOnUse">
            <Stop offset="0.2" stopColor={this.props.color1} />
            <Stop offset="1.8" stopColor={this.props.color2} />
          </LinearGradient>
        </Defs>
        <Path
          d="M8.50259 14.8657L15.611 8.14326C16.9712 6.7751 17.3744 4.72306 16.6336 2.94193C15.8928 1.1606 14.153 0 12.224 0C10.9981 0 9.77222 0.86773 8.83686 1.80698L8.4987 2.14921L8.15239 1.8029C7.22091 0.871617 5.9991 0.00388681 4.77728 0.00388681C2.84534 0.00446984 1.10366 1.16818 0.363999 2.953C-0.375467 4.73783 0.0326487 6.7924 1.39808 8.15919L8.50259 14.8657Z"
          fill="url(#paint0_linear)"
        />
      </Svg>
    );
  };

  getFilled = (size = 15) => {
    return (
      <Svg
        width={size}
        height={size * 0.88}
        viewBox="0 0 17 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M8.50259 14.8657L15.611 8.14326C16.9712 6.7751 17.3744 4.72306 16.6336 2.94193C15.8928 1.1606 14.153 0 12.224 0C10.9981 0 9.77222 0.86773 8.83686 1.80698L8.4987 2.14921L8.15239 1.8029C7.22091 0.871617 5.9991 0.00388681 4.77728 0.00388681C2.84534 0.00446984 1.10366 1.16818 0.363999 2.953C-0.375467 4.73783 0.0326487 6.7924 1.39808 8.15919L8.50259 14.8657Z"
          fill={this.props.color1}
        />
      </Svg>
    );
  };

  getOutline = (size = 15) => {
    return (
      <Svg
        width={size}
        height={size * 0.88}
        viewBox="0 0 17 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M7.8342 13.9178L1.33983 7.78679C0.033904 6.48497 -0.358694 4.52455 0.345245 2.82021C1.04918 1.11587 2.7111 0.0041056 4.55503 0.00342134C5.82177 0.00342134 7.00453 0.920339 7.77365 1.6898L7.82924 1.74539L7.87937 1.69459C8.65019 0.921024 9.83466 0 11.11 0C12.9496 0.000171056 14.6084 1.1068 15.315 2.8055C16.0215 4.50402 15.6367 6.46068 14.3397 7.76541L14.3323 7.7731L7.8342 13.9178ZM4.55503 0.704111C2.9961 0.704453 1.59078 1.64361 0.99393 3.08382C0.39725 4.52403 0.726382 6.18184 1.82822 7.28471L7.8342 12.9537L13.8469 7.26965C14.9434 6.16508 15.2679 4.50915 14.6693 3.07236C14.0706 1.63557 12.6665 0.699834 11.11 0.70069C10.3041 0.70069 9.33189 1.22894 8.37717 2.18829L7.83249 2.73895L7.27858 2.18504C6.60235 1.50966 5.58177 0.704111 4.55503 0.704111Z"
          fill={this.props.color1}
        />
      </Svg>
    );
  };

  renderIcon() {
    switch (this.props.iconForm.form) {
      case OUTLINE:
        return this.getOutline(this.props.size);
      case GRADIENT:
        return this.getGradient(this.props.size);
      case FILLED:
        return this.getFilled(this.props.size);
      default:
        return undefined;
    }
  }

  render(): * {
    return <View>{this.renderIcon()}</View>;
  }
}

HeartIcon.propTypes = {
  iconForm: PropTypes.object,
  color1: PropTypes.string,
  color2: PropTypes.string,
  size: PropTypes.number,
};

export default HeartIcon;
