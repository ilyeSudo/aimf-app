import {batchActions} from 'redux-batched-actions';
import {
  GET_LIST_ASSOCIAITION_URI,
  PATCH_USER_ASSOCIAITION_URI,
  GET_USER_ASSOCIAITION_URI,
} from '../../Utils/ApiUrl';
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
const GET_USER_ASSOCIATION_DATA = 'GET_USER_ASSOCIATION_DATA';
const LOADING_USER_ASSOCIATION_ERROR = 'LOADING_USER_ASSOCIATION_ERROR';
const PATCH_BATCH_GET_USER_ASSOCIATION_ERROR =
  'PATCH_BATCH_GET_USER_ASSOCIATION_ERROR';
const UPDATE_USER_ASSOCIATION_DATA = 'UPDATE_USER_ASSOCIATION_DATA';
const UPDATING_USER_ASSOCIATION_ERROR = 'UPDATING_USER_ASSOCIATION_ERROR';
const PATCH_BATCH_UPDATE_USER_ASSOCIATION_ERROR =
  'PATCH_BATCH_UPDATE_USER_ASSOCIATION_ERROR';

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

const getUserAssociationError = () => {
  return {
    type: LOADING_USER_ASSOCIATION_ERROR,
    payload: {loading: false},
  };
};

const updateUserAssociationError = () => {
  return {
    type: UPDATING_USER_ASSOCIATION_ERROR,
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
const _updateUserAssociation = (userAssociationList) => {
  return {
    type: UPDATE_USER_ASSOCIATION_DATA,
    payload: {
      userAssociationList,
      loading: false,
    },
  };
};

export const updateUserAssociation = (associationIdList) => {
  return (dispatch) => {
    dispatch(loadingAssociationData());
    getAxiosInstance()
      .patch(`${PATCH_USER_ASSOCIAITION_URI}`, {
        associations: associationIdList,
      })
      .then((response) => {
        const userAssociationList = Object.values(response.data.data).map(
          (element) => {
            return element.id;
          },
        );
        dispatch(_updateUserAssociation(userAssociationList));
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), updateUserAssociationError()],
            PATCH_BATCH_UPDATE_USER_ASSOCIATION_ERROR,
          ),
        );
      });
  };
};

const getUserAssociationData = (userAssociationList) => {
  return {
    type: GET_USER_ASSOCIATION_DATA,
    payload: {
      userAssociationList,
      loading: false,
    },
  };
};

export const receiveUserAssociationData = () => {
  return (dispatch) => {
    dispatch(loadingAssociationData());
    getAxiosInstance()
      .get(GET_USER_ASSOCIAITION_URI)
      .then((response) => {
        const userAssociationList = Object.values(response.data.data).map(
          (element) => {
            return element.id;
          },
        );
        dispatch(getUserAssociationData(userAssociationList));
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), getUserAssociationError()],
            PATCH_BATCH_GET_USER_ASSOCIATION_ERROR,
          ),
        );
      });
  };
};

//
// Reducer
//

const initState = {
  loading: false,
  associationList: [],
  userAssociationList: [],
};

export const associationReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADING_ASSOCIATION_DATA:
    case LOADING_ASSOCIATION_DATA_ERROR:
    case UPDATING_USER_ASSOCIATION_ERROR:
    case LOADING_USER_ASSOCIATION_ERROR:
      return {...state, loading: action.payload.loading};
    case RECEIVE_ASSOCIATION_DATA: {
      return {
        ...state,
        loading: action.payload.loading,
        associationList: action.payload.associationList,
      };
    }
    case UPDATE_USER_ASSOCIATION_DATA:
    case GET_USER_ASSOCIATION_DATA: {
      return {
        ...state,
        loading: action.payload.loading,
        userAssociationList: action.payload.userAssociationList,
      };
    }
    case CLEAN_ASSOCIATION_STORE:
      return initState;
    default: {
      return state;
    }
  }
};
