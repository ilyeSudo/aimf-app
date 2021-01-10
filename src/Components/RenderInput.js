import {Icon, Input, Item, Label} from 'native-base';
import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './AccountForm/css';

const RenderInput = ({
  label,
  value,
  required,
  checkFunction,
  onChange,
  keyboardType,
  maxLength = 128,
  disabled,
  itemStyle,
  placeholder,
}) => {
  return (
    <>
      {label && (
        <Label style={styles.label}>
          {label}
          {required ? '*' : ''}
        </Label>
      )}
      <Item
        rounded
        style={{...(itemStyle || styles.inputItem), borderRadius: 4}}
        success={
          value !== null &&
          checkFunction !== undefined &&
          value.length > 0 &&
          checkFunction(value)
        }
        error={
          value !== null &&
          checkFunction !== undefined &&
          value.length > 0 &&
          !checkFunction(value)
        }>
        <Input
          style={styles.input}
          keyboardType={keyboardType || 'default'}
          maxLength={maxLength}
          onChangeText={onChange}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
        />
        {value && checkFunction !== undefined && value.length > 0 ? (
          <Icon
            name={checkFunction(value) ? 'checkmark-circle' : 'close-circle'}
            style={checkFunction(value) ? styles.green : styles.red}
          />
        ) : null}
      </Item>
    </>
  );
};

RenderInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  checkFunction: PropTypes.func,
  onChange: PropTypes.func,
  keyboardType: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  itemStyle: PropTypes.object,
  placeholder: PropTypes.string,
};

export default RenderInput;
