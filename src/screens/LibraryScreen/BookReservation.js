// just for admin
// read QR code to retreive book and user
// Request Un new reseravation from back end
// Date de disponibilite
// saisir le numero d'examplaire s'il y a plusiur
// valider.
// send reservation to backend
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getFrDate } from "../../Utils/Functions";
import { requestBooking, validateBooking } from "../../store/reducers/bookRedux";
import { dispatchErrorMessage } from "../../store/reducers/errorMessageRedux";
import { Button, Container, Icon, Item, View, Label, Content } from "native-base";
import {
    Text,
    ActivityIndicator
} from 'react-native';
import { RenderInput } from "../../Components/ProfileForm/RenderFunctions";

import { isCorrectPhoneNumber } from "../../Utils/Functions";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import DatePicker from 'react-native-datepicker'


const mapStateToProps = (state) => ({
    booking: state.bookStore.booking,
});
const mapDispatchToProps = dispatch => ({
    requestBooking: (...args) => dispatch(requestBooking(...args)),
    validateBooking: (...args) => dispatch(validateBooking(...args)),
    dispatchErrorMessage: (...args) => dispatch(dispatchErrorMessage(...args)),

});
const getQrCodeBooking = (qrCodeBooking) => {
    if (qrCodeBooking) {
        try {
            const objRequestBooking = JSON.parse(qrCodeBooking);
            const idBook = objRequestBooking.idBook;
            const idMember = objRequestBooking.idMember;
            const hash = objRequestBooking.hash;
            if (idBook && idMember && hash)
                return objRequestBooking;
        } catch (e) {
            alert(e); // error in the above string (in this case, yes)!
        }
        return null;
    }

}
const BookReservation = ({ booking, requestBooking, validateBooking, navigation }) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [returnDate, setReturnDate] = useState(new Date());
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (booking && booking.isLoading == false) {
            setPhoneNumber(booking.phoneNumber);
            setReturnDate(booking.returnDate);
            setAddress(booking.address);
        }
    }, [booking]);
    const getDateStr = (date) => {
        return getFrDate(date, false);
    }
    const onSuccess = e => {
        //{"idMember":58,"idBook":596,"hash":"DEFR569871548IJHU"}
        const qrCodeBooking = getQrCodeBooking(e.data);
        if (qrCodeBooking) {
            requestBooking(qrCodeBooking);
        }
    };
    const checkBookingValues = () => {

        if (!returnDate) {
            return "Veuillez renseigner la date de retour de livre.";
        }
        if (!phoneNumber) {
            return "Veuillez renseigner le numéro de téléphone.";
        }
        if (!address) {
            return "Veuillez renseigner l'addresse personnelle de celui qui va reserver le livre.";
        }
        if (
            !isCorrectPhoneNumber(phoneNumber)) {
            return "Veuillez corriger le numéro de téléphone";
        }
        return null;
    };
    if (!booking) {
        return (
            <QRCodeScanner
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                    <Text >scanner le QrCode de réservation  à partir de téléphone du membre</Text>
                }

            />
        );
    } else {
        if (booking.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator animating size="large" />
                </View>
            );
        } else {
            const today = new Date();
            return (
                <Container>
                    <Content>

                        <Item regular>
                            <Label >Titre:{booking.title}</Label>
                        </Item>
                        <Item regular>
                            <Label >Pour : {booking.memberName}</Label>
                        </Item>

                        <Item regular>
                            <Label >Genre: {booking.genre}</Label>
                        </Item>
                        <Item regular>
                            <Label >Rayon: {booking.rayon}</Label>
                        </Item>


                        <RenderInput
                            label="Adresse"
                            keyboardType="default"
                            onChange={setAddress}
                            required
                            value={address}
                        />
                        <RenderInput
                            checkFunction={isCorrectPhoneNumber}
                            label="Téléphone"
                            maxLength={10}
                            keyboardType="numeric"
                            onChange={setPhoneNumber}
                            required
                            value={phoneNumber}
                        />
                        <Label >Sélectionner la date de retour de livre</Label>
                        <DatePicker
                            style={{ width: 200 }}
                            date={returnDate}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={setReturnDate}
                            getDateStr={getDateStr}
                        />
                        <Button rounded success
                            onPress={() => {
                                const error = checkBookingValues();
                                if (error) {
                                    dispatchErrorMessage(error);
                                    return;
                                }
                                validateBooking({
                                    idBook: booking.idBook,
                                    idMember: booking.idMember,
                                    address,
                                    phoneNumber,
                                    returnDate,
                                });

                                navigation.goBack();
                            }
                            }>
                            <Icon name='home' />
                            <Text>Confirmer la réservation</Text>
                        </Button>

                    </Content>
                </Container>
            );


        }
    }
}
BookReservation.navigationOptions = navigationData => {
    return {
        headerTitle: "Validation de la réservation",
        headerTitleStyle: {
            textAlign: "center",
            flex: 1
        },
    };

}
export default connect(mapStateToProps, mapDispatchToProps)(BookReservation);
