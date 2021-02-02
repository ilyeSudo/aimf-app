import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import {Text, View, Button} from 'native-base';

import PropTypes from 'prop-types';
import BookReturnCard from './BookReturnCard';
import {LIBRARY_STR} from '../../Utils/Constants';
import {backgroundColor} from '../../Utils/colors';
import {returnBookRequest} from '../../store/reducers/bookRedux';

const mapStateToProps = (state) => ({
  bookReservations: state.bookStore.bookReservations,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchReturnBookRequest: (...args) => dispatch(returnBookRequest(...args)),
});

const BookReturn = ({bookReservations, dispatchReturnBookRequest}) => {
  useEffect(() => {}, [bookReservations]);

  const handleConfirmReturnBook = (item) => {
    dispatchReturnBookRequest(item.book.id, item.id);
  };
  handleConfirmReturnBook.propTypes = {
    item: PropTypes.object.isRequired,
  };
  const renderItem = ({item}) => (
    <BookReturnCard data={item} confirmReturnBook={handleConfirmReturnBook} />
  );
  renderItem.propTypes = {
    item: PropTypes.object.isRequired,
  };

  return (
    <>
      {bookReservations.isLoading && (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator animating size="large" />
        </View>
      )}
      {bookReservations &&
        bookReservations.list &&
        bookReservations.list.length === 0 && (
          <Button block info>
            <Text>{LIBRARY_STR.book_return_empty}</Text>
          </Button>
        )}
      {bookReservations.list && (
        <SafeAreaView
          style={{marginTop: 0, backgroundColor, flex: 1, paddingTop: 5}}>
          <FlatList data={bookReservations.list} renderItem={renderItem} />
        </SafeAreaView>
      )}
    </>
  );
};

BookReturn.navigationOptions = (navigationData) => {
  const bookTitle = navigationData.navigation.getParam('bookTitle');
  return {
    headerTitle: LIBRARY_STR.book_return_title + bookTitle,
    headerTitleStyle: {
      textAlign: 'center',
      flex: 1,
    },
  };
};

BookReturn.propTypes = {
  bookReservations: PropTypes.object,
  dispatchReturnBookRequest: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(BookReturn);
