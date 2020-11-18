import React from 'react';
import {CardItem, Text, Left, Right, Body, Thumbnail, Row} from 'native-base';
import PropTypes from 'prop-types';
import {isoDateToFr} from '../../Utils/Functions';
import {API_BASE_URL} from 'react-native-dotenv';
import {gray} from '../../Utils/colors';
import {OCalendarIcon} from '../../Components/icons/CalendarIcon';
import {View} from 'react-native';

const BookReservationCard = ({data}) => {
  const {book, returnDate} = data;
  const getUrlThumbnail = () => {
    const image = book.images.filter((image) => image.type == 'thumbnail');
    return `${API_BASE_URL}/${image[0].media.path}`;
  };
  const getDateStr = (date) => {
    return isoDateToFr(date, false);
  };
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
            <OCalendarIcon color={'gray'} size={20} />
            <Text note> le {getDateStr(returnDate)} </Text>
          </View>
        </Body>
      </Left>
    </CardItem>
  );
};
BookReservationCard.propTypes = {
  data: PropTypes.object,
};

const styles = {
  thumbnail: {
    borderRadius: 3,
    height: 80,
    width: 57,
  },
};

export default BookReservationCard;
