import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {API_BASE_URL} from 'react-native-dotenv';
import PropTypes from 'prop-types';
import {gray, black, white} from '../../Utils/colors';

const styles = StyleSheet.create({
  khatmaCard: {
    elevation: 1,
    backgroundColor: white,
    width: 315,
    height: 280,
    borderRadius: 14,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  coverCard: {
    width: 315,
    height: 200,
    overflow: 'hidden',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  image: {
    width: 315,
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  content: {
    paddingLeft: 20,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 35,
  },
  textLogo: {
    color: black,
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  title: {
    color: black,
    fontSize: 16,
    fontWeight: '600',
  },
  textInfo: {
    color: gray,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 2,
  },
});

class KoranItem extends Component {
  khatmatext = () => {
    const {numberofPartDispo} = this.props;
    if (numberofPartDispo === 0) {
      return 'Cette Khatma est complète';
    }
    if (numberofPartDispo === 1) {
      return 'Dernière Takharoubt disponible';
    }
    return `${numberofPartDispo}Tikheroubines sont diponibles`;
  };

  render() {
    const {
      title,
      associationName,
      associationLogo,
      navigate,
      loading,
    } = this.props;

    return (
      <TouchableOpacity onPress={navigate} disabled={loading}>
        <View style={styles.khatmaCard}>
          <View style={styles.coverCard}>
            <Image
              style={styles.image}
              source={require('../../../assets/images/Khatma.png')}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={{
                  uri: `${API_BASE_URL}/${associationLogo}`,
                }}
              />
              <Text style={styles.textLogo}>{associationName}</Text>
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.textInfo}>Votre Khatma est ouverte</Text>
              <Text style={styles.textInfo}>{this.khatmatext()}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

KoranItem.propTypes = {
  title: PropTypes.string,
  numberofPartDispo: PropTypes.number,
  loading: PropTypes.bool,
  navigate: PropTypes.func,
  associationName: PropTypes.string,
  associationLogo: PropTypes.string,
};

export default KoranItem;
