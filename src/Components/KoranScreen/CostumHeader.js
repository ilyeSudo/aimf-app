/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {black, orange2} from '../../Utils/colors';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingTop: 50,
    paddingHorizontal: 14,
    marginBottom: 10,
    justifyContent: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    width: width,
    backgroundColor: orange2,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 6,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class CostumHeader extends Component {
  render() {
    const {title, associationName, validate, navigation} = this.props;

    return (
      <View>
        <View style={styles.header}>
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              top: 65,
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
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('../../../assets/images/AIMF.png')}
              />
              <Text style={styles.textLogo}>{associationName}</Text>
            </View>
            <View style={{marginLeft: 10, justifyContent: 'center'}}>
              <Text style={styles.title}>Khatmat</Text>
              <Text style={styles.textInfo}>{title}</Text>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              top: 65,
              right: 20,
              marginLeft: 20,
            }}>
            <TouchableOpacity onPress={(event) => validate(event)}>
              <Icon
                name="send"
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

export default CostumHeader;
