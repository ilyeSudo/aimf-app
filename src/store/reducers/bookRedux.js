import {batchActions} from 'redux-batched-actions';
import {
  GET_BOOK_LIST_URI,
  GET_BOOK_URI,
  GET_BOOK_RESERVATION_REQUEST_URI,
  POST_BOOK_RESERVATION_URI,
  GET_BOOK_RESERVATION_URI,
  GET_BOOK_FAVORITE_LIST_URI,
  POST_BOOK_FAVORITE_LIST_URI,
  GET_BOOK_RESERVATION_RETURN_URI,
} from '../../Utils/ApiUrl';
import {dispatchError} from './errorMessageRedux';
import getAxiosInstance from '../../Utils/axios';

const GET_BOOKS_REQUEST = 'GET_BOOKS_REQUEST';
const GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS';
const GET_BOOKS_ERROR = 'GET_BOOKS_ERROR';
const SHOW_BOOK_REQUEST = 'SHOW_BOOK_REQUEST';
const SHOW_BOOK_SUCCESS = 'SHOW_BOOK_SUCCESS';
const SHOW_BOOK_ERROR = 'SHOW_BOOK_ERROR';
const REQUEST_BOOKING_REQUEST = 'REQUEST_BOOKING_REQUEST';
const REQUEST_BOOKING_SUCCESS = 'REQUEST_BOOKING_SUCCESS';
const REQUEST_BOOKING_ERROR = 'REQUEST_BOOKING_ERROR';
const VALIDATE_BOOKING_SUCCESS = 'VALIDATE_BOOKING_SUCCESS';
const CANCEL_BOOKING = 'CANCEL_BOOKING';

const FAVORITE_LIST_REQUEST = 'FAVORITE_LIST_REQUEST';
const FAVORITE_LIST_SUCCESS = 'FAVORITE_LIST_SUCCESS';

const MY_RESERVATIONS_REQUEST = 'MY_RESERVATIONS_REQUEST';
const MY_RESERVATIONS_SUCCESS = 'MY_RESERVATIONS_SUCCESS';

const BOOK_RESERVATIONS_REQUEST = 'BOOK_RESERVATIONS_REQUEST';
const BOOK_RESERVATIONS_SUCCESS = 'BOOK_RESERVATIONS_SUCCESS';

const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';

const POST_BATCH_GET_BOOKS_ERROR = 'POST_BATCH_GET_BOOKS_ERROR';

const initialState = {books: []};

const getBookRequest = (refreshing, handleMore) => {
  return {
    type: GET_BOOKS_REQUEST,
    payload: {
      loading: true,
      refreshing,
      handleMore,
    },
  };
};
const getFavoriteListRequest = () => {
  return {
    type: FAVORITE_LIST_REQUEST,
  };
};

const getFavoriteListSuccess = (data) => {
  return {
    type: FAVORITE_LIST_SUCCESS,
    payload: data,
  };
};

const getMyReservationsRequest = () => {
  return {
    type: MY_RESERVATIONS_REQUEST,
  };
};
const getMyReservationsSuccess = (data) => {
  return {
    type: MY_RESERVATIONS_SUCCESS,
    payload: data,
  };
};
const getBookReservationsRequest = () => {
  return {
    type: BOOK_RESERVATIONS_REQUEST,
  };
};
const getBookReservationsSuccess = (data) => {
  return {
    type: BOOK_RESERVATIONS_SUCCESS,
    payload: data,
  };
};

const removeFromFavorites = (book) => {
  return {
    type: REMOVE_FROM_FAVORITES,
    payload: book,
  };
};
const addToFavorites = (book) => {
  return {
    type: ADD_TO_FAVORITES,
    payload: book,
  };
};

const showBookError = (messageError) => {
  return {
    type: SHOW_BOOK_ERROR,
    messageError,
  };
};
export const getBookReservations = (bookId) => {
  return (dispatch) => {
    dispatch(getBookReservationsRequest());
    getAxiosInstance()
      .get(GET_BOOK_RESERVATION_RETURN_URI.replace('{bookId}', bookId))
      .then((response) => {
        dispatch(
          getBookReservationsSuccess({
            bookReservations: response.data.data,
          }),
        );
      })
      .catch((error) => {
        dispatch(
          batchActions([dispatchError(error)], POST_BATCH_GET_BOOKS_ERROR),
        );
      });
  };
};

export const returnBookRequest = (bookId, bookingId) => (dispatch) => {
  getAxiosInstance()
    .patch(`${POST_BOOK_RESERVATION_URI}/${bookingId}`, {
      isReturned: true,
    })
    .then(() => {
      dispatch(getBookReservations(bookId));
    })
    .catch((error) => {
      dispatch(batchActions([dispatchError(error), showBookError()]));
    });
};

export const removeFromFavoritesRequest = (book, bookIds) => (dispatch) => {
  dispatch(removeFromFavorites(book));
  getAxiosInstance()
    .post(`${POST_BOOK_FAVORITE_LIST_URI}`, {
      bookIds: bookIds.filter((id) => id !== book.id),
    })
    .catch((error) => {
      dispatch(batchActions([dispatchError(error), showBookError()]));
      dispatch(addToFavorites(book));
    });
};

export const addToFavoritesRequest = (book, bookIds) => (dispatch) => {
  dispatch(addToFavorites(book));
  getAxiosInstance()
    .post(`${POST_BOOK_FAVORITE_LIST_URI}`, {
      bookIds: [...bookIds, book.id],
    })
    .catch((error) => {
      dispatch(batchActions([dispatchError(error), showBookError()]));
      dispatch(removeFromFavorites(book));
    });
};

const getBookSuccess = (data) => {
  return {
    type: GET_BOOKS_SUCCESS,
    payload: data,
  };
};

const getBookError = (messageError) => {
  return {
    type: GET_BOOKS_ERROR,
    messageError,
  };
};

export const getMyReservations = () => {
  return (dispatch) => {
    dispatch(getMyReservationsRequest());
    getAxiosInstance()
      .get(GET_BOOK_RESERVATION_URI)
      .then((response) => {
        dispatch(
          getMyReservationsSuccess({
            myReservations: response.data.data,
          }),
        );
      })
      .catch((error) => {
        dispatch(
          batchActions([dispatchError(error)], POST_BATCH_GET_BOOKS_ERROR),
        );
      });
  };
};

export const getFavoriteList = () => {
  return (dispatch) => {
    dispatch(getFavoriteListRequest());
    getAxiosInstance()
      .get(GET_BOOK_FAVORITE_LIST_URI)
      .then((response) => {
        dispatch(
          getFavoriteListSuccess({
            favoriteList: response.data.data.map((item) => item.book),
          }),
        );
      })
      .catch((error) => {
        dispatch(
          batchActions([dispatchError(error)], POST_BATCH_GET_BOOKS_ERROR),
        );
      });
  };
};

export const getBooks = (
  currentBooks,
  page,
  search = null,
  bookGenreId = null,
  locationId = null,
  refreshing = false,
  handleMore = false,
) => {
  return (dispatch) => {
    dispatch(getBookRequest(refreshing, handleMore));
    getAxiosInstance()
      .get(GET_BOOK_LIST_URI, {
        params: {
          page,
          search: search === '' ? null : search,
          bookGenreId,
          locationId,
        },
      })
      .then((response) => {
        dispatch(
          getBookSuccess({
            books:
              page === 1
                ? response.data.data
                : [...currentBooks, ...response.data.data],
            page,
            lastPage:
              response.data.meta.last_page === response.data.meta.current_page,
          }),
        );
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), getBookError()],
            POST_BATCH_GET_BOOKS_ERROR,
          ),
        );
      });
  };
};

const showBookRequest = (idBook) => {
  return {
    type: SHOW_BOOK_REQUEST,
    payload: {
      idBook,
    },
  };
};

const showBookSuccess = (data) => {
  return {
    type: SHOW_BOOK_SUCCESS,
    payload: data,
  };
};

export const showBook = (idBook) => (dispatch) => {
  dispatch(showBookRequest(idBook));
  getAxiosInstance()
    .get(`${GET_BOOK_URI}${idBook}?with_image=1`)
    .then((response) => {
      dispatch(
        showBookSuccess({
          selectedBook: response.data.data,
        }),
      );
    })
    .catch((error) => {
      dispatch(batchActions([dispatchError(error), showBookError()]));
    });
};

const requestBookingRequest = (objRequestBooking) => {
  return {
    type: REQUEST_BOOKING_REQUEST,
    payload: {
      objRequestBooking,
    },
  };
};
const requestBookingError = () => {
  return {
    type: REQUEST_BOOKING_ERROR,
  };
};

const validateBookingSuccess = () => {
  return {
    type: VALIDATE_BOOKING_SUCCESS,
  };
};
const cancelBookingStore = () => {
  return {
    type: CANCEL_BOOKING,
  };
};
const requestBookingSuccess = (data) => {
  return {
    type: REQUEST_BOOKING_SUCCESS,
    payload: data,
  };
};
export const cancelBooking = () => (dispatch) => {
  dispatch(cancelBookingStore());
};
export const requestBooking = (objRequestBooking) => (dispatch) => {
  // requete sur le serveur pour demander la reservation
  // Si c'est OK recuprer l'objet booking avec les données pré rempli
  // si non afficher l'erreur
  dispatch(requestBookingRequest(objRequestBooking));
  getAxiosInstance()
    //   .get(`${GET_BOOK_RESERVATION_REQUEST_URI}/${objRequestBooking.userId}/${objRequestBooking.bookId}/${objRequestBooking.hash}`)
    .get(
      `${GET_BOOK_RESERVATION_REQUEST_URI}/${objRequestBooking.userId}/${objRequestBooking.bookId}`,
    )
    .then((response) => {
      dispatch(
        requestBookingSuccess({
          booking: response.data.data,
        }),
      );
    })
    .catch((error) => {
      dispatch(requestBookingError());
      dispatch(batchActions([dispatchError(error), showBookError()]));
    });
};
export const validateBooking = (booking, navigation) => (dispatch) => {
  getAxiosInstance()
    .post(`${POST_BOOK_RESERVATION_URI}`, booking)
    .then(() => {
      dispatch(
        validateBookingSuccess({
          booking: null,
        }),
      );
      navigation.goBack();
    })
    .catch((error) => {
      dispatch(batchActions([dispatchError(error), showBookError()]));
    });
};

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS_REQUEST:
      return {...state, ...action.payload};
    case GET_BOOKS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false,
        refreshing: false,
        handleMore: false,
      };
    }
    case GET_BOOKS_ERROR: {
      return {
        ...state,
        ...action.messageError,
        loading: false,
        refreshing: false,
        handleMore: false,
      };
    }
    case SHOW_BOOK_REQUEST:
      return {
        ...state,
        selectedBook: {
          isLoading: true,
        },
      };
    case SHOW_BOOK_SUCCESS: {
      return {
        ...state,
        selectedBook: {
          ...action.payload.selectedBook,
          isLoading: false,
        },
      };
    }
    case SHOW_BOOK_ERROR: {
      return {
        ...state,
        selectedBook: {
          isLoading: false,
        },
        ...action.messageError,
      };
    }
    case REQUEST_BOOKING_SUCCESS: {
      return {
        ...state,
        booking: {
          ...action.payload.booking,
          isLoading: false,
        },
      };
    }
    case REQUEST_BOOKING_REQUEST:
      return {
        ...state,
        booking: {
          isLoading: true,
        },
      };
    case REQUEST_BOOKING_ERROR: {
      return {
        ...state,
        booking: null,
        ...action.messageError,
      };
    }
    case VALIDATE_BOOKING_SUCCESS: {
      return {
        ...state,
        booking: null,
      };
    }
    case CANCEL_BOOKING: {
      return {
        ...state,
        booking: null,
      };
    }

    case FAVORITE_LIST_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case FAVORITE_LIST_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case MY_RESERVATIONS_REQUEST: {
      return {
        ...state,
        myReservations: {
          isLoading: true,
        },
      };
    }
    case MY_RESERVATIONS_SUCCESS: {
      return {
        ...state,
        myReservations: {
          list: action.payload.myReservations,
          isLoading: false,
        },
      };
    }
    case BOOK_RESERVATIONS_REQUEST:
      return {
        ...state,
        bookReservations: {
          isLoading: true,
        },
      };
    case BOOK_RESERVATIONS_SUCCESS: {
      return {
        ...state,
        bookReservations: {
          list: action.payload.bookReservations,
          isLoading: false,
        },
      };
    }
    case REMOVE_FROM_FAVORITES: {
      return {
        ...state,
        favoriteList: state.favoriteList.filter(
          (item) => item.id !== action.payload.id,
        ),
      };
    }
    case ADD_TO_FAVORITES: {
      return {
        ...state,
        favoriteList: [...state.favoriteList, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};
