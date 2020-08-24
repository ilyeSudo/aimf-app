/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import {gray, black, white} from '../../Utils/colors';

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    color: black,
  },
  textDetails: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 5,
    marginBottom: 5,
    color: black,
  },
  textInfo: {
    flex: 1,
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: '600',
    color: gray,
  },
  panelItemContainer: {
    borderWidth: 0.6,
    borderColor: black,
    padding: 14,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  logo: {
    height: 30,
    width: 30,
    backgroundColor: '#000',
    borderRadius: 40,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogo: {
    color: black,
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
});

export default function HistoryItem(props) {
  const {
    title,
    numberOfPicks,
    numberOfRead,
    associationName,
    navigate,
    loading,
  } = props;
  return (
    <View style={styles.cardConatiner}>
      <TouchableOpacity onPress={navigate} disabled={loading}>
        <View
          style={{
            backgroundColor: loading ? '#f7f7f7' : white,
          }}>
          <View style={styles.panelItemContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/images/AIMF.png')}
                style={styles.logo}
              />
              <Text style={styles.textLogo}> {associationName} </Text>
            </View>

            <View
              style={{
                flex: 1,
                marginLeft: 20,
              }}>
              <Text style={styles.textHeader}>{title}</Text>
              <Text style={styles.textDetails}>
                Vous avez dans cette Khatma
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
                marginRight: 10,
                marginTop: 5,
              }}>
              <Text style={styles.textInfo}>Pris: {numberOfPicks}</Text>
              <Text style={styles.textInfo}>Lu: {numberOfRead}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

HistoryItem.propTypes = {
  title: PropTypes.string,
  numberOfPicks: PropTypes.number,
  numberOfRead: PropTypes.number,
  loading: PropTypes.bool,
  navigate: PropTypes.func,
};
