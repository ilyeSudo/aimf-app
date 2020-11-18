import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  requestBooking,
  validateBooking,
  cancelBooking,
} from '../../store/reducers/bookRedux';
import {dispatchErrorMessage} from '../../store/reducers/errorMessageRedux';
import {Container, Icon, View, Content, Row, Col} from 'native-base';
import DatePicker from '../../Components/DatePicker';
import moment from 'moment';
import {Text, ActivityIndicator} from 'react-native';
import RenderInput from '../../Components/RenderInput';
import {
  isCorrectPhoneNumber,
  isCorrectNumberCopie,
} from '../../Utils/Functions';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {
  failColor,
  failDarkColor,
  mainColor,
  successColor,
  backgroundColor,
  secondaryColor,
  mainColor2Button,
} from '../../Utils/colors';
import GradientButton from '../../Components/GradientButton';

const mapStateToProps = (state) => ({
  booking: state.bookStore.booking,
});
const mapDispatchToProps = (dispatch) => ({
  requestBooking: (...args) => dispatch(requestBooking(...args)),
  validateBooking: (...args) => dispatch(validateBooking(...args)),
  cancelBooking: (...args) => dispatch(cancelBooking(...args)),
  dispatchErrorMessage: (...args) => dispatch(dispatchErrorMessage(...args)),
});
const getQrCodeBooking = (qrCodeBooking) => {
  if (qrCodeBooking) {
    try {
      const objRequestBooking = JSON.parse(qrCodeBooking);
      const bookId = objRequestBooking.bookId;
      const userId = objRequestBooking.userId;
      const hash = objRequestBooking.hash;
      if (bookId && userId && hash) {
        return objRequestBooking;
      }
    } catch (e) {
      alert(e);
    }
    return null;
  }
};
const addDays = (date, days) => {
  var result = new Date(date);
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
  requestBooking,
  validateBooking,
  cancelBooking,
  navigation,
  dispatchErrorMessage,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [returnDate, setReturnDate] = useState(addDays(new Date(), 15));
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [copyNumber, setCopyNumber] = useState('1');

  useEffect(() => {
    if (booking && booking.isLoading == false) {
      booking.user.phoneNumber && setPhoneNumber(booking.user.phoneNumber);
      booking.user.returnDate && setReturnDate(booking.user.returnDate);
      booking.user.address1 && setAddress1(booking.user.address1);
      booking.user.address2 && setAddress2(booking.user.address2);
      booking.user.zipCode && setZipCode(booking.user.zipCode);
      booking.user.city && setCity(booking.user.city);
    }
  }, [booking]);

  const onSuccess = (e) => {
    //{"userId":58,"bookId":596,"hash":"DEFR569871548IJHU"}
    const qrCodeBooking = getQrCodeBooking(e.data);
    if (qrCodeBooking) {
      requestBooking(qrCodeBooking);
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
      dispatchErrorMessage(error);
      return;
    }
    validateBooking(
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
    cancelBooking();
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
  } else {
    if (booking.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    } else {
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
                  <Row style={{paddingHorizontal: 30, alignItems: 'center'}}>
                    <Col style={{flex: 1, paddingVertical: 5}}>
                      <Text style={styles.labelStyle}>{label}</Text>
                    </Col>
                    {/*<View style={{width:7, height:7, backgroundColor: mainColor, borderRadius:50, marginRight: -4}}></View>*/}
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
                type={'Ionicons'}
                style={{color: 'white'}}
              />
              <Text style={styles.textButton}>Confirmer la réservation</Text>
            </GradientButton>

            <GradientButton
              bgColor1={failColor}
              bgColor2={failDarkColor}
              style={styles.buttonStyle}
              callback={onCancelClicked}>
              <Icon
                name="close-sharp"
                type={'Ionicons'}
                style={{color: 'white'}}
              />
              <Text style={styles.textButton}>Annuler la réservation</Text>
            </GradientButton>
          </Content>
        </Container>
      );
    }
  }
};
BookReservation.navigationOptions = (navigationData) => {
  return {
    headerTitle: 'Validation de la réservation',
    headerTitleStyle: {
      textAlign: 'center',
      flex: 1,
    },
  };
};

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
export default connect(mapStateToProps, mapDispatchToProps)(BookReservation);
