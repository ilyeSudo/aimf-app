import {
  isCorrectPhoneNumber,
  isCorrectName,
  isCorrectEmailAddress,
  isCorrectPassword,
  isCorrectZipCode,
} from '../../Utils/Functions';
import {
  CREATE_ACCOUNT_ACTION,
  MARRIED,
  UPDATE_ACCOUNT_ACTION,
} from '../../Utils/Constants';

const checkFormValues = (values) => {
  if (!values.gender) {
    return 'Veuillez renseigner votre sexe';
  }
  if (!values.lastName) {
    return 'Veuillez renseigner votre nom';
  }
  if (!values.fatherName) {
    return 'Veuillez renseigner le nom de votre père';
  }
  if (!values.firstName) {
    return 'Veuillez renseigner votre prenom';
  }
  if (!values.maritalStatus) {
    return 'Veuillez renseigner votre situation conjugale';
  }
  if (!values.birthday) {
    return 'Veuillez renseigner votre date de naissance';
  }
  if (!values.zipCode) {
    return 'Veuillez renseigner votre code postal';
  }
  if (!values.phoneNumber) {
    return 'Veuillez renseigner votre numéro de téléphone';
  }
  if (!values.email) {
    return 'Veuillez renseigner votre email';
  }
  if (values.action === CREATE_ACCOUNT_ACTION) {
    if (!values.response1) {
      return 'Veuillez renseigner la réponse à la première question';
    }
    if (!values.response2) {
      return 'Veuillez renseigner la réponse à la deuxième question';
    }
  }
  if (values.action === UPDATE_ACCOUNT_ACTION && !values.functionName) {
    return 'Veuillez renseigner votre fonction';
  }
  if (
    values.action === UPDATE_ACCOUNT_ACTION &&
    values.maritalStatus === MARRIED &&
    !(parseInt(values.childrenNumber, 10) >= 0)
  ) {
    return 'Veuillez renseigner le nombre de vos enfants scolarisés';
  }
  const errorsPAssword =
    values.action === CREATE_ACCOUNT_ACTION &&
    (!isCorrectPassword(values.password) ||
      !isCorrectPassword(values.confirmPassword));

  if (
    !isCorrectEmailAddress(values.email) ||
    !isCorrectName(values.lastName) ||
    !isCorrectName(values.firstName) ||
    !isCorrectName(values.middleName) ||
    (!values.action === UPDATE_ACCOUNT_ACTION &&
      isCorrectName(values.functionName)) ||
    !isCorrectPhoneNumber(values.phoneNumber) ||
    !isCorrectZipCode(values.zipCode) ||
    errorsPAssword
  ) {
    return 'Veuillez corriger les erreurs affichées dans le formulaire';
  }

  if (values.password !== values.confirmPassword) {
    return 'Les deux mots de passe doivent êtres identiques';
  }

  if (values.action === UPDATE_ACCOUNT_ACTION) {
    if (values.oldPassword && (!values.password || !values.confirmPassword)) {
      return 'Veuillez saisir le nouveau mot de passe et la confirmation de celui-ci';
    }
    if (!values.oldPassword && (values.password || values.confirmPassword)) {
      return 'Veuillez saisir le mot de passe actuel';
    }
  }

  if (values.action === CREATE_ACCOUNT_ACTION) {
    if (!values.readTermsOfUse) {
      return 'Veuillez lire et accépter les conditions générales';
    }
    if (!values.acceptTermsOfUse) {
      return 'Veuillez accépter les conditions générales';
    }
  }

  return null;
};

export default checkFormValues;
