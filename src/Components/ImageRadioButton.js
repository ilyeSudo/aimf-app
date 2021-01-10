import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import * as PropTypes from 'prop-types';

class ImageRadioButton extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        {this.props.options.map((row) => {
          return (
            <View key={row.value}>
              {this.props.value === row.value ? (
                <TouchableOpacity>
                  <Image
                    style={{width: 60, height: 60}}
                    source={row.selectedImage}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => this.props.onPress(row.value)}>
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
  }
}

ImageRadioButton.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  onPress: PropTypes.func,
};

export default ImageRadioButton;
