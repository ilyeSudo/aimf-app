import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Col, Container, Content, Icon, Row, View} from 'native-base';
import moment from 'moment';
import {ActivityIndicator, Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import PropTypes from 'prop-types';
import {
  cancelBooking,
  requestBooking,
  validateBooking,
} from '../../store/reducers/bookRedux';
import {dispatchErrorMessage} from '../../store/reducers/errorMessageRedux';
import DatePicker from '../../Components/DatePicker';
import RenderInput from '../../Components/RenderInput';
import {
  isCorrectNumberCopie,
  isCorrectPhoneNumber,
} from '../../Utils/Functions';
import {
  failColor,
  failDarkColor,
  mainColor,
  mainColor2Button,
} from '../../Utils/colors';
import GradientButton from '../../Components/GradientButton';

const styles = {
  labelStyle: {
    color: mainColor,
    fontWeight: 'bold',
    fontSize: 15,
  },
  valueTextStyle: {
    fontSize: 15,
  },
  buttonStyle: {
    marginBottom: 10,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
  },
};

const getQrCodeBooking = (qrCodeBooking) => {
  if (qrCodeBooking) {
    try {
      const objRequestBooking = JSON.parse(qrCodeBooking);
      const {bookId} = objRequestBooking;
      const {userId} = objRequestBooking;
      const {hash} = objRequestBooking;
      if (bookId && userId && hash) {
        return objRequestBooking;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      // console.log(e);
    }
  }
  return null;
};

const mapStateToProps = (state) => ({
  booking: state.bookStore.booking,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRequestBooking: (...args) => dispatch(requestBooking(...args)),
  dispatchValidateBooking: (...args) => dispatch(validateBooking(...args)),
  dispatchCancelBooking: (...args) => dispatch(cancelBooking(...args)),
  showErrorMessage: (...args) => dispatch(dispatchErrorMessage(...args)),
});

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
const buildInfo = (label, value) => {
  return {
    label,
    value,
  };
};

const BookReservation = ({
  booking,
  dispatchRequestBooking,
  dispatchValidateBooking,
  dispatchCancelBooking,
  navigation,
  showErrorMessage,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [returnDate, setReturnDate] = useState(addDays(new Date(), 15));
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [copyNumber, setCopyNumber] = useState('1');

  useEffect(() => {
    if (booking?.isLoading === false && booking?.user) {
      setPhoneNumber(booking.user?.phoneNumber);
      setReturnDate(booking.user?.returnDate);
      setAddress1(booking.user?.address1);
      setAddress2(booking.user?.address2);
      setZipCode(booking.user?.zipCode);
      setCity(booking.user?.city);
    }
  }, [booking]);

  const onSuccess = (e) => {
    // {"userId":58,"bookId":596,"hash":"DEFR569871548IJHU"}
    const qrCodeBooking = getQrCodeBooking(e.data);
    if (qrCodeBooking) {
      dispatchRequestBooking(qrCodeBooking);
    }
  };
  const checkBookingValues = () => {
    if (!returnDate) {
      return 'Veuillez renseigner la date de retour de livre.';
    }
    if (!phoneNumber) {
      return 'Veuillez renseigner le numéro de téléphone.';
    }
    if (!copyNumber) {
      return 'Veuillez renseigner le numéro de copie en chiffre';
    }
    if ((!address1 && !address2) || !zipCode || !city) {
      return "Veuillez renseigner l'addresse personnelle de celui qui va reserver le livre.";
    }
    if (!isCorrectPhoneNumber(phoneNumber)) {
      return 'Veuillez corriger le numéro de téléphone';
    }
    if (!isCorrectNumberCopie(copyNumber)) {
      return 'Veuillez corriger le numéro de copie en chiffre';
    }

    return null;
  };
  const onConfirmClicked = () => {
    const error = checkBookingValues();
    if (error) {
      showErrorMessage(error);
      return;
    }
    dispatchValidateBooking(
      {
        bookId: booking.book.id,
        userId: booking.user.id,
        address1,
        address2,
        zipCode,
        city,
        phoneNumber,
        copyNumber,
        returnDate,
      },
      navigation,
    );
  };
  const onCancelClicked = () => {
    dispatchCancelBooking();
    navigation.goBack();
  };

  if (!booking) {
    return (
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text>
            scanner le QrCode de réservation à partir de téléphone du membre
          </Text>
        }
      />
    );
  }
  if (booking.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }
  const bookInfo = [];
  bookInfo.push(buildInfo('Titre', booking.book.title));
  bookInfo.push(buildInfo('Pour', booking.user.firstName));
  bookInfo.push(buildInfo('Genre', booking.book.genre.name));
  bookInfo.push(buildInfo('Rayon', booking.book.shelf));

  return (
    <Container>
      <Content>
        <View style={{paddingVertical: 10}}>
          {bookInfo.map(({label, value}) => {
            return (
              <Row
                key={label}
                style={{paddingHorizontal: 30, alignItems: 'center'}}>
                <Col style={{flex: 1, paddingVertical: 5}}>
                  <Text style={styles.labelStyle}>{label}</Text>
                </Col>
                {/* <View style={{width:7, height:7, backgroundColor: mainColor, borderRadius:50, marginRight: -4}}></View> */}
                <Col style={{flex: 5, paddingLeft: 10}}>
                  <Text style={styles.valueTextStyle}>{value}</Text>
                </Col>
              </Row>
            );
          })}
        </View>

        <RenderInput
          checkFunction={isCorrectPhoneNumber}
          label="Téléphone"
          maxLength={10}
          keyboardType="numeric"
          onChange={setPhoneNumber}
          required
          value={phoneNumber}
        />
        <RenderInput
          label="Adresse 1"
          keyboardType="default"
          onChange={setAddress1}
          required
          value={address1}
        />
        <RenderInput
          label="Adresse 2"
          keyboardType="default"
          onChange={setAddress1}
          value={address2}
        />
        <RenderInput
          label="Code postal"
          keyboardType="numeric"
          onChange={setZipCode}
          required
          value={zipCode}
        />
        <RenderInput
          label="Ville"
          keyboardType="default"
          onChange={setCity}
          required
          value={city}
        />
        <RenderInput
          label="Copie"
          keyboardType="numeric"
          onChange={setCopyNumber}
          value={copyNumber}
        />
        <DatePicker
          minimumDate={new Date()}
          label="Date de retour prévu"
          defaultDate={returnDate && moment(returnDate).toDate()}
          onCustomChange={(date) => setReturnDate(date)}
        />

        <GradientButton
          bgColor1={mainColor2Button}
          bgColor2={mainColor}
          style={styles.buttonStyle}
          callback={onConfirmClicked}>
          <Icon
            name="checkmark-sharp"
            type="Ionicons"
            style={{color: 'white'}}
          />
          <Text style={styles.textButton}>Confirmer la réservation</Text>
        </GradientButton>

        <GradientButton
          bgColor1={failColor}
          bgColor2={failDarkColor}
          style={styles.buttonStyle}
          callback={onCancelClicked}>
          <Icon name="close-sharp" type="Ionicons" style={{color: 'white'}} />
          <Text style={styles.textButton}>Annuler la réservation</Text>
        </GradientButton>
      </Content>
    </Container>
  );
};
BookReservation.navigationOptions = {
  headerTitle: 'Validation de la réservation',
  headerTitleStyle: {
    textAlign: 'center',
    flex: 1,
  },
};

BookReservation.propTypes = {
  booking: PropTypes.object,
  dispatchRequestBooking: PropTypes.func.isRequired,
  dispatchValidateBooking: PropTypes.func.isRequired,
  dispatchCancelBooking: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  showErrorMessage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookReservation);
