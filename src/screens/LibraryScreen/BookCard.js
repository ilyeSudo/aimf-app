import React from 'react';
import { CardItem, Text, Left, Body, Thumbnail, Button } from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { API_BASE_URL } from 'react-native-dotenv';
import { isoDateToFr } from '../../Utils/Functions';
import BookClosedIcon from '../../Components/icons/book/BookClosedIcon';

import {
  black,
  failColor,
  gray,
  mainColor,
  successColor,
  secondaryColor,
} from '../../Utils/colors';
import { LIBRARY_STR } from '../../Utils/Constants';
import HeartIcon from '../../Components/icons/HeartIcon';
import IconForms from '../../Components/icons/IconForms';

const styles = {
  cardContainer: {
    borderRadius: 3,
    marginHorizontal: 10,
    marginVertical: 3,
    display: 'flex',
    flexDirection: 'row',
    shadowColor: '#383838',
    shadowOpacity: 0.3,
    elevation: 4,
  },
  thumbnail: {
    borderRadius: 3,
    height: 100,
    width: 70,
  },
  title: {
    color: black,
    fontWeight: 'bold',
    fontFamily: 'Magra-Bold',
    fontSize: 14,
  },
  subtitle: {
    color: gray,
    fontWeight: '700',
    fontSize: 13,
    fontFamily: 'Magra',
  },
  category: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 11,
    color: mainColor,
  },
  bottomContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  statusInfo: {
    fontSize: 12,
    color: '#9F9F9F',
    marginLeft: 0,
    marginRight: 8,
    fontFamily: 'Raleway-Regular',
  },
};

const BookCard = ({ data, showBook, returnBook }) => {
  const {
    title,
    author,
    genre,
    images,
    pages,
    isFavorited,
    isAvailable,
    availabilityDate,
    isManager,
  } = data;

  const getUrlThumbnail = () => {
    const image = images.filter((value) => value.type === 'thumbnail');
    return `${API_BASE_URL}/${image[0].media.path}`;
  };

  const renderStatusIndicator = (value) => {
    return (
      <View
        style={{
          borderRadius: 50,
          width: 9,
          height: 9,
          marginHorizontal: 5,
          backgroundColor: value ? successColor : failColor,
        }}
      />
    );
  };

  return (
    <TouchableOpacity onPress={() => showBook(data)}>
      <CardItem style={styles.cardContainer}>
        <Left style={{ flex: 1 }}>
          <Thumbnail
            style={{ ...styles.thumbnail }}
            source={
              images && images.length
                ? { uri: getUrlThumbnail() }
                : require('../../../assets/images/book-cover-placeholder.png')
            }
          />

          <Body style={{ flex: 4 }}>
            <Text style={styles.category}>
              {`${LIBRARY_STR.category}: ${genre.name}`}
            </Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{author} </Text>
            <View style={styles.bottomContainer}>

              {isManager && (
                <View>
                  <Button
                    transparent
                    onPress={() => returnBook(data)}>
                    <BookClosedIcon color="#fff" />
                    <Text style={styles.colorButtonText}>
                      {LIBRARY_STR.return_book}
                    </Text>
                  </Button>
                </View>
              )}

              <Text style={styles.statusInfo}>{`${pages}p`}</Text>

              {renderStatusIndicator(isAvailable)}
              {isAvailable && (
                <Text style={styles.statusInfo}>{LIBRARY_STR.available}</Text>
              )}
              {availabilityDate && (
                <Text style={styles.statusInfo}>
                  {LIBRARY_STR.available_at +
                    isoDateToFr(availabilityDate.toString(), false)}{' '}
                </Text>
              )}
              {isFavorited ? (
                <HeartIcon
                  iconForm={IconForms.gradient()}
                  color1={mainColor}
                  color2={secondaryColor}
                />
              ) : (
                  <HeartIcon iconForm={IconForms.outline()} color1={black} />
                )}
            </View>
          </Body>
        </Left>
      </CardItem>
    </TouchableOpacity>
  );
};
BookCard.propTypes = {
  data: PropTypes.object.isRequired,
  showBook: PropTypes.func,
};

export default BookCard;
