import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import * as PropTypes from 'prop-types';

const TextRadioButton = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        height: 40,
        borderColor: '#c18b64',
        borderWidth: 2,
        marginBottom: 10,
      }}>
      {props.options.map((row, index) => {
        return props.value === row.value ? (
          <View
            key={row.value}
            style={{
              backgroundColor: '#c18b64',
              color: '#FFF',
              flex: 1,
              justifyContent: 'center',
              borderBottomLeftRadius: index === 0 ? 7 : 0,
              borderTopLeftRadius: index === 0 ? 7 : 0,
              borderBottomRightRadius:
                index === props.options.length - 1 ? 7 : 0,
              borderTopRightRadius: index === props.options.length - 1 ? 7 : 0,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#FFF',
                  textAlignVertical: 'center',
                  fontSize: 18,
                }}>
                {row.label}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            key={row.value}
            style={{
              backgroundColor: '#FFF',
              color: '#c18b64',
              fontSize: 15,
              flex: 1,
              justifyContent: 'center',
              borderBottomLeftRadius: index === 0 ? 7 : 0,
              borderTopLeftRadius: index === 0 ? 7 : 0,
              borderBottomRightRadius:
                index === props.options.length - 1 ? 7 : 0,
              borderTopRightRadius: index === props.options.length - 1 ? 7 : 0,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              onPress={() => props.onPress(row.value)}>
              <Text
                style={{
                  color: '#c18b64',
                  textAlignVertical: 'center',
                  fontSize: 18,
                }}>
                {row.label}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

TextRadioButton.propTypes = {
  value: PropTypes.string,
  onPress: PropTypes.func,
  options: PropTypes.array,
};

export default TextRadioButton;
