import React from 'react';
import {CardItem, Text, Left, Body, Thumbnail, Button} from 'native-base';
import {Alert, View} from 'react-native';

import PropTypes from 'prop-types';
import {API_BASE_URL} from 'react-native-dotenv';

import {isoDateToFr} from '../../Utils/Functions';
import {OCalendarIcon} from '../../Components/icons/CalendarIcon';
import {LIBRARY_STR} from '../../Utils/Constants';

const styles = {
  thumbnail: {
    borderRadius: 3,
    height: 80,
    width: 57,
  },
};

const BookReturnCard = ({data, confirmReturnBook}) => {
  console.log(`start BookReturnCard: ${JSON.stringify(data)}`);

  const {book, returnDate, copyNumber} = data;
  const getUrlThumbnail = () => {
    const image = book.images.filter((value) => value.type === 'thumbnail');
    return `${API_BASE_URL}/${image[0].media.path}`;
  };
  const getDateStr = (date) => {
    return isoDateToFr(date, false);
  };

  const createConfirmationAlert = () =>
    Alert.alert(
      'Confirmation de retour du livre ',
      `Titre :${data.book.title}\n` + `Copy:${data.copyNumber}\n`,
      [
        {
          text: 'Annulé',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Oui, je confirme', onPress: () => confirmReturnBook(data)},
      ],
      {cancelable: false},
    );
  return (
    <CardItem
      style={{
        alignItems: 'center',
        marginHorizontal: 5,
        elevation: 4,
        marginVertical: 5,
      }}>
      <Left>
        <Thumbnail
          style={{...styles.thumbnail}}
          source={{uri: getUrlThumbnail()}}
        />
        <Body>
          <Text>{book.title}</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text note>copy: {copyNumber} </Text>
            <OCalendarIcon color="gray" size={20} />
            <Text note> le {getDateStr(returnDate)} </Text>
          </View>
          <View>
            <Button transparent onPress={() => createConfirmationAlert()}>
              <Text>{LIBRARY_STR.confirm_return_book}</Text>
            </Button>
          </View>
        </Body>
      </Left>
    </CardItem>
  );
};
BookReturnCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BookReturnCard;
