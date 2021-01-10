import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CostumItemList from '../../Components/KoranScreen/CostumItemList';
import TextButton from '../../Components/KoranScreen/TextButton';
import ErrorModal from '../../Components/ErrorModal';
import Loader from '../../Components/Loader';
import {
  saveUserPicksReads,
  saveUserReads,
  updateKhatma,
} from '../../store/reducers/khatmaRedux';
import {formatDateWithDayAndMonthName} from '../../Utils/Functions';
import {black, orange2, backgroundColor} from '../../Utils/colors';
import {
  isAdmin,
  isSpecifiedAssociationAdmin,
  isSuperAdmin,
} from '../../Utils/Account';
import CostumHeader from '../../Components/KoranScreen/CostumHeader';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 50,
    paddingHorizontal: 14,
    marginBottom: 10,
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 24,
    fontWeight: '700',
    color: black,
  },
  textDetails: {
    fontSize: 16,
    fontWeight: '300',
    paddingHorizontal: 5,
    marginTop: 10,
    marginBottom: 10,
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
    width,
    backgroundColor: orange2,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 6,
  },
});

class Khatma extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      toggleUserToReadList: [],
      toggleUserReadList: [],
    };
  }

  componentDidMount = () => {
    const {userReadList, userToReadList, isOpen} = this.props;

    this.setState({
      toggleUserToReadList: userToReadList,
      toggleUserReadList: userReadList,
      isOpen,
    });
  };

  onChangeOpenKhetma = () => {
    const {khatma, dispatch} = this.props;
    const newState = !this.state.isOpen;

    this.setState((prevState) => ({isOpen: !prevState.isOpen}));
    dispatch(updateKhatma(khatma.id, newState));
  };

  onChangeToggleToRead = (id) => {
    const {toggleUserToReadList} = this.state;
    const {userToReadList, koranStore} = this.props;
    const include = Object.values(toggleUserToReadList).includes(id);
    const includeInToRead = Object.values(userToReadList).includes(id);
    const koranListe = koranStore.koranListe.data;

    if (includeInToRead) {
      Alert.alert(
        'Opération non permise',
        `Vous avez déjà validé la selection de  ${koranListe[id - 1].name}.
            Vous ne pouvez pas annuler une selection déjâ validée`,
      );
    } else {
      // eslint-disable-next-line no-unused-expressions
      include
        ? this.setState((prevState) => ({
            toggleUserToReadList: prevState.toggleUserToReadList.filter(
              (item) => item !== id,
            ),
          }))
        : this.setState((prevState) => ({
            toggleUserToReadList: [...prevState.toggleUserToReadList, id],
          }));
    }
  };

  onChangeToggleRead = (id) => {
    const {toggleUserReadList} = this.state;
    const {userReadList, koranStore} = this.props;
    const include = Object.values(toggleUserReadList).includes(id);
    const includeInRead = Object.values(userReadList).includes(id);
    const koranListe = koranStore.koranListe.data;

    if (includeInRead) {
      Alert.alert(
        'Opération non permise',
        `Vous avez déjà validé la lecture de  ${koranListe[id - 1].name}.
            Vous ne pouvez pas annuler une lecture déjâ validée`,
      );
    } else {
      // eslint-disable-next-line no-unused-expressions
      include
        ? this.setState((prevState) => ({
            toggleUserReadList: prevState.toggleUserReadList.filter(
              (item) => item !== id,
            ),
          }))
        : this.setState((prevState) => ({
            toggleUserReadList: [...prevState.toggleUserReadList, id],
          }));
    }
  };

  dispatchAndNavigate = () => {
    const {dispatch, khatma, navigation} = this.props;
    const {toggleUserToReadList, toggleUserReadList, isOpen} = this.state;
    if (isOpen) {
      dispatch(
        saveUserPicksReads(khatma.id, toggleUserToReadList, toggleUserReadList),
      );
    } else {
      dispatch(saveUserReads(khatma.id, toggleUserReadList));
    }
    navigation.navigate('KoranTimeLine');
  };

  validateUserChoise = (event) => {
    event.preventDefault();
    const {toggleUserToReadList, toggleUserReadList} = this.state;

    if (toggleUserToReadList.length || toggleUserReadList.length) {
      Alert.alert(
        'Confirmation',
        // body
        'Vous êtes sur le point de valider votre selection',
        [
          {
            text: 'Confirmer',
            onPress: () => this.dispatchAndNavigate(),
          },
          {
            text: 'Annuler',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        {cancelable: false},
        // clicking out side of alert will not cancel
      );
    } else {
      Alert.alert(
        'Aucune selection',
        'Merci de bien vouloir sélectioner une Takheroubt à lire',
      );
    }
  };

  render() {
    const {toggleUserToReadList, toggleUserReadList, isOpen} = this.state;
    const {koranStore, khatma, userToReadList, user, loading} = this.props;
    const numberOfToRead = userToReadList.length;
    const koranListe = koranStore.koranListe.data;

    if (loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <CostumHeader
          title="Khatmat"
          subtitle={formatDateWithDayAndMonthName(khatma.beginAt)}
          associationName={khatma.association.name}
          associationLogo={khatma.association.logo}
          navigation={this.props.navigation}
          validate={this.validateUserChoise}
          rightIcon="send"
          renderLogo
        />
        <ScrollView scrollEventThrottle={16}>
          {(isSuperAdmin(user) ||
            isAdmin(user) ||
            isSpecifiedAssociationAdmin(user, khatma.association.name)) &&
            (isOpen ? (
              <TextButton
                style={{marginTop: 10}}
                onPress={this.onChangeOpenKhetma}>
                Fermer cette Khetma
              </TextButton>
            ) : (
              <TextButton
                style={{marginTop: 10}}
                onPress={this.onChangeOpenKhetma}>
                Ouvrir cette Khetma
              </TextButton>
            ))}

          {numberOfToRead > 0 && (
            <View>
              <View style={{marginTop: 40, paddingHorizontal: 20}}>
                <Text style={styles.textHeader}>
                  Valider la lecture de vos Tekheroubines
                </Text>
                <Text style={styles.textDetails}>
                  Vous avez choisi dans cette Khatma {numberOfToRead}{' '}
                  {numberOfToRead === 1 ? 'Takheroubt' : ' Tikheroubine'}. Merci
                  de confirmer vos lectures.
                </Text>
              </View>

              <View>
                {userToReadList.map((id) => {
                  const alreadyReadByAuthedUser = Object.values(
                    toggleUserReadList,
                  ).includes(id);
                  const numberOfReader = 0;
                  return (
                    <CostumItemList
                      key={koranListe[id - 1].id}
                      text={koranListe[id - 1].name}
                      colorText={!!alreadyReadByAuthedUser}
                      value={alreadyReadByAuthedUser}
                      id={koranListe[id - 1].id}
                      numberOfReader={numberOfReader}
                      onChangeToggle={this.onChangeToggleRead}
                      badge={false}
                    />
                  );
                })}
              </View>
            </View>
          )}

          {isOpen && (
            <View>
              <View style={{marginTop: 40, paddingHorizontal: 20}}>
                <Text style={styles.textHeader}>
                  Choisir une ou plusieurs Tekheroubines
                </Text>
                {!numberOfToRead && (
                  <View>
                    <Text style={styles.textDetails}>
                      Vous n&apos;avez encore choisi aucune Takheroubt dans
                      cette Khatma.
                    </Text>
                    <Text style={styles.textDetails}>
                      Privilégier une Takheroubte qui n&apos;a pas encore été
                      prise.
                    </Text>
                  </View>
                )}
              </View>
              <View>
                {Object.keys(koranListe).map((index) => {
                  const alreadyPickedByAuthedUser = Object.values(
                    toggleUserToReadList,
                  ).includes(koranListe[index].id);
                  const numberOfReader = khatma.takharoubts[index].pickedTimes;
                  return (
                    <CostumItemList
                      key={koranListe[index].id}
                      text={koranListe[index].name}
                      colorText={
                        !!(numberOfReader || alreadyPickedByAuthedUser)
                      }
                      value={alreadyPickedByAuthedUser}
                      numberOfReader={numberOfReader}
                      id={koranListe[index].id}
                      onChangeToggle={this.onChangeToggleToRead}
                      badge={numberOfReader > 0}
                    />
                  );
                })}
              </View>
            </View>
          )}
        </ScrollView>
        {this.props.errorMessage && (
          <ErrorModal visible message={this.props.errorMessage} />
        )}
        <Loader visible={!!this.props.loading} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, {navigation}) => {
  const {khatmaIdParam} = navigation.state.params;
  const {user} = state.accountStore;
  const currentKhatma = Object.values(state.khatmaStore.khatma).filter(
    (khatma) => {
      return khatma.id === khatmaIdParam;
    },
  );
  const currentUserKhatma = Object.values(state.khatmaStore.userKhatma).filter(
    (userKhatma) => {
      return userKhatma.id === khatmaIdParam;
    },
  );
  const userToReadList = currentUserKhatma.length
    ? Object.values(currentUserKhatma[0].userTakharoubts).map(
        (userTakharoubts) => {
          return userTakharoubts.takharoubt;
        },
      )
    : [];
  const read = currentUserKhatma.length
    ? Object.values(currentUserKhatma[0].userTakharoubts).filter(
        (userTakharoubts) => {
          return userTakharoubts.isRead;
        },
      )
    : [];

  const userReadList = read.length
    ? Object.values(read).map((userTakharoubts) => {
        return userTakharoubts.takharoubt;
      })
    : [];

  const {errorMessage} = state.errorMessageStore;

  return {
    koranStore: state.koranStore,
    khatma: currentKhatma[0],
    isOpen: currentKhatma[0].isOpen,
    loading: state.koranStore.loading || state.khatmaStore.loading,
    userReadList,
    userToReadList,
    user,
    errorMessage,
  };
};

Khatma.propTypes = {
  koranStore: PropTypes.object,
  khatma: PropTypes.object,
  isOpen: PropTypes.bool,
  loading: PropTypes.bool,
  userReadList: PropTypes.array,
  userToReadList: PropTypes.array,
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
  user: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default connect(mapStateToProps)(Khatma);
