import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import BookReservationCard from '../LibraryScreen/BookReservationCard';
import {getMyReservations} from '../../store/reducers/bookRedux';
import {LIBRARY_STR} from '../../Utils/Constants';
import {backgroundColor} from '../../Utils/colors';

const mapStateToProps = (state) => ({
  myReservations: state.bookStore.myReservations,
});
const mapDispatchToProps = (dispatch) => ({
  getMyReservations: (...args) => dispatch(getMyReservations(...args)),
});

const MyReservations = ({myReservations, getMyReservations}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (myReservations) {
      setIsLoading(false);
    }
  }, [myReservations]);

  useEffect(() => {
    getMyReservations();
  }, []);

  const renderItem = ({item}) => <BookReservationCard data={item} />;

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  } else {
    return (
      <SafeAreaView
        style={{marginTop: 0, backgroundColor, flex: 1, paddingTop: 5}}>
        <FlatList
          data={myReservations}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </SafeAreaView>
    );
  }
};
MyReservations.navigationOptions = (navigationData) => {
  return {
    headerTitle: LIBRARY_STR.my_reservations,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyReservations);