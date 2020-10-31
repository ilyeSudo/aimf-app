import {Icon, Input, Item, Label} from 'native-base';
import React from 'react';
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
          rounded={true}
          style={{...itemStyle || styles.inputItem, borderRadius: 4}}
          success={
              value !== null &&
              checkFunction &&
              value.length > 0 &&
              checkFunction(value)
          }
          error={
              value !== null &&
              checkFunction &&
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
        {value && checkFunction && value.length > 0 ? (
          <Icon
            name={checkFunction(value) ? 'checkmark-circle' : 'close-circle'}
            style={checkFunction(value) ? styles.green : styles.red}
          />
        ) : null}
      </Item>
    </>
  );
};

export default RenderInput;
