import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import * as PropTypes from 'prop-types';

const ImageRadioButton = (props) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      {props.options.map((row) => {
        return (
          <View key={row.value}>
            {props.value === row.value ? (
              <TouchableOpacity>
                <Image
                  style={{width: 60, height: 60}}
                  source={row.selectedImage}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => props.onPress(row.value)}>
                <Image
                  style={{width: 60, height: 60}}
                  source={row.unselectedImage}
                />
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );
};

ImageRadioButton.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  onPress: PropTypes.func,
};

export default ImageRadioButton;
