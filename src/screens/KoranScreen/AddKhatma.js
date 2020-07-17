import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Alert} from 'react-native';
import PropTypes from 'prop-types';
import CostumHeader from '../../Components/KoranScreen/CostumHeader';
import {gray3, black, white} from '../../Utils/colors';
import {ayncSaveKhatma} from '../../store/reducers/khatmaRedux';
import {formatDateWithDayAndMonthName} from '../../Utils/Functions';
import DatePicker from '../../Components/DatePicker';
const styles = StyleSheet.compose({
  container: {
    flex: 1,
    backgroundColor: white,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: black,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    margin: 10,
  },
});

class AddKhatma extends Component {
  constructor(props) {
    super(props);
    this.state = {chosenDate: 0};
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  addKhatma = () => {
    const {dispatch, navigation} = this.props;
    const {chosenDate} = this.state;
    dispatch(ayncSaveKhatma(chosenDate));
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
    return (
      <View style={{flex: 1, backgroundColor: gray3}}>
        <CostumHeader
          title="Ajouter une Khatma"
          isHome={false}
          navigation={this.props.navigation}
          validate={this.alertAddKhetma}
        />
        <View style={styles.container}>
          <DatePicker
            labelStyle={{marginLeft: 0, width: 320, ...styles.title}}
            label="Sélectionner la data de la prochaine Khatma"
            defaultDate={new Date()}
            minimumDate={new Date()}
            onCustomChange={(date) => this.setDate(date)}
          />
        </View>
      </View>
    );
  }
}

AddKhatma.propTypes = {
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect()(AddKhatma);
