import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Card,
  CardItem,
  Icon,
  Container,
  Content,
  Body,
  Row,
  Col,
} from 'native-base';
import CarouselImages from '../../Components/CaraouselImages';
import QrCodeModal from './QrCodeModal';
import {
  getQrCodeString,
  getFavoriteListIds,
} from '../../store/selectors/bookingSelector';
import {
  removeFromFavoritesRequest,
  addToFavoritesRequest,
  getBooks,
} from '../../store/reducers/bookRedux';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {isoDateToFr} from '../../Utils/Functions';

const mapStateToProps = (state) => ({
  selectedBook: state.bookStore.selectedBook,
  getQrCodeString: getQrCodeString(state),
  getFavoriteListIds: getFavoriteListIds(state),
});
const mapDispatchToProps = (dispatch) => ({
  getBooks: (...args) => dispatch(getBooks(...args)),
  removeFromFavoritesRequest: (...args) =>
    dispatch(removeFromFavoritesRequest(...args)),
  addToFavoritesRequest: (...args) => dispatch(addToFavoritesRequest(...args)),
});

const BookDetails = ({
  selectedBook,
  getQrCodeString,
  removeFromFavoritesRequest,
  addToFavoritesRequest,
  getFavoriteListIds,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const [showQrCodeForBooking, setShowQrCodeForBooking] = useState(false);

  useEffect(() => {
    if (selectedBook) {
      if (!selectedBook.isLoading) {
        setIsFavorited(getFavoriteListIds.includes(selectedBook.id));
      }
    }
  }, [selectedBook]);

  useEffect(() => {
    setIsFavorited(getFavoriteListIds.includes(selectedBook.id));
  }, [getFavoriteListIds]);

  const handleShowQrCode = () => {
    setShowQrCodeForBooking(true);
  };

  const handleFavorites = () => {
    if (isFavorited) {
      return removeFromFavoritesRequest(selectedBook, getFavoriteListIds);
    }
    return addToFavoritesRequest(selectedBook, getFavoriteListIds);
  };

  if (selectedBook.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  } else {
    return (
      selectedBook && (
        <Container>
          <CarouselImages images={selectedBook.images} />
          <Content>
            <Card>
              <CardItem header bordered>
                <Col>
                  <Row>
                    <Text>Auteur : {selectedBook.author}</Text>
                  </Row>
                  <Row>
                    <Text>genre : {selectedBook.genre.name}</Text>
                  </Row>
                  <Row>
                    <Text>Nombre de pages : {selectedBook.pages}</Text>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Text>Biblio : {selectedBook.location.name}</Text>
                  </Row>
                  <Row>
                    <Text>language : {selectedBook.language}</Text>
                  </Row>
                </Col>
              </CardItem>
              <CardItem header bordered>
                <TouchableOpacity
                  hitSlop={{x: 10, y: 10}}
                  onPress={handleFavorites}>
                  <Icon
                    type="FontAwesome"
                    name="star"
                    style={{
                      fontSize: 28,
                      marginBottom: -3,
                      color: isFavorited ? 'green' : 'gray',
                    }}
                  />
                </TouchableOpacity>
                {selectedBook.isAvailable && (
                  <TouchableOpacity
                    hitSlop={{x: 10, y: 10}}
                    onPress={handleShowQrCode}>
                    <Text>Je veux réserver</Text>
                  </TouchableOpacity>
                )}
                <Icon
                  type="FontAwesome"
                  name="calendar-check-o"
                  style={{
                    fontSize: 14,
                    marginBottom: -3,
                    color: selectedBook.isAvailable ? 'green' : 'gray',
                  }}
                />
                {selectedBook.availabilityDate && (
                  <Text note>{isoDateToFr(selectedBook.availabilityDate,false)} </Text>
                )}
              </CardItem>
              <ScrollView>
                <CardItem bordered>
                  <Body>
                    <Text>{selectedBook.description}</Text>
                  </Body>
                </CardItem>
              </ScrollView>
            </Card>
            <QrCodeModal
              label="Veuillez présenter ce QrCode à la bibliothèque"
              qrCodeString={getQrCodeString}
              visible={showQrCodeForBooking}
              onClose={() => {
                setShowQrCodeForBooking(false);
              }}
            />
          </Content>
        </Container>
      )
    );
  }
};
BookDetails.navigationOptions = (navigationData) => {
  const bookTitle = navigationData.navigation.getParam('bookTitle');
  return {
    headerTitle: bookTitle,
    headerTitleStyle: {
      textAlign: 'center',
      flex: 1,
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);
