/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  updateUserAssociation,
  receiveUserAssociationData,
  receiveAssociationData,
} from '../store/reducers/associationRedux';
import {
  white,
  gray3,
  black,
  gray,
  orange2,
  orangeBackgroud,
} from '../Utils/colors';

const styles = StyleSheet.create({
  activeAssociation: {
    height: 140,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cb8347', //'#57a1bf',
    borderRadius: 10,
    marginRight: 14,
    borderWidth: 0.5,
    borderColor: '#dddddd',
  },
  noActiveAssociation: {
    height: 140,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    borderRadius: 10,
    marginRight: 14,
    borderWidth: 0.5,
    borderColor: '#57a1bf',
  },
  selAllIconbg: {
    width: 70,
    height: 70,
    backgroundColor: white,
    borderRadius: 35,
    marginBottom: 10,
    justifyContent: 'center',
  },
  textNoActiveAssociation: {
    color: black,
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.6,
  },
  textActiveAssociation: {
    color: white,
    fontSize: 14,
    fontWeight: '500',
  },
});

class AssociationMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleAssociaiton: [],
      hideMenu: false,
      fadeAnim: new Animated.Value(0),
    };
  }

  hide = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 900,
    }).start();
    this.setState(() => ({hideMenu: false}));
  };

  show = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 155,
      duration: 900,
    }).start();
    this.setState(() => ({hideMenu: true}));
  };

  componentDidMount = () => {
    const {userAssociationList, dispatch} = this.props;
    dispatch(receiveAssociationData());
    dispatch(receiveUserAssociationData());
    this.setState({
      toggleAssociaiton: userAssociationList,
    });
  };

  handleToggleAssociation = (id) => {
    const {dispatch} = this.props;
    const {toggleAssociaiton} = this.state;
    const include = Object.values(toggleAssociaiton).includes(id);

    if (include && toggleAssociaiton.length === 1) {
      Alert.alert(
        'Opération non permise',
        'Vous devez selectionner au moins une association',
      );
    } else {
      const newUserAssociationList = include
        ? Object.values(toggleAssociaiton).filter((item) => item !== id)
        : [...toggleAssociaiton, id];

      this.setState({
        toggleAssociaiton: newUserAssociationList,
      });
      dispatch(updateUserAssociation(newUserAssociationList));
    }
  };

  handleHideMenu = () => {
    this.setState((prevState) => ({hideMenu: !prevState.hideMenu}));
  };

  render() {
    const {screenerTitle, associationList, userAssociationList} = this.props;
    const {hideMenu} = this.state;
    return (
      <View>
        <View
          style={{flexDirection: 'row', paddingTop: 50, paddingHorizontal: 14}}>
          <View>
            <Text style={{fontSize: 26, fontWeight: '700'}}>Bienvenue, </Text>
            <Text style={{fontSize: 22, fontWeight: '500', opacity: 0.6}}>
              {`Dans votre espace ${screenerTitle}`}
            </Text>
          </View>
          <View style={{position: 'absolute', right: 20, bottom: 5}}>
            {hideMenu ? (
              <TouchableOpacity onPress={() => this.hide()}>
                <Icon
                  name="angle-double-down"
                  color={black}
                  size={28}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.show()}>
                <Icon
                  name="angle-double-right"
                  color={black}
                  size={28}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Animated.View style={{height: this.state.fadeAnim}}>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              paddingHorizontal: 14,
            }}>
            <FlatList
              data={associationList}
              keyExtractor={(item) => `${item.id}`}
              horizontal
              inverted
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.handleToggleAssociation(item.id)}
                    style={
                      Object.values(userAssociationList).includes(item.id)
                        ? styles.activeAssociation
                        : styles.noActiveAssociation
                    }>
                    <Image
                      style={styles.selAllIconbg}
                      source={require('../../assets/images/AIMF.png')}
                    />
                    <Text
                      style={
                        Object.values(userAssociationList).includes(item.id)
                          ? styles.textActiveAssociation
                          : styles.textNoActiveAssociation
                      }>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Animated.View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  const {
    loading,
    associationList,
    userAssociationList,
  } = state.associationStore;

  return {
    loading,
    associationList: associationList === undefined ? [] : associationList,
    userAssociationList:
      userAssociationList === undefined ? [] : userAssociationList,
  };
}

AssociationMenu.propTypes = {
  loading: PropTypes.bool,
  associationList: PropTypes.array,
  dispatch: PropTypes.func,
  screenerTitle: PropTypes.string,
};

export default connect(mapStateToProps)(AssociationMenu);
