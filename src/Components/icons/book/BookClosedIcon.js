import React from 'react';
import Svg, {Path} from 'react-native-svg';
import PropTypes from 'prop-types';
import {View} from 'react-native';

const BookClosedIcon = ({color}) => {
  const renderSvg = () => {
    return (
      <Svg
        width="12"
        height="15"
        viewBox="0 0 12 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M11.5429 11.2594C11.5556 11.2469 11.581 11.2344 11.5937 11.2219C11.8349 11.1471 11.9873 10.9227 11.9873 10.6733V0.710723C11.9873 0.32419 11.6698 0 11.2635 0H2.71746C1.21905 0 0 1.19701 0 2.66833V12.8304V13.0175H0.0126984C0.0380952 13.3791 0.165079 13.7157 0.368254 14.0274C0.774603 14.6384 1.47302 15 2.22222 15H11.5429C11.7587 15 11.9365 14.8628 11.9746 14.6384C12.0508 14.4264 11.9238 14.2145 11.746 14.1272C11.581 14.0399 11.1492 13.5287 11.1492 12.8304C11.1365 11.9825 11.4286 11.3466 11.5429 11.2594ZM10.4 11.6459H7.51746C7.26349 11.6459 7.07302 11.8329 7.07302 12.0823C7.07302 12.3317 7.26349 12.5187 7.51746 12.5187H10.2603C10.2476 12.6185 10.2476 12.7307 10.2476 12.8304C10.2476 12.8554 10.2476 12.8678 10.2476 12.8928H8.26667C8.0127 12.8928 7.82222 13.0798 7.82222 13.3292C7.82222 13.5786 8.0127 13.7656 8.26667 13.7656H10.4127C10.4635 13.8903 10.5143 14.015 10.5905 14.1397H2.20952C1.76508 14.1397 1.34603 13.9152 1.10476 13.5536C0.850794 13.1796 0.825397 12.6933 1.01587 12.2693C1.25714 11.6833 1.87936 11.2968 2.57778 11.2968H10.5143C10.4762 11.3965 10.4381 11.5212 10.4 11.6459ZM11.1111 0.872818V10.4115H2.46349C1.86667 10.4115 1.32063 10.611 0.888889 10.985V2.66833C0.888889 1.67082 1.70159 0.872818 2.71746 0.872818H11.1111ZM3.07302 6.07232H8.92698C9.51111 6.07232 9.98095 5.62344 9.98095 5.03741V3.31671C9.98095 2.7182 9.48571 2.23192 8.87619 2.23192H3.12381C2.51429 2.23192 2.01905 2.7182 2.01905 3.31671V5.04988C2.01905 5.62344 2.47619 6.07232 3.07302 6.07232ZM2.90794 3.31671C2.90794 3.19202 2.99683 3.10474 3.12381 3.10474H8.87619C9.00317 3.10474 9.09206 3.19202 9.09206 3.31671V5.04988C9.09206 5.14963 9.02857 5.21197 8.92698 5.21197H3.07302C2.97143 5.21197 2.90794 5.14963 2.90794 5.04988V3.31671ZM4.54603 3.65337C4.54603 3.40399 4.73651 3.21696 4.99048 3.21696H7.26349C7.51746 3.21696 7.70794 3.40399 7.70794 3.65337C7.70794 3.90274 7.51746 4.08978 7.26349 4.08978H4.99048C4.73651 4.08978 4.54603 3.91521 4.54603 3.65337ZM3.53016 4.65087C3.53016 4.4015 3.72063 4.21446 3.9746 4.21446H8.0127C8.26667 4.21446 8.45714 4.4015 8.45714 4.65087C8.45714 4.90025 8.26667 5.08728 8.0127 5.08728H3.9746C3.72063 5.08728 3.53016 4.90025 3.53016 4.65087Z"
          fill={color || '#000'}
        />
      </Svg>
    );
  };

  return <View>{renderSvg()}</View>;
};

BookClosedIcon.propTypes = {
  color: PropTypes.string,
};

export default BookClosedIcon;
