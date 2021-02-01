import React, {useState, useEffect} from 'react';
import {View, FlatList, SafeAreaView, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Input, Item, Button} from 'native-base';
import * as PropTypes from 'prop-types';
import BookCard from './LibraryScreen/BookCard';
import {
  getBooks,
  getFavoriteList,
  showBook,
  getBookReservations,
} from '../store/reducers/bookRedux';
import {BOOK_GENRES, BOOK_LOCATION, LIBRARY_STR} from '../Utils/Constants';
import {dispatchErrorMessage} from '../store/reducers/errorMessageRedux';
import {getFavoriteListIds} from '../store/selectors/bookingSelector';
import FilterList from './LibraryScreen/FilterList';
import ErrorModal from '../Components/ErrorModal';
import Loader from '../Components/Loader';
import {canManageLibrary} from '../Utils/Account';
import AdminButton from '../Components/buttons/AdminButton';
import SearchIcon from '../Components/icons/SearchIcon';
import HeartIcon from '../Components/icons/HeartIcon';
import IconForms from '../Components/icons/IconForms';
import {OCalendarIcon} from '../Components/icons/CalendarIcon';
import {backgroundColor} from '../Utils/colors';

const styles = StyleSheet.create({
  upperContainer: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    shadowColor: '#383838',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  listContainer: {
    padding: 0,
  },
  searchInputStyle: {
    marginTop: 0,
    paddingHorizontal: 10,
    paddingLeft: 5,
    borderRadius: 5,
    height: 40,
    backgroundColor: '#FFF',
    fontSize: 12,
  },
  searchInputStyle_text: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  filterContainer: {
    marginTop: 0,
    opacity: 1,
    flex: 1,
    backgroundColor,
    paddingBottom: 75,
  },
  navigationBtn: {
    paddingHorizontal: 20,
  },
  navigationText: {fontSize: 16, marginLeft: 10},
});
const mapStateToProps = (state) => ({
  books: state.bookStore.books,
  loading: state.bookStore.loading,
  refreshing: state.bookStore.refreshing,
  handleMore: state.bookStore.handleMore,
  page: state.bookStore.page,
  lastPage: state.bookStore.lastPage,
  errorMessage: state.errorMessageStore.errorMessage,
  favoriteListIds: getFavoriteListIds(state),
  account: state.accountStore,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetBooks: (...args) => dispatch(getBooks(...args)),
  dispatchGetFavoriteList: (...args) => dispatch(getFavoriteList(...args)),
  showErrorMessage: (...args) => dispatch(dispatchErrorMessage(...args)),
  dispatchShowBook: (...args) => dispatch(showBook(...args)),
  dispatchReturnBook: (...args) => dispatch(getBookReservations(...args)),
});

const LibraryScreen = ({
  books,
  page,
  lastPage,
  loading,
  refreshing,
  handleMore,
  dispatchShowBook,
  dispatchReturnBook,
  dispatchGetBooks,
  errorMessage,
  navigation,
  showErrorMessage,
  favoriteListIds,
  dispatchGetFavoriteList,
  account,
}) => {
  const [searchValue, setSearchValue] = useState(null);
  const [filterGenreValue, setFilterGenreValue] = useState(null);
  const [filterLocationValue, setFilterLocationValue] = useState(null);
  const [lanceSearch, setLanceSearch] = useState(false);

  const {searchInputStyle} = styles;

  const handleRefresh = () => {
    if (!refreshing && !handleMore && !loading) {
      dispatchGetBooks(
        [],
        1,
        searchValue,
        filterGenreValue,
        filterLocationValue,
        true,
      );
    }
  };
  useEffect(() => {
    dispatchGetFavoriteList();
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (lanceSearch) {
      handleRefresh();
      setLanceSearch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lanceSearch]);

  const handleLoadMore = () => {
    if (!refreshing && !handleMore && !loading && !lastPage) {
      getBooks(
        books,
        page + 1,
        searchValue,
        filterGenreValue,
        filterLocationValue,
        false,
        true,
      );
    }
  };

  const handleShowBook = (item) => {
    dispatchShowBook(item.id);
    navigation.navigate('BookDetails', {
      bookId: item.id,
      bookTitle: item.title,
    });
  };
  const handleReturnBook = (item) => {
    dispatchReturnBook(item.id);
    navigation.navigate('BookReturn', {
      bookId: item.id,
      bookTitle: item.title,
    });
  };

  const renderItem = ({item}) => {
    const isFavorited = () => {
      return favoriteListIds.includes(item.id);
    };

    return (
      <BookCard
        data={{
          ...item,
          isFavorited: isFavorited(),
          isManager: canManageLibrary(account.user),
        }}
        showBook={handleShowBook}
        returnBook={handleReturnBook}
      />
    );
  };
  renderItem.propTypes = {
    item: PropTypes.object,
  };

  const search = () => {
    if (!searchValue || searchValue.length > 2) {
      handleRefresh();
    } else {
      showErrorMessage('Le mot recherché doit avoir au minimum 3 caractères');
    }
  };

  const updaterGenreFilterValue = (filterValue) => {
    setFilterGenreValue(filterValue);
    setLanceSearch(true);
  };
  const updaterLocationFilterValue = (filterValue) => {
    setFilterLocationValue(filterValue);
    setLanceSearch(true);
  };

  const getGenreFilterLabel = () => {
    if (!filterGenreValue) {
      return 'Sélectionner un genre...';
    }
    const bookGenre = BOOK_GENRES.find(
      (element) => element.id === filterGenreValue,
    );
    if (bookGenre) {
      return bookGenre.label;
    }
    return '';
  };
  const getLocationFilterLabel = () => {
    if (!filterLocationValue) {
      return 'Sélectionner la bibliothèque';
    }
    const bookLocation = BOOK_LOCATION.find(
      (element) => element.id === filterLocationValue,
    );
    if (bookLocation) {
      return bookLocation.label;
    }
    return '';
  };

  return (
    <>
      {canManageLibrary(account.user) && (
        <AdminButton
          textButton={LIBRARY_STR.borrow_book}
          onPress={() => navigation.navigate('BookReservation')}
        />
      )}
      <SafeAreaView style={{...styles.filterContainer}}>
        <View style={styles.upperContainer}>
          <Item rounded style={searchInputStyle}>
            <SearchIcon color={searchValue ? '#000' : '#C4C4C4'} />
            <Input
              onChangeText={setSearchValue}
              onBlur={search}
              style={styles.searchInputStyle_text}
              keyboardType="default"
              placeholder={LIBRARY_STR.search_book}
              placeholderTextColor="#C4C4C4"
              value={searchValue}
            />
          </Item>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flexDirection: 'row-reverse',
              marginBottom: 3,
            }}>
            <FilterList
              list={BOOK_GENRES}
              isEmpty={!filterGenreValue}
              selectedValue={getGenreFilterLabel()}
              updateValue={updaterGenreFilterValue}
            />
            <FilterList
              list={BOOK_LOCATION}
              isEmpty={!filterLocationValue}
              selectedValue={getLocationFilterLabel()}
              updateValue={updaterLocationFilterValue}
            />
          </View>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={books}
            renderItem={renderItem}
            onRefresh={handleRefresh}
            refreshing={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
          />
        </View>
      </SafeAreaView>

      <Loader visible={!!loading} />
      {errorMessage && <ErrorModal visible message={errorMessage} />}
    </>
  );
};

LibraryScreen.navigationOptions = ({navigation}) => {
  return {
    headerLeft: (
      <SafeAreaView>
        <Button
          transparent
          onPress={() => {
            navigation.navigate('MyReservations');
          }}
          style={styles.navigationBtn}>
          <OCalendarIcon color="black" size={22} />
          <Text style={styles.navigationText}>
            {LIBRARY_STR.my_reservations}
          </Text>
        </Button>
      </SafeAreaView>
    ),
    headerRight: (
      <SafeAreaView>
        <Button
          transparent
          onPress={() => navigation.navigate('BookFavoriteList')}
          style={styles.navigationBtn}>
          <HeartIcon iconForm={IconForms.outline()} color1="black" size={22} />
          <Text style={styles.navigationText}>Favoris</Text>
        </Button>
      </SafeAreaView>
    ),
  };
};

LibraryScreen.propTypes = {
  books: PropTypes.array,
  page: PropTypes.number,
  errorMessage: PropTypes.string,
  showErrorMessage: PropTypes.func,
  loading: PropTypes.bool,
  refreshing: PropTypes.bool,
  handleMore: PropTypes.bool,
  lastPage: PropTypes.bool,
  dispatchShowBook: PropTypes.func,
  dispatchGetFavoriteList: PropTypes.func,
  dispatchGetBooks: PropTypes.func,
  account: PropTypes.object,
  favoriteListIds: PropTypes.array,
  navigation: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(LibraryScreen);
