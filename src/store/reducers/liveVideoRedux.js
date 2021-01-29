import getAxiosInstance from '../../Utils/axios';
import {GET_LIVE_VIDEO_URI} from '../../Utils/ApiUrl';

const GET_LIVE_VIDEO_REQUEST = 'GET_LIVE_VIDEO_REQUEST';
const GET_LIVE_VIDEO_SUCCESS = 'GET_LIVE_VIDEO_SUCCESS';
const GET_LIVE_VIDEO_ERROR = 'GET_LIVE_VIDEO_ERROR';

const getLiveVideoRequest = () => {
  return {
    type: GET_LIVE_VIDEO_REQUEST,
    payload: {
      loading: true,
    },
  };
};

const getLiveVideoSuccess = (data) => {
  return {
    type: GET_LIVE_VIDEO_SUCCESS,
    payload: {video: data, loading: false},
  };
};

const getLiveVideoError = () => {
  return {
    type: GET_LIVE_VIDEO_ERROR,
    payload: {loading: false},
  };
};

export const getLiveVideo = () => {
  return (dispatch) => {
    dispatch(getLiveVideoRequest());
    getAxiosInstance()
      .get(GET_LIVE_VIDEO_URI)
      .then((response) => {
        dispatch(getLiveVideoSuccess(response.data.data));
      })
      .catch(() => {
        dispatch(getLiveVideoError());
      });
  };
};

const initialState = {};

export const liveVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIVE_VIDEO_REQUEST:
    case GET_LIVE_VIDEO_SUCCESS:
    case GET_LIVE_VIDEO_ERROR:
      return {...state, ...action.payload};
    default: {
      return state;
    }
  }
};
