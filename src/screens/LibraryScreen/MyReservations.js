import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import {Text, Button} from 'native-base';

import PropTypes from 'prop-types';
import BookReservationCard from './BookReservationCard';
import {getMyReservations} from '../../store/reducers/bookRedux';
import {LIBRARY_STR} from '../../Utils/Constants';
import {backgroundColor} from '../../Utils/colors';

const mapStateToProps = (state) => ({
  myReservations: state.bookStore.myReservations,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchGetMyReservations: (...args) => dispatch(getMyReservations(...args)),
});

const MyReservations = ({myReservations, dispatchGetMyReservations}) => {
  useEffect(() => {
    dispatchGetMyReservations();
  }, [dispatchGetMyReservations]);

  const renderItem = ({item}) => <BookReservationCard data={item} />;
  renderItem.propTypes = {
    item: PropTypes.object,
  };

  return (
    <>
      {myReservations && myReservations.isLoading && (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator animating size="large" />
        </View>
      )}
      {myReservations &&
        myReservations.list &&
        myReservations.list.length === 0 && (
          <Button block info>
            <Text>{LIBRARY_STR.book_return_empty}</Text>{' '}
          </Button>
        )}
      {myReservations && myReservations.list && (
        <SafeAreaView
          style={{marginTop: 0, backgroundColor, flex: 1, paddingTop: 5}}>
          <FlatList data={myReservations.list} renderItem={renderItem} />
        </SafeAreaView>
      )}
    </>
  );
};

MyReservations.navigationOptions = {
  headerTitle: LIBRARY_STR.my_reservations,
};

MyReservations.propTypes = {
  myReservations: PropTypes.object,
  dispatchGetMyReservations: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(MyReservations);
