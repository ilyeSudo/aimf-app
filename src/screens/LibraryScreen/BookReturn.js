import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import {Text, View} from 'native-base';

import PropTypes from 'prop-types';
import BookReturnCard from './BookReturnCard';
import {LIBRARY_STR} from '../../Utils/Constants';
import {backgroundColor} from '../../Utils/colors';
import {returnBookRequest} from '../../store/reducers/bookRedux';

const mapStateToProps = (state) => ({
  bookReservations: state.bookStore.bookReservations,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchReturnBookRequest: (...args) =>
  dispatch(returnBookRequest(...args)),
});


const BookReturn = ({bookReservations,dispatchReturnBookRequest}) => {
  useEffect(() => {

  }, [bookReservations]);
  console.log("start component: "+bookReservations);

  const handleConfirmReturnBook=(item)=>{
    dispatchReturnBookRequest(item.book.id,item.id);
  }
  const renderItem = ({item}) => 
  <BookReturnCard
   data={item}
   confirmReturnBook={handleConfirmReturnBook} />;

  return (
    <>
  {bookReservations.isLoading && (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator animating size="large" />
    </View>
  )}
  {(bookReservations && bookReservations.list && bookReservations.list.length ==0) && (
      <View style={{flex: 1, justifyContent: 'center'}}>
      <Text>{LIBRARY_STR.book_return_empty}</Text>
    </View>
      )}
  {bookReservations.list && (
      <SafeAreaView style={{marginTop: 0, backgroundColor, flex: 1, paddingTop: 5}}>
        <FlatList
          data={bookReservations.list}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </SafeAreaView>
      )}


    </>
  );
}

BookReturn.navigationOptions = (navigationData) => {
  const bookTitle = navigationData.navigation.getParam('bookTitle');
  return {
    headerTitle: LIBRARY_STR.book_return_title+bookTitle,
    headerTitleStyle: {
      textAlign: 'center',
      flex: 1,
    },
  };
};




BookReturn.propTypes = {
  bookReservations: PropTypes.object,
  dispatchGetBookReservations: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(BookReturn);
