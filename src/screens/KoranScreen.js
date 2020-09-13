/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  RefreshControl,
  YellowBox,
  SafeAreaView,
} from 'react-native';
import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import {formatDateWithDayAndMonthName} from '../Utils/Functions';
import KoranItem from '../Components/KoranScreen/KoranItem';
import AssociationMenu from '../Components/AssociationMenu';
import {
  ayncReceiveKhatma,
  asyncReceiveUserKhatma,
} from '../store/reducers/khatmaRedux';
import {receiveKoran} from '../store/reducers/koranRedux';
import {white, black, orange2, orangeBackgroud} from '../Utils/colors';
import HistoryItem from '../Components/KoranScreen/HistoryItem';
import {isAdmin, isSuperAdmin} from '../Utils/Account';
import ErrorModal from '../Components/ErrorModal';
import Loader from '../Components/Loader';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: orangeBackgroud,
    paddingTop: 0,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: black,
  },
  panelHandle: {
    height: 5,
    width: 50,
    backgroundColor: orange2,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 6,
  },
});

class KoranScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  onRefresh = () => {
    const {dispatch} = this.props;
    dispatch(ayncReceiveKhatma());
    dispatch(asyncReceiveUserKhatma());
  };

  componentDidMount = () => {
    const {dispatch} = this.props;
    dispatch(ayncReceiveKhatma());
    dispatch(asyncReceiveUserKhatma());
    dispatch(receiveKoran());
  };

  renderKoranItem = ({item}) => {
    const {navigation, loading} = this.props;
    const date = formatDateWithDayAndMonthName(item.beginAt);
    let numberofPartDispo = 0;

    // eslint-disable-next-line array-callback-return
    Object.values(item.takharoubts).map((takharoubt) => {
      if (takharoubt.pickedTimes === 0) {
        numberofPartDispo += 1;
      }
    });

    return (
      <KoranItem
        key={item.id.toString()}
        title={date}
        numberofPartDispo={numberofPartDispo}
        loading={loading}
        associationName={item.association.name}
        associationLogo={item.association.logo}
        navigate={() => navigation.navigate('Khatma', {khatmaIdParam: item.id})}
      />
    );
  };

  renderHistoryItem = ({item}) => {
    const {navigation, loading} = this.props;
    const date = formatDateWithDayAndMonthName(item.beginAt);
    const numberOfPicks = item.userTakharoubts.length;
    let numberOfRead = 0;

    Object.values(item.userTakharoubts).map((takharoubt) => {
      if (takharoubt.isRead) {
        numberOfRead += 1;
      }
    });

    return (
      <HistoryItem
        key={item.id.toString()}
        title={date}
        numberOfPicks={numberOfPicks}
        numberOfRead={numberOfRead}
        loading={loading}
        associationName={item.association.name}
        associationLogo={item.association.logo}
        navigate={() => navigation.navigate('Khatma', {khatmaIdParam: item.id})}
      />
    );
  };

  render() {
    const {khatmaHistory, openKhatma, loading, account} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <AssociationMenu screenerTitle="Khatma" />
        <ScrollView scrollEventThrottle={16}>
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <View style={{marginTop: 15, paddingHorizontal: 15}}>
                <Text style={styles.textHeader}>Mes Prochaines Khatma</Text>
              </View>

              {openKhatma.length === 0 ? (
                <View
                  style={{marginTop: 10, paddingHorizontal: 30, height: 200}}>
                  <Text style={styles.textDetails}>
                    Aucune Khatma n'est ouverte à ce jour.
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={Object.values(openKhatma).sort((a, b) => {
                    return b.id - a.id;
                  })}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={this.renderKoranItem}
                  horizontal
                  refreshControl={
                    <RefreshControl
                      refreshing={loading}
                      onRefresh={this.onRefresh}
                      title="Chargement..."
                    />
                  }
                />
              )}
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: white,
                borderRadius: 24,
                padding: 14,
              }}>
              <View style={styles.panelHandle} />
              <View>
                <Text style={styles.textHeader}>Mon Historique</Text>
              </View>
              {khatmaHistory.length === 0 ? (
                <View
                  style={{
                    marginTop: 10,
                    paddingHorizontal: 30,
                  }}>
                  <Text style={styles.textDetails}>
                    Vous n'avez à ce jour partcipé à aucune Khatma
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    marginBottom: 10,
                    marginTop: 15,
                  }}>
                  <FlatList
                    data={Object.values(khatmaHistory).sort((a, b) => {
                      return b.id - a.id;
                    })}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={this.renderHistoryItem}
                    refreshControl={
                      <RefreshControl
                        refreshing={loading}
                        onRefresh={this.onRefresh}
                        title="Chargement..."
                      />
                    }
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        {(isAdmin(account.user) || isSuperAdmin(account.user)) && (
          <View
            style={{
              flexDirection: 'row-reverse',
            }}>
            <Button
              transparent
              style={{
                borderRadius: 50,
                marginRight: 20,
                marginBottom: 10,
                width: 46,
                backgroundColor: orange2,
                justifyContent: 'center',
              }}
              onPress={() => this.props.navigation.navigate('AddKhatma')}>
              <Icon
                name="plus"
                color={white}
                size={24}
                style={{alignSelf: 'center', justifyContent: 'center'}}
              />
            </Button>
          </View>
        )}
        {this.props.errorMessage && (
          <ErrorModal visible message={this.props.errorMessage} />
        )}
        <Loader visible={!!this.props.loading} />
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  const {userAssociationList} = state.associationStore;

  const openKhatma = Object.values(state.khatmaStore.khatma).filter(
    (khatma) => {
      return (
        khatma.isOpen &&
        Object.values(userAssociationList).includes(khatma.association.id)
      );
    },
  );

  const khatmaHistory = Object.values(state.khatmaStore.userKhatma).filter(
    (khatma) => {
      return (
        !khatma.isOpen &&
        khatma.userTakharoubts.length > 0 &&
        Object.values(userAssociationList).includes(khatma.association.id)
      );
    },
  );

  const {errorMessage} = state.errorMessageStore;

  return {
    khatmaHistory,
    openKhatma,
    loading: state.khatmaStore.loading || state.associationStore.loading,
    account: state.accountStore,
    errorMessage,
  };
}

KoranScreen.propTypes = {
  khatmaHistory: PropTypes.array,
  openKhatma: PropTypes.array,
  loading: PropTypes.bool,
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
  account: PropTypes.object,
};

export default connect(mapStateToProps)(KoranScreen);
