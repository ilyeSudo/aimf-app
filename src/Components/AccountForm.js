import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Item, Icon, Input, Label, Button} from 'native-base';
import SpinnerButton from 'react-native-spinner-button';
import * as PropTypes from 'prop-types';
import {
  isCorrectPhoneNumber,
  isCorrectName,
  isCorrectEmailAddress,
  isCorrectPassword,
  isCorrectZipCode,
} from '../Utils/Functions';
import styles from './AccountForm/css';

import {
  CREATE_ACTION,
  MARRIED,
  MALE_GENDER,
  SHOW_ACTION,
  SINGLE,
  UPDATE_ACTION,
  FEMALE_GENDER,
} from '../Utils/Constants';
import getRandomQuestionIndex from './AccountForm/Functions';
import ActionsButton from './AccountForm/ActionsButton';
import ChildrenInformation from './AccountForm/ChildrenInformation';
import RenderInput from './RenderInput';
import ImageRadioButton from './ImageRadioButton';
import TextRadioButton from './TextRadioButton';
import DatePicker from './DatePicker';

export default class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex1: null,
      questionIndex2: null,
    };
  }

  componentDidMount() {
    const {questions1, questions2, question1, question2} = this.props.data;
    if (question1) {
      this.props.updateState({question1});
      this.setState({
        questionIndex1: questions1.findIndex(
          (question) => question.id === question1.id,
        ),
      });
    }

    if (question2) {
      this.props.updateState({question2});
      this.setState({
        questionIndex2: questions2.findIndex(
          (question) => question.id === question2.id,
        ),
      });
    }
  }

  setDate(newDate) {
    this.props.updateState({birthday: newDate});
  }

  setQuestionIndex1 = () => {
    const {questionIndex1} = this.state;

    const newQuestionIndex1 = getRandomQuestionIndex(questionIndex1);
    const question1 = this.props.data.questions1[newQuestionIndex1];
    this.props.updateState({question1});
    this.setState({
      questionIndex1: newQuestionIndex1,
    });
  };

  setQuestionIndex2 = () => {
    const {questionIndex2} = this.state;
    const newQuestionIndex2 = getRandomQuestionIndex(questionIndex2);
    const question2 = this.props.data.questions2[newQuestionIndex2];
    this.props.updateState({question2});
    this.setState({
      questionIndex2: newQuestionIndex2,
    });
  };

  renderQuestionsBloc() {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: 300,
            marginLeft: 30,
          }}>
          <Label
            style={{
              fontWeight: 'bold',
              fontSize: 14,
              marginLeft: 30,
              width: 300,
            }}>
            {this.props.data.question1 && this.props.data.question1.question}*
          </Label>
          <SpinnerButton
            buttonStyle={styles.refreshButton}
            onPress={this.setQuestionIndex1}
            indicatorCount={10}
            spinnerType="SkypeIndicator">
            spinnerType="SkypeIndicator">
            <Icon style={{color: '#d3d3d3', fontSize: 14}} name="sync" />
          </SpinnerButton>
        </View>
        <Item rounded style={styles.inputItem}>
          <Input
            style={styles.input}
            autoCapitalize="sentences"
            keyboardType="default"
            onChangeText={(response1) => this.props.updateState({response1})}
            value={this.props.data.response1}
          />
        </Item>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 300,
            marginLeft: 30,
          }}>
          <Label
            style={{
              fontWeight: 'bold',
              fontSize: 14,
              width: 300,
            }}>
            {this.props.data.question2 && this.props.data.question2.question}*
          </Label>
          <SpinnerButton
            buttonStyle={styles.refreshButton}
            onPress={this.setQuestionIndex2}
            indicatorCount={10}
            spinnerType="SkypeIndicator">
            <Icon style={{color: '#d3d3d3', fontSize: 14}} name="sync" />
          </SpinnerButton>
        </View>
        <Item rounded style={styles.inputItem}>
          <Input
            style={styles.input}
            autoCapitalize="sentences"
            keyboardType="default"
            onChangeText={(response2) => this.props.updateState({response2})}
            value={this.props.data.response2}
          />
        </Item>
      </>
    );
  }

  render() {
    const {
      email,
      lastName,
      middleName,
      oldPassword,
      password,
      confirmPassword,
      fatherName,
      firstName,
      zipCode,
      phoneNumber,
      childrenNumber,
      maritalStatus,
      children,
      functionName,
      birthday,
      gender,
    } = this.props.data;

    const genderOptions = [
      {
        value: MALE_GENDER,
        selectedImage: require('../../assets/images/male_selected.png'),
        unselectedImage: require('../../assets/images/male_unselected.png'),
      },
      {
        value: FEMALE_GENDER,
        selectedImage: require('../../assets/images/female_selected.png'),
        unselectedImage: require('../../assets/images/female_unselected.png'),
      },
    ];

    const maritalStatusOptions = [
      {
        value: SINGLE,
        label: 'Célébataire(e)',
      },
      {
        value: MARRIED,
        label: 'Marié(e)',
      },
    ];

    return (
      <>
        <ScrollView
          centerContent
          style={{
            paddingTop: 20,
            opacity: this.props.scrollViewOpacity,
            backgroundColor: '#fce3ba',
          }}>
          <View>
            <Button
              transparent
              onPress={() => {
                if (this.props.action === UPDATE_ACTION) {
                  this.props.updateState({
                    ...this.props.initData,
                  });
                  this.props.updateAction(SHOW_ACTION);
                } else {
                  this.props.navigation.navigate('Login');
                }
              }}
              style={{borderRadius: 30, width: 50}}>
              <Icon
                style={{color: '#000'}}
                name="md-arrow-back"
                type="Ionicons"
              />
            </Button>
          </View>
          <Label style={styles.label}>Je suis *</Label>

          <ImageRadioButton
            options={genderOptions}
            value={gender}
            onPress={(value) => this.props.updateState({gender: value})}
          />
          <RenderInput
            checkFunction={isCorrectName}
            label="Nom"
            onChange={(value) => this.props.updateState({lastName: value})}
            required
            value={lastName}
          />
          <RenderInput
            checkFunction={isCorrectName}
            label="Nom jeune fille"
            onChange={(value) => this.props.updateState({middleName: value})}
            required={false}
            value={middleName}
          />
          <RenderInput
            checkFunction={isCorrectName}
            label="Fils(fille) de"
            onChange={(value) => this.props.updateState({fatherName: value})}
            required
            value={fatherName}
          />
          <RenderInput
            checkFunction={isCorrectName}
            label="Prénom"
            onChange={(value) => this.props.updateState({firstName: value})}
            required
            value={firstName}
          />
          <Label style={styles.label}>Situation conjugale*</Label>

          <TextRadioButton
            options={maritalStatusOptions}
            value={maritalStatus}
            onPress={(value) => this.props.updateState({maritalStatus: value})}
          />

          <DatePicker
            minimumDate={Date(1900, 1, 1)}
            maximumDate={Date()}
            label="Date de naissance*"
            defaultDate={new Date(birthday)}
            onCustomChange={(date) => this.setDate(date)}
          />

          {this.props.action === UPDATE_ACTION ? (
            <>
              <ChildrenInformation
                maritalStatus={maritalStatus}
                childrenNumber={childrenNumber}
                childrenInformation={children || []}
                updateState={(state) => this.props.updateState(state)}
              />
              <RenderInput
                checkFunction={isCorrectName}
                label="Fonction"
                onChange={(value) =>
                  this.props.updateState({functionName: value})
                }
                required
                value={functionName}
              />
            </>
          ) : null}
          <RenderInput
            checkFunction={isCorrectZipCode}
            label="Code postale"
            maxLength={5}
            keyboardType="numeric"
            onChange={(value) => this.props.updateState({zipCode: value})}
            required
            value={zipCode}
          />
          <RenderInput
            checkFunction={
              this.props.action === CREATE_ACTION && isCorrectEmailAddress
            }
            label="Email"
            keyboardType="email-address"
            onChange={(value) => this.props.updateState({email: value})}
            required
            disabled={this.props.action === UPDATE_ACTION}
            value={email}
            itemStyle={{
              ...styles.inputItem,
              opacity: this.props.action === CREATE_ACTION ? 1 : 0.5,
            }}
          />
          <RenderInput
            checkFunction={isCorrectPhoneNumber}
            label="Téléphone"
            maxLength={10}
            keyboardType="numeric"
            onChange={(value) => this.props.updateState({phoneNumber: value})}
            required
            value={phoneNumber}
          />
          {this.props.action === CREATE_ACTION
            ? this.renderQuestionsBloc()
            : null}

          {this.props.action === UPDATE_ACTION ? (
            <RenderInput
              checkFunction={isCorrectPassword}
              label="Ancien mot de passe"
              secureTextEntry
              onChange={(value) => this.props.updateState({oldPassword: value})}
              required={this.props.action === CREATE_ACTION}
              value={oldPassword}
            />
          ) : null}

          <RenderInput
            checkFunction={isCorrectPassword}
            label={
              this.props.action === UPDATE_ACTION
                ? 'Nouveau mot de passe'
                : 'Mot de passe'
            }
            secureTextEntry
            onChange={(value) => this.props.updateState({password: value})}
            required={this.props.action === CREATE_ACTION}
            value={password}
          />
          <RenderInput
            checkFunction={isCorrectPassword}
            label="Confirmer mot de passe"
            error={
              confirmPassword.length > 0 &&
              (!isCorrectPassword(confirmPassword) ||
                password !== confirmPassword)
            }
            secureTextEntry
            onChange={(value) =>
              this.props.updateState({confirmPassword: value})
            }
            required={this.props.action === CREATE_ACTION}
            value={confirmPassword}
          />
          <ActionsButton
            action={this.props.action}
            onValidate={() => this.props.onSubmit()}
            onCancel={() => this.props.updateAction(SHOW_ACTION)}
            data={this.state}
            navigation={this.props.navigation}
          />
        </ScrollView>
      </>
    );
  }
}

AccountForm.propTypes = {
  navigation: PropTypes.object,
  action: PropTypes.string,
  onSubmit: PropTypes.func,
  updateState: PropTypes.func,
  updateAction: PropTypes.func,
  data: PropTypes.object,
  scrollViewOpacity: PropTypes.number,
  initData: PropTypes.object,
};
