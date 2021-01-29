import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (myReservations) {
      setIsLoading(false);
    }
  }, [myReservations]);

  useEffect(() => {
    dispatchGetMyReservations();
  });

  const renderItem = ({item}) => <BookReservationCard data={item} />;
  renderItem.propTypes = {
    item: PropTypes.object,
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{marginTop: 0, backgroundColor, flex: 1, paddingTop: 5}}>
      <FlatList data={myReservations} renderItem={renderItem} />
    </SafeAreaView>
  );
};
MyReservations.navigationOptions = {
  headerTitle: LIBRARY_STR.my_reservations,
};

MyReservations.propTypes = {
  myReservations: PropTypes.array,
  dispatchGetMyReservations: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(MyReservations);
