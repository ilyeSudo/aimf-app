import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import * as PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {API_BASE_URL} from 'react-native-dotenv';
import {black, orange2} from '../../Utils/colors';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    marginBottom: 10,
    justifyContent: 'center',
    height: 50,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 35,
  },
  textLogo: {
    color: black,
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.8,
  },
  title: {
    color: black,
    fontSize: 16,
    fontWeight: '600',
  },
  textInfo: {
    color: black,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 2,
  },
  panelHandle: {
    height: 2,
    width,
    backgroundColor: orange2,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 6,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class CostumHeader extends Component {
  render() {
    const {
      title,
      subtitle,
      associationName,
      associationLogo,
      validate,
      navigation,
      rightIcon,
      renderLogo,
    } = this.props;

    return (
      <View>
        <View style={styles.header}>
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              top: 15,
              left: 20,
              marginRight: 20,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="chevron-left"
                color={black}
                size={26}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {renderLogo && (
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={{
                    uri: `${API_BASE_URL}/${associationLogo}`,
                  }}
                />
                <Text style={styles.textLogo}>{associationName}</Text>
              </View>
            )}

            <View
              style={{
                marginLeft: 10,
                justifyContent: 'center',
              }}>
              <Text style={styles.title}>{title}</Text>
              {subtitle && <Text style={styles.textInfo}>{subtitle}</Text>}
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              top: 15,
              right: 20,
              marginLeft: 20,
            }}>
            <TouchableOpacity onPress={(event) => validate(event)}>
              <Icon
                name={rightIcon}
                color={black}
                size={26}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.panelHandle} />
      </View>
    );
  }
}
CostumHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  associationName: PropTypes.string,
  associationLogo: PropTypes.string,
  validate: PropTypes.func,
  navigation: PropTypes.object,
  rightIcon: PropTypes.string,
  renderLogo: PropTypes.bool,
};

export default CostumHeader;
