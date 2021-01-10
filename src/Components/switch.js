import React, {Component} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import PropTypes from 'prop-types';

const style = StyleSheet.create({
  defaultContainerStyle: {
    padding: 0,
    minHeight: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
  },
  defaultTitleStyle: {
    flex: 0,
    paddingLeft: 16,
    paddingRight: 8,
    fontSize: 16,
  },
  defaultDescriptionStyle: {
    flex: 0,
    paddingLeft: 16,
    paddingRight: 8,
    fontSize: 12,
  },
  defaultSwitchWrapperStyle: {
    flex: 0,
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 16,
  },
  defaultDisabledOverlayStyle: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  titleWrapper: {flex: 1, position: 'relative'},
});

class SettingsSwitch extends Component {
  render() {
    const {
      containerStyle,
      titleStyle,
      title,
      disabled,
      disabledOverlayStyle,
      switchWrapperStyle,
      value,
      trackColor,
      onValueChange,
      descriptionStyle,
      description,
    } = this.props;

    return (
      <View style={[style.defaultContainerStyle, containerStyle]}>
        <View style={style.titleWrapper}>
          <Text style={[style.defaultTitleStyle, titleStyle]}>{title}</Text>
          {description ? (
            <Text style={[style.defaultDescriptionStyle, descriptionStyle]}>
              {description}
            </Text>
          ) : null}
          {disabled ? (
            <View
              style={[
                style.defaultDisabledOverlayStyle,
                disabled ? disabledOverlayStyle : null,
              ]}
            />
          ) : null}
        </View>
        <View style={[style.defaultSwitchWrapperStyle, switchWrapperStyle]}>
          <Switch
            value={value}
            trackColor={trackColor}
            onValueChange={onValueChange}
            disabled={disabled}
          />
        </View>
      </View>
    );
  }
}

SettingsSwitch.defaultProps = {
  containerStyle: {},
  disabledOverlayStyle: {},
  titleStyle: {},
  descriptionStyle: {},
  description: null,
  switchWrapperStyle: {},
  disabled: false,
  trackColor: null,
};

SettingsSwitch.propTypes = {
  containerStyle: PropTypes.object,
  disabledOverlayStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
  descriptionStyle: PropTypes.object,
  description: PropTypes.string,
  switchWrapperStyle: PropTypes.object,
  value: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  trackColor: PropTypes.shape({
    true: PropTypes.string,
    false: PropTypes.string,
  }),
};
export default SettingsSwitch;
