import {batchActions} from 'redux-batched-actions';
import axios from 'axios';
import {
  TERMS_OF_USE_URI,
  GET_SECURITY_QUESTIONS_URI,
  POST_LOGIN_URI,
  POST_LOGOUT_URI,
} from '../../Utils/ApiUrl';
import getAxiosInstance from '../../Utils/axios';
import {dispatchError} from './errorMessageRedux';
import {storeAccount} from './accountRedux';
import getRandomQuestionIndex from '../../Components/AccountForm/Functions';

const POST_REQUEST = 'POST_REQUEST';
const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGOUT_SUCCESS = 'POST_LOGOUT_SUCCESS';
const POST_LOGIN_ERROR = 'POST_LOGIN_ERROR';
const POST_BATCH_LOGIN_ERROR = 'POST_BATCH_LOGIN_ERROR';
const POST_BATCH_LOGIN_SUCCESS = 'POST_BATCH_LOGIN_SUCCESS';

const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';
const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';

const GET_TERMS_OF_USE_ERROR = 'GET_TERMS_OF_USE_ERROR';
const GET_TERMS_OF_USE_SUCCESS = 'GET_TERMS_OF_USE_SUCCESS';
const POST_BATCH_TERMS_OF_USE_ERROR = 'POST_BATCH_TERMS_OF_USE_ERROR';

const postRequest = () => {
  return {
    type: POST_REQUEST,
    payload: {
      loading: true,
    },
  };
};

const postLoginError = () => {
  return {
    type: POST_LOGIN_ERROR,
    payload: {loading: false},
  };
};

const postLoginSuccess = () => {
  return {
    type: POST_LOGIN_SUCCESS,
    payload: {loading: false},
  };
};

const postLogoutSuccess = () => {
  return {
    type: POST_LOGOUT_SUCCESS,
    payload: {loading: false},
  };
};

const getQuestionsError = () => {
  return {
    type: GET_QUESTIONS_ERROR,
    payload: {loading: false},
  };
};

const getQuestionsSuccess = (data) => {
  const questions = data.data;
  const questions1 = questions.splice(0, 5);
  return {
    type: GET_QUESTIONS_SUCCESS,
    payload: {
      loading: false,
      questions1,
      questions2: questions,
      question1: questions1[getRandomQuestionIndex()],
      question2: questions[getRandomQuestionIndex()],
    },
  };
};

const getTermsOfUseSuccess = (data) => {
  return {
    type: GET_TERMS_OF_USE_SUCCESS,
    payload: {
      loading: false,
      termsOfUse: data,
    },
  };
};

const getTermsOfUseError = () => {
  return {
    type: GET_TERMS_OF_USE_ERROR,
    payload: {loading: false},
  };
};

export const login = (email, password, fcmToken) => {
  return (dispatch) => {
    dispatch(postRequest());

    getAxiosInstance()
      .post(POST_LOGIN_URI, {
        email,
        password,
        fcmToken,
      })
      .then((response) => {
        dispatch(
          batchActions(
            [storeAccount(response.data), postLoginSuccess()],
            POST_BATCH_LOGIN_SUCCESS,
          ),
        );
        axios.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), postLoginError()],
            POST_BATCH_LOGIN_ERROR,
          ),
        );
      });
  };
};

export const getQuestions = () => {
  return (dispatch) => {
    dispatch(postRequest());
    getAxiosInstance()
      .get(GET_SECURITY_QUESTIONS_URI)
      .then((response) => {
        dispatch(getQuestionsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), getQuestionsError()],
            POST_BATCH_LOGIN_ERROR,
          ),
        );
      });
  };
};

export const getTermsOfUse = () => {
  return (dispatch) => {
    dispatch(postRequest());
    getAxiosInstance()
      .get(TERMS_OF_USE_URI)
      .then((response) => {
        dispatch(getTermsOfUseSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), getTermsOfUseError()],
            POST_BATCH_TERMS_OF_USE_ERROR,
          ),
        );
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(postRequest());
    getAxiosInstance()
      .post(POST_LOGOUT_URI, {})
      .then(() => {
        dispatch(postLogoutSuccess());
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), postLoginError()],
            POST_BATCH_LOGIN_ERROR,
          ),
        );
      });
  };
};

const initialState = {loading: false};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REQUEST:
    case POST_LOGIN_SUCCESS:
    case POST_LOGOUT_SUCCESS:
    case POST_LOGIN_ERROR:
    case GET_QUESTIONS_SUCCESS:
    case GET_QUESTIONS_ERROR:
    case GET_TERMS_OF_USE_SUCCESS:
    case GET_TERMS_OF_USE_ERROR: {
      return {...state, ...action.payload};
    }
    default: {
      return state;
    }
  }
};
