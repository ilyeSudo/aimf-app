import {batchActions} from 'redux-batched-actions';
import {GET_LIST_ASSOCIAITION_URI} from '../../Utils/ApiUrl';
import getAxiosInstance from '../../Utils/axios';
import {dispatchError} from './errorMessageRedux';

//
// Action types
//
const CLEAN_ASSOCIATION_STORE = 'CLEAN_ASSOCIATION_STORE';
const RECEIVE_ASSOCIATION_DATA = 'RECEIVE_ASSOCIATION_DATA';
const LOADING_ASSOCIATION_DATA = 'LOADING_ASSOCIATION_DATA';
const LOADING_ASSOCIATION_DATA_ERROR = 'LOADING_ASSOCIATION_DATA_ERROR';
const GET_BATCH_ASSOCIATION_DATA_ERROR = 'GET_BATCH_ASSOCIATION_DATA_ERROR';
const UPDATE_ASSOCIATION_DATA = 'UPDATE_ASSOCIATION_DATA';
const UPDATING_ASSOCIATION_ERROR = 'UPDATING_ASSOCIATION_ERROR';
const PATCH_BATCH_UPDATE_ASSOCIATION_ERROR =
  'PATCH_BATCH_UPDATE_ASSOCIATION_ERROR';

//
// Actions creator
//
export const cleanKhatmaStore = () => {
  return {
    type: CLEAN_ASSOCIATION_STORE,
  };
};

const loadingAssociationData = () => {
  return {
    type: LOADING_ASSOCIATION_DATA,
    payload: {
      loading: true,
    },
  };
};

const getAssociationError = () => {
  return {
    type: LOADING_ASSOCIATION_DATA_ERROR,
    payload: {loading: false},
  };
};

const getAssociationData = (associationList) => {
  return {
    type: RECEIVE_ASSOCIATION_DATA,
    payload: {
      loading: false,
      associationList,
    },
  };
};

export const receiveAssociationData = () => {
  return (dispatch) => {
    dispatch(loadingAssociationData());
    getAxiosInstance()
      .get(GET_LIST_ASSOCIAITION_URI)
      .then((response) => {
        dispatch(getAssociationData(response.data.data));
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), getAssociationError()],
            GET_BATCH_ASSOCIATION_DATA_ERROR,
          ),
        );
      });
  };
};

// eslint-disable-next-line no-underscore-dangle
const _updateAssociation = (associationList) => {
  return {
    type: UPDATE_ASSOCIATION_DATA,
    payload: {
      associationList,
      loading: false,
    },
  };
};

export const updateAssociation = (associationList) => {
  return (dispatch) => {
    // TODO
    // Call update association api then
    // dispatch Article
    // dispatch Khatma
    // dispatch User Khatma History
    dispatch(loadingAssociationData());
    dispatch(_updateAssociation(associationList));
  };
};

//
// Reducer
//

const initState = {
  loading: false,
  associationList: [],
};

export const associationReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADING_ASSOCIATION_DATA:
    case LOADING_ASSOCIATION_DATA_ERROR:
    case UPDATING_ASSOCIATION_ERROR:
      return {...state, loading: action.payload.loading};
    case RECEIVE_ASSOCIATION_DATA:
    case UPDATE_ASSOCIATION_DATA: {
      return {
        ...state,
        loading: action.payload.loading,
        associationList: action.payload.associationList,
      };
    }
    case CLEAN_ASSOCIATION_STORE:
      return initState;
    default: {
      return state;
    }
  }
};
