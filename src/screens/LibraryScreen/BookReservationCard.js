import React from 'react';
import {CardItem, Text, Left, Right, Body, Thumbnail, Row} from 'native-base';
import PropTypes from 'prop-types';
import {isoDateToFr} from '../../Utils/Functions';
import {API_BASE_URL} from 'react-native-dotenv';
import {gray} from "../../Utils/colors";

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
    <CardItem style={{borderBottomWidth: 0.5, borderBottomColor: gray, marginHorizontal: 10}}>
      <Left>
        <Thumbnail style={{...styles.thumbnail}} source={{uri: getUrlThumbnail()}} />
        <Body>
          <Text>{book.title}</Text>
          <Text style={{width: '100%', textAlign: 'right'}} note>le {getDateStr(returnDate)} </Text>
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
}

export default BookReservationCard;
