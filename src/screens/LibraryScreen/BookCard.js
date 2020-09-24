import React from 'react';
import {
  CardItem,
  Text,
  Left,
  Right,
  Body,
  Icon,
  Thumbnail,
  Row,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {API_BASE_URL} from 'react-native-dotenv';

const BookCard = ({data, showBook}) => {
  const {
    title,
    author,
    genre,
    images,
    pages,
    isFavorited,
    isAvailable,
    availabilityDate,
  } = data;
  const getUrlThumbnail = () => {
    const image = images.filter((image) => image.type == 'thumbnail');
    return `${API_BASE_URL}/${image[0].media.path}`;
  };
  return (
    <CardItem>
      <Left>
        <TouchableOpacity onPress={() => showBook(data)}>
          <Thumbnail source={{uri: getUrlThumbnail()}} />
        </TouchableOpacity>

        <Body>
          <TouchableOpacity onPress={() => showBook(data)}>
            <Text>{title}</Text>
            <Text note>Auteur:{author} </Text>
            <Text note>Genre:{genre.name} </Text>
          </TouchableOpacity>
        </Body>
      </Left>
      <Right>
        <Body>
          <Text note>{pages} pages</Text>
          <Icon
            type="FontAwesome"
            name="star"
            style={{
              fontSize: 14,
              marginBottom: 10,
              color: isFavorited ? 'green' : 'gray',
            }}
          />
          <Row>
            <Icon
              type="FontAwesome"
              name="calendar-check-o"
              style={{
                fontSize: 14,
                marginBottom: -3,
                color: isAvailable ? 'green' : 'gray',
              }}
            />
            {availabilityDate && <Text note>{availabilityDate} </Text>}
          </Row>
        </Body>
      </Right>
    </CardItem>
  );
};
BookCard.propTypes = {
  data: PropTypes.object,
  showBook: PropTypes.func,
};

export default BookCard;
