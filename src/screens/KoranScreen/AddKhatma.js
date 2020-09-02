import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Alert, Text, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import CostumHeader from '../../Components/KoranScreen/CostumHeader';
import {black, orangeBackgroud} from '../../Utils/colors';
import {ayncSaveKhatma} from '../../store/reducers/khatmaRedux';
import {formatDateWithDayAndMonthName} from '../../Utils/Functions';
import DatePicker from '../../Components/DatePicker';
import SelectAssociation from '../../Components/SelectAssociation';
import {isAdmin, isSuperAdmin} from '../../Utils/Account';
import {AIMF_ASSOCIATION_ID} from '../../Utils/Constants';

const styles = StyleSheet.compose({
  container: {
    flex: 1,
    backgroundColor: orangeBackgroud,
    paddingTop: 0,
  },
  title: {
    color: black,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 10,
    width: 320,
  },
});

class AddKhatma extends Component {
  constructor(props) {
    super(props);
    this.state = {chosenDate: new Date(), associationId: AIMF_ASSOCIATION_ID};
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  addKhatma = () => {
    const {dispatch, navigation} = this.props;
    const {chosenDate, associationId} = this.state;
    dispatch(ayncSaveKhatma(chosenDate, associationId));
    navigation.navigate('KoranTimeLine');
  };

  alertAddKhetma = (event) => {
    event.preventDefault();
    const {chosenDate} = this.state;
    const date = chosenDate ? formatDateWithDayAndMonthName(chosenDate) : null;

    // eslint-disable-next-line no-unused-expressions
    chosenDate
      ? Alert.alert(
          'Confirmation',
          // body
          `Vous êtes sur le point de créer une Khatma en date du ${date}`,
          [
            {
              text: 'Confirmer',
              onPress: () => this.addKhatma(),
            },
            {
              text: 'Annuler',
              onPress: () => {},
              style: 'cancel',
            },
          ],
          {cancelable: false},
          // clicking out side of alert will not cancel
        )
      : // eslint-disable-next-line no-alert
        Alert.alert('Merci de bien vouloir sélection une date');
  };

  render() {
    const {associationId} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <CostumHeader
          title="Ajouter une Khatma"
          navigation={this.props.navigation}
          validate={this.alertAddKhetma}
          rightIcon="plus"
        />
        <View style={{flex: 1}}>
          <DatePicker
            labelStyle={styles.title}
            label="Sélectionner la data de la Khatma"
            defaultDate={this.state.chosenDate}
            minimumDate={new Date()}
            onCustomChange={(date) => this.setState({chosenDate: date})}
          />
          {isSuperAdmin(this.props.user) && associationId && (
            <View style={{marginLeft: 0, width: 320, marginBottom: 50}}>
              <Text style={styles.title}>Sélectionner l'association</Text>
              <SelectAssociation
                selectedAssociationId={associationId}
                onChangeItem={(item) => {
                  this.setState({
                    associationId: item.id,
                  });
                }}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const {errorMessage} = state.errorMessageStore;
  const {user} = state.accountStore;
  return {
    errorMessage,
    user,
  };
};

AddKhatma.propTypes = {
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(AddKhatma);
